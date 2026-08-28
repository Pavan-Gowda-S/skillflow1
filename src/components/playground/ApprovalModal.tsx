import { ShieldAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Chip } from "@/components/common/Chips";

export function ApprovalModal({
  open,
  onApprove,
  onReject,
}: {
  open: boolean;
  onApprove: () => void;
  onReject: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onReject()}>
      <DialogContent className="max-w-lg border-warning/40">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-warning">
            <ShieldAlert className="size-5" />
            Action Requires Approval
          </DialogTitle>
          <DialogDescription>
            A write capability was requested. Governance policy requires a human decision before
            execution.
          </DialogDescription>
        </DialogHeader>

        <dl className="space-y-2 text-[13px]">
          <div className="flex gap-3">
            <dt className="w-28 shrink-0 text-muted-foreground">Action</dt>
            <dd className="font-medium">Update Ticket #48291</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-28 shrink-0 text-muted-foreground">Reason</dt>
            <dd>Agent identified a likely expired authentication token.</dd>
          </div>
          <div className="flex gap-3">
            <dt className="w-28 shrink-0 text-muted-foreground">Changes</dt>
            <dd>
              <ul className="space-y-0.5">
                <li>· Add diagnosis</li>
                <li>· Assign to Platform Support</li>
                <li>· Add troubleshooting recommendation</li>
              </ul>
            </dd>
          </div>
          <div className="flex items-center gap-3">
            <dt className="w-28 shrink-0 text-muted-foreground">Permission</dt>
            <dd className="flex gap-2">
              <Chip tone="warning">ticket.write</Chip>
              <Chip tone="warning">Risk: Medium</Chip>
            </dd>
          </div>
        </dl>

        <div className="mt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onReject}
            className="rounded-md border border-border px-4 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={onApprove}
            className="rounded-md bg-[image:var(--gradient-accent)] px-4 py-2 text-[13px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Approve &amp; Continue
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
