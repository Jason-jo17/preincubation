
function createRecursiveProxy(targetName) {
  return new Proxy(() => {}, {
    get: (target, prop) => {
      console.log('GET', targetName, prop);
      if (prop === '$connect' || prop === '$disconnect') return () => Promise.resolve()
      
      const fullName = `${targetName}.${String(prop)}`
      const prismaMethods = ['findMany', 'findUnique', 'findFirst', 'create', 'update', 'delete', 'upsert', 'count', 'aggregate', 'groupBy']
      if (prismaMethods.includes(String(prop))) {
        return () => {
          console.warn(`[Prisma] Attempted to call ${fullName} on missing database.`)
          return Promise.resolve([])
        }
      }

      return createRecursiveProxy(fullName)
    },
    apply: (target, thisArg, argumentsList) => {
      console.warn(`[Prisma] Attempted to call ${targetName} as a function on missing database.`)
      return Promise.resolve([])
    }
  })
}

const stakeholderDb = createRecursiveProxy('Stakeholders');

console.log('Testing stakeholderDb.sector.findMany...');
const result = stakeholderDb.sector.findMany();
console.log('Result type:', typeof stakeholderDb.sector.findMany);
result.then(val => console.log('Resolved value:', val));
