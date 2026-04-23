import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || "postgresql://postgres.lxrfmcuichzryueyucfx:9902546688Jjd@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true";
const pool = new Pool({ connectionString });

export class PrismaMock {
  user = {
    findUnique: async ({ where }: any) => {
      const res = await pool.query('SELECT * FROM "User" WHERE email = $1 OR id = $2', [where.email, where.id]);
      return res.rows[0] || null;
    },
    findFirst: async () => {
        const res = await pool.query('SELECT * FROM "User" LIMIT 1');
        return res.rows[0] || null;
    }
  };

  studentProfile = {
    findUnique: async ({ where }: any) => {
        const res = await pool.query('SELECT * FROM "StudentProfile" WHERE "userId" = $1 OR id = $2', [where.userId, where.id]);
        return res.rows[0] || null;
    },
    findFirst: async (args: any) => {
        let query = 'SELECT sp.*, u.email as "userEmail", u.name as "userName" FROM "StudentProfile" sp LEFT JOIN "User" u ON sp."userId" = u.id';
        const values: any[] = [];
        if (args?.where?.user?.email) {
            query += ' WHERE u.email = $1';
            values.push(args.where.user.email);
        } else if (args?.where?.teamId) {
            query += ' WHERE sp."teamId" IS NOT NULL';
        }
        const res = await pool.query(query, values);
        if (res.rows[0]) {
            const row = res.rows[0];
            return {
                ...row,
                user: { id: row.userId, email: row.userEmail, name: row.userName },
                team: row.teamId ? { id: row.teamId } : null
            };
        }
        return null;
    },
    update: async ({ where, data }: any) => {
        const res = await pool.query('UPDATE "StudentProfile" SET "teamId" = $1 WHERE id = $2 RETURNING *', [data.teamId, where.id]);
        return res.rows[0];
    }
  };

  team = {
    findFirst: async ({ where }: any) => {
        const res = await pool.query('SELECT * FROM "Team" WHERE name = $1', [where.name]);
        return res.rows[0] || null;
    },
    create: async ({ data }: any) => {
        const res = await pool.query('INSERT INTO "Team" (name, cohort) VALUES ($1, $2) RETURNING *', [data.name, data.cohort]);
        return res.rows[0];
    }
  };

  roadmapStage = {
    findMany: async (args: any) => {
        const stagesRes = await pool.query('SELECT * FROM "RoadmapStage" ORDER BY "stageNumber" ASC');
        const stages = stagesRes.rows;
        
        for (const stage of stages) {
            const toolsRes = await pool.query('SELECT * FROM "RoadmapTool" WHERE "stageId" = $1 ORDER BY week ASC', [stage.id]);
            stage.tools = toolsRes.rows;
            for (const tool of stage.tools) {
                const tasksRes = await pool.query('SELECT * FROM "RoadmapTask" WHERE "toolId" = $1', [tool.toolId]);
                tool.tasks = tasksRes.rows;
            }
        }
        return stages;
    }
  };

  roadmapTool = {
      findMany: async (args: any) => {
          const res = await pool.query('SELECT * FROM "RoadmapTool" ORDER BY week ASC');
          return res.rows;
      }
  };

  roadmapTask = {
      findUnique: async ({ where }: any) => {
          const res = await pool.query('SELECT rt.*, t.toolId as "tool_toolId" FROM "RoadmapTask" rt LEFT JOIN "RoadmapTool" t ON rt."toolId" = t.toolId WHERE rt.id = $1', [where.id]);
          if (res.rows[0]) {
              const row = res.rows[0];
              return { ...row, tool: { toolId: row.tool_toolId } };
          }
          return null;
      },
      findMany: async ({ where }: any) => {
          const res = await pool.query('SELECT * FROM "RoadmapTask" WHERE "toolId" = $1', [where.toolId]);
          return res.rows;
      }
  };

  teamProgress = {
    findUnique: async ({ where }: any) => {
        const res = await pool.query('SELECT * FROM "TeamProgress" WHERE "teamId" = $1 OR id = $2', [where.teamId, where.id]);
        const progress = res.rows[0] || null;
        if (progress) {
            const toolProgRes = await pool.query('SELECT * FROM "ToolProgress" WHERE "teamProgressId" = $1', [progress.id]);
            progress.toolProgress = toolProgRes.rows;
            for (const tp of progress.toolProgress) {
                const taskProgRes = await pool.query('SELECT * FROM "TaskProgress" WHERE "toolProgressId" = $1', [tp.id]);
                tp.taskProgress = taskProgRes.rows;
            }
            const stageProgRes = await pool.query('SELECT * FROM "StageProgress" WHERE "teamProgressId" = $1', [progress.id]);
            progress.stageProgress = stageProgRes.rows;
        }
        return progress;
    },
    create: async ({ data }: any) => {
        const res = await pool.query('INSERT INTO "TeamProgress" ("teamId", "currentStageId", "currentWeek") VALUES ($1, $2, $3) RETURNING *', [data.teamId, data.currentStageId || 1, data.currentWeek || 0]);
        return res.rows[0];
    },
    upsert: async ({ where, create, update }: any) => {
        const existing = await pool.query('SELECT * FROM "TeamProgress" WHERE "teamId" = $1', [where.teamId]);
        if (existing.rows[0]) return existing.rows[0];
        const res = await pool.query('INSERT INTO "TeamProgress" ("teamId") VALUES ($1) RETURNING *', [where.teamId]);
        return res.rows[0];
    },
    update: async ({ where, data }: any) => {
        const keys = Object.keys(data);
        const setClause = keys.map((k, i) => `"${k}" = $${i+2}`).join(', ');
        const res = await pool.query(`UPDATE "TeamProgress" SET ${setClause} WHERE id = $1 RETURNING *`, [where.id, ...Object.values(data)]);
        return res.rows[0];
    }
  };

  toolProgress = {
    findUnique: async ({ where }: any) => {
        const tpId = where.teamProgressId_toolId?.teamProgressId || where.teamProgressId;
        const toolId = where.teamProgressId_toolId?.toolId || where.toolId;
        const res = await pool.query('SELECT * FROM "ToolProgress" WHERE "teamProgressId" = $1 AND "toolId" = $2', [tpId, toolId]);
        return res.rows[0] || null;
    },
    upsert: async ({ where, create, update }: any) => {
        const tpId = where.teamProgressId_toolId.teamProgressId;
        const toolId = where.teamProgressId_toolId.toolId;
        const existing = await pool.query('SELECT * FROM "ToolProgress" WHERE "teamProgressId" = $1 AND "toolId" = $2', [tpId, toolId]);
        if (existing.rows[0]) {
            const keys = Object.keys(update);
            const setClause = keys.map((k, i) => `"${k}" = $${i+3}`).join(', ');
            const res = await pool.query(`UPDATE "ToolProgress" SET ${setClause} WHERE "teamProgressId" = $1 AND "toolId" = $2 RETURNING *`, [tpId, toolId, ...Object.values(update)]);
            return res.rows[0];
        } else {
            const data = create;
            const keys = Object.keys(data);
            const res = await pool.query(`INSERT INTO "ToolProgress" ("${keys.join('", "')}") VALUES (${keys.map((_, i) => `$${i+1}`).join(', ')}) RETURNING *`, Object.values(data));
            return res.rows[0];
        }
    },
    create: async ({ data }: any) => {
        const keys = Object.keys(data);
        const res = await pool.query(`INSERT INTO "ToolProgress" ("${keys.join('", "')}") VALUES (${keys.map((_, i) => `$${i+1}`).join(', ')}) RETURNING *`, Object.values(data));
        return res.rows[0];
    },
    update: async ({ where, data }: any) => {
        const keys = Object.keys(data);
        const setClause = keys.map((k, i) => `"${k}" = $${i+2}`).join(', ');
        const res = await pool.query(`UPDATE "ToolProgress" SET ${setClause} WHERE id = $1 RETURNING *`, [where.id, ...Object.values(data)]);
        return res.rows[0];
    }
  };

  taskProgress = {
      upsert: async ({ where, create, update }: any) => {
          const tpId = where.toolProgressId_taskId.toolProgressId;
          const taskId = where.toolProgressId_taskId.taskId;
          const existing = await pool.query('SELECT * FROM "TaskProgress" WHERE "toolProgressId" = $1 AND "taskId" = $2', [tpId, taskId]);
          if (existing.rows[0]) {
              const keys = Object.keys(update);
              const setClause = keys.map((k, i) => `"${k}" = $${i+3}`).join(', ');
              const res = await pool.query(`UPDATE "TaskProgress" SET ${setClause} WHERE "toolProgressId" = $1 AND "taskId" = $2 RETURNING *`, [tpId, taskId, ...Object.values(update)]);
              return res.rows[0];
          } else {
              const data = create;
              const keys = Object.keys(data);
              const res = await pool.query(`INSERT INTO "TaskProgress" ("${keys.join('", "')}") VALUES (${keys.map((_, i) => `$${i+1}`).join(', ')}) RETURNING *`, Object.values(data));
              return res.rows[0];
          }
      },
      findMany: async ({ where }: any) => {
          const res = await pool.query('SELECT * FROM "TaskProgress" WHERE "toolProgressId" = $1', [where.toolProgressId]);
          return res.rows;
      }
  };

  studentJourney = {
    findUnique: async ({ where }: any) => {
        const res = await pool.query('SELECT * FROM "StudentJourney" WHERE "userId" = $1 OR id = $2', [where.userId, where.id]);
        const journey = res.rows[0] || null;
        if (journey) {
            const sprintsRes = await pool.query('SELECT * FROM "Sprint" WHERE "journeyId" = $1 ORDER BY "sprintNumber" ASC', [journey.id]);
            journey.sprints = sprintsRes.rows;
            for (const s of journey.sprints) {
                const subsRes = await pool.query('SELECT * FROM "SprintToolSubmission" WHERE "sprintId" = $1', [s.id]);
                s.toolSubmissions = subsRes.rows;
            }
        }
        return journey;
    },
    create: async ({ data }: any) => {
        const { metrics, milestones, ...rest } = data;
        const keys = Object.keys(rest);
        const query = `INSERT INTO "StudentJourney" ("${keys.join('", "')}", "metrics", "milestones") VALUES (${keys.map((_, i) => `$${i+1}`).join(', ')}, $${keys.length+1}, $${keys.length+2}) RETURNING *`;
        const res = await pool.query(query, [...Object.values(rest), JSON.stringify(metrics || {}), JSON.stringify(milestones || [])]);
        return res.rows[0];
    }
  };

  sprint = {
    findUnique: async ({ where }: any) => {
        const res = await pool.query('SELECT * FROM "Sprint" WHERE "journeyId" = $1 AND "sprintNumber" = $2', [where.journeyId_sprintNumber.journeyId, where.journeyId_sprintNumber.sprintNumber]);
        return res.rows[0] || null;
    },
    findFirst: async ({ where }: any) => {
        const res = await pool.query('SELECT * FROM "Sprint" WHERE "journeyId" = $1 AND "sprintNumber" = $2', [where.journeyId, where.sprintNumber]);
        return res.rows[0] || null;
    },
    create: async ({ data }: any) => {
        const { toolSubmissions, gateChecks, ...rest } = data;
        const keys = Object.keys(rest);
        const query = `INSERT INTO "Sprint" ("${keys.join('", "')}", "gateChecks") VALUES (${keys.map((_, i) => `$${i+1}`).join(', ')}, $${keys.length+1}) RETURNING *`;
        const res = await pool.query(query, [...Object.values(rest), JSON.stringify(gateChecks || [])]);
        const sprint = res.rows[0];
        
        if (toolSubmissions?.create) {
            for (const sub of toolSubmissions.create) {
                await pool.query('INSERT INTO "SprintToolSubmission" ("sprintId", "toolId", "toolName", "trlContribution", "crlDimension", "irlDimension", "maxPercent", "status", "gateCheck", "isGateLevel") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', 
                [sprint.id, sub.toolId, sub.toolName, sub.trlContribution, sub.crlDimension, sub.irlDimension, sub.maxPercent, sub.status, sub.gateCheck, sub.isGateLevel]);
            }
        }
        return sprint;
    }
  };

  sprintToolSubmission = {
    findMany: async (args: any) => {
      const res = await pool.query('SELECT * FROM "SprintToolSubmission" WHERE "sprintId" = $1', [args.where.sprintId]);
      return res.rows;
    },
    create: async ({ data }: any) => {
      const keys = Object.keys(data).filter(k => typeof data[k] !== 'undefined');
      const values = keys.map(k => data[k]);
      const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
      const query = `INSERT INTO "SprintToolSubmission" ("${keys.join('", "')}") VALUES (${placeholders}) RETURNING *`;
      const res = await pool.query(query, values);
      return res.rows[0];
    }
  };

  sprintTemplate = {
      findMany: async (args: any) => {
          const res = await pool.query('SELECT * FROM "SprintTemplate" ORDER BY "sprintNumber" ASC');
          const templates = res.rows;
          for (const t of templates) {
              const toolsRes = await pool.query('SELECT * FROM "SprintTemplateTool" WHERE "templateId" = $1', [t.id]);
              t.tools = toolsRes.rows;
          }
          return templates;
      }
  }

  problemStatement = {
    findMany: async (args: any) => {
      let query = 'SELECT * FROM "ProblemStatement"';
      const values: any[] = [];
      if (args?.where?.status) {
        query += ' WHERE "status" = $1';
        values.push(args.where.status);
      }
      if (args?.orderBy?.code) {
          query += ` ORDER BY "code" ${args.orderBy.code}`;
      }
      const res = await pool.query(query, values);
      return res.rows;
    }
  };

  stakeholderProfile = {
      findMany: async (args: any) => {
          const res = await pool.query('SELECT sp.*, u.name as "userName", u.email as "userEmail" FROM "StakeholderProfile" sp LEFT JOIN "User" u ON sp."userId" = u.id');
          return res.rows.map(row => ({
              ...row,
              user: { name: row.userName, email: row.userEmail }
          }));
      }
  };

  $connect = async () => { console.log("[MOCK] Prisma Connected"); };
  $disconnect = async () => { console.log("[MOCK] Prisma Disconnected"); };
  $transaction = async (callback: any) => {
      console.log("[MOCK] Transaction Started");
      const result = await callback(this);
      console.log("[MOCK] Transaction Finished");
      return result;
  };
}

export const prismaMock = new PrismaMock();
