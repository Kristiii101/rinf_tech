"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

interface ReviewActionsProps {
  approveAction: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
  rejectAction: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
  approveLabel?: string;
}

export function ReviewActions({ approveAction, rejectAction, approveLabel = "Approve" }: ReviewActionsProps) {
  const [mode, setMode] = useState<"idle" | "approving" | "rejecting">("idle");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleApprove = (formData: FormData) => {
    startTransition(async () => {
      const result = await approveAction(null, formData);
      if (result?.error) showToast(result.error, "error");
      else showToast(`${approveLabel}d successfully.`, "success");
    });
  };

  const handleReject = (formData: FormData) => {
    startTransition(async () => {
      const result = await rejectAction(null, formData);
      if (result?.error) showToast(result.error, "error");
      else showToast("Request sent back for rework.", "success");
    });
  };

  if (mode === "approving") {
    return (
      <form action={handleApprove} className="space-y-2">
        <textarea
          name="approvalNote"
          placeholder="Optional note (e.g. start date may shift)…"
          rows={2}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <div className="flex gap-2">
          <Button type="submit" variant="primary" pendingLabel={`${approveLabel}ing…`} disabled={isPending}>
            Confirm {approveLabel}
          </Button>
          <Button type="button" variant="secondary" onClick={() => setMode("idle")} disabled={isPending}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  if (mode === "rejecting") {
    return (
      <form action={handleReject} className="space-y-2">
        <textarea
          name="rejectionReason"
          placeholder="Reason for rejection…"
          required
          rows={2}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        />
        <div className="flex gap-2">
          <Button type="submit" variant="danger" pendingLabel="Rejecting…" disabled={isPending}>
            Confirm Reject
          </Button>
          <Button type="button" variant="secondary" onClick={() => setMode("idle")} disabled={isPending}>
            Cancel
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="flex gap-2">
      <Button type="button" variant="primary" onClick={() => setMode("approving")} disabled={isPending}>
        {approveLabel}
      </Button>
      <Button type="button" variant="danger" onClick={() => setMode("rejecting")} disabled={isPending}>
        Reject
      </Button>
    </div>
  );
}


