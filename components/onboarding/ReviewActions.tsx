"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";

interface ReviewActionsProps {
  approveAction: () => Promise<void>;
  rejectAction: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
}

export function ReviewActions({ approveAction, rejectAction }: ReviewActionsProps) {
  const [showReject, setShowReject] = useState(false);
  const [rejectState, rejectFormAction] = useActionState(rejectAction, null);

  return (
    <div className="space-y-3">
      {!showReject ? (
        <div className="flex gap-2">
          <form action={approveAction}>
            <Button type="submit" variant="primary" pendingLabel="Approving…">
              Approve
            </Button>
          </form>
          <Button type="button" variant="danger" onClick={() => setShowReject(true)}>
            Reject
          </Button>
        </div>
      ) : (
        <form action={rejectFormAction} className="space-y-2">
          {rejectState?.error && (
            <p className="text-xs text-red-600">{rejectState.error}</p>
          )}
          <textarea
            name="rejectionReason"
            placeholder="Reason for rejection…"
            required
            rows={2}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <div className="flex gap-2">
            <Button type="submit" variant="danger" pendingLabel="Rejecting…">
              Confirm Reject
            </Button>
            <Button type="button" variant="secondary" onClick={() => setShowReject(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
