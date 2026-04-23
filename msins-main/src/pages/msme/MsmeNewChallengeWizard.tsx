import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MsmeChallengeListItem } from "@/data/msme-challenges-list";

export type NewChallengeWizardPayload = Omit<MsmeChallengeListItem, "id"> & { id?: string };

const STEP_TITLES = [
  "Where is the Problem?",
  "What is Happening?",
  "Business Impact",
  "Desired Outcome",
  "Setup",
  "AI Challenge Summary",
];

export type WizardForm = {
  department: string;
  occursWhere: string;
  frequency: string;
  describeIssue: string;
  currentPain: string;
  currentProcess: string;
  timeLoss: string;
  costLoss: string;
  qualityIssues: string;
  safetyIssues: string;
  outcomeAutomation: boolean;
  outcomeCost: boolean;
  outcomeQuality: boolean;
  outcomeFaster: boolean;
  outcomeNewProduct: boolean;
  deadline: string;
  budget: string;
  confidentiality: string;
  preferredSolver: string;
  attachmentNote: string;
};

const defaultForm = (): WizardForm => ({
  department: "",
  occursWhere: "",
  frequency: "",
  describeIssue: "",
  currentPain: "",
  currentProcess: "",
  timeLoss: "",
  costLoss: "",
  qualityIssues: "",
  safetyIssues: "",
  outcomeAutomation: false,
  outcomeCost: false,
  outcomeQuality: false,
  outcomeFaster: false,
  outcomeNewProduct: false,
  deadline: "",
  budget: "",
  confidentiality: "standard",
  preferredSolver: "incubator",
  attachmentNote: "",
});

export function mapChallengeToWizardSeed(row: MsmeChallengeListItem): Partial<WizardForm> {
  const parts = row.problemLocation.split(" · ");
  return {
    department: row.department,
    occursWhere: parts[0] || row.problemLocation,
    frequency: parts[1] || "",
    describeIssue: `${row.title}\n\n${row.summary}`,
    currentPain: row.businessImpact,
    currentProcess: row.desiredOutcome,
    timeLoss: "",
    costLoss: "",
    qualityIssues: "",
    safetyIssues: "",
    deadline: "",
    budget: "",
    confidentiality: "standard",
    preferredSolver: "incubator",
    attachmentNote: "",
  };
}

function buildAiSummary(f: WizardForm): string {
  const outcomes: string[] = [];
  if (f.outcomeAutomation) outcomes.push("Automation");
  if (f.outcomeCost) outcomes.push("Cost reduction");
  if (f.outcomeQuality) outcomes.push("Better quality");
  if (f.outcomeFaster) outcomes.push("Faster process");
  if (f.outcomeNewProduct) outcomes.push("New product opportunity");
  const outcomeLine = outcomes.length ? outcomes.join(" · ") : "To be refined with your team.";

  return [
    `## Challenge overview`,
    `**Department:** ${f.department || "—"}`,
    `**Where it occurs:** ${f.occursWhere || "—"}`,
    `**How often:** ${f.frequency || "—"}`,
    ``,
    `## What is happening`,
    f.describeIssue || "_(Describe the issue in Step 2.)_",
    ``,
    `**Current pain:** ${f.currentPain || "—"}`,
    `**Current process:** ${f.currentProcess || "—"}`,
    ``,
    `## Business impact`,
    `- Time loss: ${f.timeLoss || "—"}`,
    `- Cost impact: ${f.costLoss || "—"}`,
    `- Quality: ${f.qualityIssues || "—"}`,
    `- Safety: ${f.safetyIssues || "—"}`,
    ``,
    `## Desired outcome`,
    outcomeLine,
    ``,
    `## Delivery`,
    `- Target deadline: ${f.deadline || "—"}`,
    `- Budget (optional): ${f.budget || "Not specified"}`,
    `- Confidentiality: ${f.confidentiality}`,
    `- Preferred solver profile: ${f.preferredSolver.replace(/-/g, " ")}`,
    f.attachmentNote ? `\n**Attachments:** ${f.attachmentNote}` : "",
    ``,
    `_This summary is generated from your inputs for reviewers and innovator matching._`,
  ]
    .filter(Boolean)
    .join("\n");
}

function formToListItem(f: WizardForm, status: MsmeChallengeListItem["status"]): NewChallengeWizardPayload {
  const title =
    (f.describeIssue || "").split(/[.!?]/)[0]?.trim().slice(0, 72) ||
    f.department ||
    "New business challenge";
  const summary = buildAiSummary(f);
  return {
    title: title.length > 72 ? `${title.slice(0, 69)}…` : title,
    company: "Precision Auto Components Pvt Ltd",
    region: "Pune",
    department: f.department || "General",
    sector: "Manufacturing",
    status,
    applicants: 0,
    progress: status === "Draft" ? null : 0,
    publishedToInnovators: false,
    lastUpdated: "Just now",
    verificationStage: status === "Under Review" ? "pending_review" : status === "Draft" ? "none" : "none",
    summary,
    problemLocation: [f.department, f.occursWhere, f.frequency].filter(Boolean).join(" · ") || summary.slice(0, 120),
    businessImpact: [f.timeLoss, f.costLoss, f.qualityIssues, f.safetyIssues].filter(Boolean).join(" · ") || "—",
    desiredOutcome: [
      f.outcomeAutomation && "Automation",
      f.outcomeCost && "Cost reduction",
      f.outcomeQuality && "Quality",
      f.outcomeFaster && "Speed",
      f.outcomeNewProduct && "New product",
    ]
      .filter(Boolean)
      .join(", ") || "—",
  };
}

interface MsmeNewChallengeWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When editing an existing challenge, merge into the wizard on open. */
  initialSeed?: Partial<WizardForm> | null;
  editChallengeId?: string | null;
  onSaveDraft: (payload: NewChallengeWizardPayload, editId?: string | null) => void;
  onSubmitVerification: (payload: NewChallengeWizardPayload, editId?: string | null) => void;
}

export function MsmeNewChallengeWizard({
  open,
  onOpenChange,
  initialSeed,
  editChallengeId,
  onSaveDraft,
  onSubmitVerification,
}: MsmeNewChallengeWizardProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<WizardForm>(() => ({
    ...defaultForm(),
    ...(initialSeed ?? {}),
  }));

  const summaryText = useMemo(() => buildAiSummary(form), [form]);

  const update = <K extends keyof WizardForm>(key: K, value: WizardForm[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const canNext = () => {
    if (step === 1) return !!(form.department && form.occursWhere && form.frequency);
    if (step === 2) return !!(form.describeIssue && form.currentPain);
    if (step === 3) return !!(form.timeLoss || form.costLoss || form.qualityIssues || form.safetyIssues);
    if (step === 4)
      return (
        form.outcomeAutomation ||
        form.outcomeCost ||
        form.outcomeQuality ||
        form.outcomeFaster ||
        form.outcomeNewProduct
      );
    if (step === 5) return !!form.deadline;
    return true;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[90vh] overflow-y-auto sm:max-w-2xl w-[calc(100%-2rem)] gap-0 p-0",
          "border-border bg-background",
        )}
      >
        <div className="p-6 pb-4 border-b border-border">
          <DialogHeader>
            <DialogTitle>New challenge</DialogTitle>
            <DialogDescription>
              Step {step} of {STEP_TITLES.length}: {STEP_TITLES[step - 1]}
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-1 mt-4 overflow-x-auto pb-1">
            {STEP_TITLES.map((t, i) => (
              <button
                key={t}
                type="button"
                onClick={() => i + 1 < step && setStep(i + 1)}
                className={cn(
                  "shrink-0 rounded-md px-2 py-1 text-[10px] font-medium border transition-colors",
                  step === i + 1
                    ? "border-primary bg-primary/10 text-primary"
                    : i + 1 < step
                      ? "border-border text-muted-foreground hover:bg-muted"
                      : "border-transparent text-muted-foreground/60",
                )}
              >
                {i + 1}. {t.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 space-y-4 min-h-[280px]">
          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wiz-dept">Department</Label>
                <Input
                  id="wiz-dept"
                  placeholder="e.g. Operations, Quality, Utilities"
                  value={form.department}
                  onChange={(e) => update("department", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wiz-where">Where does it occur?</Label>
                <Input
                  id="wiz-where"
                  placeholder="Plant, line, shift, or geography"
                  value={form.occursWhere}
                  onChange={(e) => update("occursWhere", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wiz-often">How often?</Label>
                <Input
                  id="wiz-often"
                  placeholder="e.g. Every batch, daily peak, seasonal"
                  value={form.frequency}
                  onChange={(e) => update("frequency", e.target.value)}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wiz-desc">Describe the issue</Label>
                <Textarea
                  id="wiz-desc"
                  rows={4}
                  placeholder="What breaks, delays, or fails today?"
                  value={form.describeIssue}
                  onChange={(e) => update("describeIssue", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wiz-pain">Current pain</Label>
                <Textarea id="wiz-pain" rows={2} placeholder="Impact on people, customers, or KPIs" value={form.currentPain} onChange={(e) => update("currentPain", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wiz-proc">Current process</Label>
                <Textarea id="wiz-proc" rows={2} placeholder="How is it handled today?" value={form.currentProcess} onChange={(e) => update("currentProcess", e.target.value)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wiz-time">Time loss</Label>
                <Input id="wiz-time" placeholder="Hours per week, lead time slip…" value={form.timeLoss} onChange={(e) => update("timeLoss", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wiz-cost">Cost loss</Label>
                <Input id="wiz-cost" placeholder="₹ impact, scrap, penalties…" value={form.costLoss} onChange={(e) => update("costLoss", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wiz-qual">Quality issues</Label>
                <Textarea id="wiz-qual" rows={2} value={form.qualityIssues} onChange={(e) => update("qualityIssues", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wiz-safe">Safety issues</Label>
                <Textarea id="wiz-safe" rows={2} value={form.safetyIssues} onChange={(e) => update("safetyIssues", e.target.value)} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Select all outcomes that apply.</p>
              {(
                [
                  ["outcomeAutomation", "Automation"],
                  ["outcomeCost", "Cost reduction"],
                  ["outcomeQuality", "Better quality"],
                  ["outcomeFaster", "Faster process"],
                  ["outcomeNewProduct", "New product"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex items-center gap-3 rounded-lg border border-border px-3 py-2 hover:bg-muted/50 cursor-pointer">
                  <Checkbox checked={form[key]} onCheckedChange={(c) => update(key, c === true)} />
                  <span className="text-sm">{label}</span>
                </label>
              ))}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="wiz-dead">Deadline</Label>
                <Input id="wiz-dead" type="date" value={form.deadline} onChange={(e) => update("deadline", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wiz-file">Supporting files</Label>
                <Input
                  id="wiz-file"
                  type="file"
                  className="cursor-pointer"
                  onChange={(e) => update("attachmentNote", e.target.files?.length ? `${e.target.files.length} file(s) selected` : "")}
                />
                <p className="text-[11px] text-muted-foreground">Uploads are stored securely for reviewers (prototype UI).</p>
              </div>
              <div className="space-y-2">
                <Label>Budget (optional)</Label>
                <Input placeholder="e.g. Up to ₹5L for pilot" value={form.budget} onChange={(e) => update("budget", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Confidentiality</Label>
                <Select value={form.confidentiality} onValueChange={(v) => update("confidentiality", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public summary only</SelectItem>
                    <SelectItem value="standard">Standard NDA pathway</SelectItem>
                    <SelectItem value="strict">Strict — redacted public listing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Preferred solver type</Label>
                <Select value={form.preferredSolver} onValueChange={(v) => update("preferredSolver", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup team</SelectItem>
                    <SelectItem value="incubator">Incubator / TBI</SelectItem>
                    <SelectItem value="university">University lab</SelectItem>
                    <SelectItem value="open">Open innovation pool</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Review the generated challenge statement. You can go back to edit any step.
              </p>
              <div className="rounded-lg border border-border bg-muted/30 p-4 max-h-[320px] overflow-y-auto">
                <pre className="text-xs whitespace-pre-wrap font-sans text-foreground leading-relaxed">{summaryText}</pre>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 pt-2 border-t border-border flex-col sm:flex-row gap-2 sm:justify-between">
          <div className="flex gap-2 order-2 sm:order-1">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={() => setStep((s) => s - 1)}>
                Back
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2 justify-end order-1 sm:order-2">
            {step < 6 && (
              <Button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
                Next
              </Button>
            )}
            {step === 6 && (
              <>
                <Button type="button" variant="outline" onClick={() => setStep(1)}>
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    onSaveDraft(formToListItem(form, "Draft"), editChallengeId ?? null);
                    onOpenChange(false);
                  }}
                >
                  Save Draft
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    onSubmitVerification(formToListItem(form, "Under Review"), editChallengeId ?? null);
                    onOpenChange(false);
                  }}
                  disabled={!canNext()}
                >
                  Submit for Verification
                </Button>
              </>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
