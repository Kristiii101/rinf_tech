"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import type { HardwareTier } from "@/types/onboarding";

interface ManagerReviewActionsProps {
  approveAction: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
  rejectAction: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
  currentTier: HardwareTier;
}

export function ManagerReviewActions({ approveAction, rejectAction, currentTier }: ManagerReviewActionsProps) {
  const [mode, setMode] = useState<"idle" | "approving" | "rejecting">("idle");
  const [isPending, startTransition] = useTransition();
  const [selectedTier, setSelectedTier] = useState<HardwareTier>(currentTier);
  const { showToast } = useToast();

  const handleApprove = (formData: FormData) => {
    startTransition(async () => {
      const result = await approveAction(null, formData);
      if (result?.error) showToast(result.error, "error");
      else showToast("Request approved successfully.", "success");
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
    const tierChanged = selectedTier !== currentTier;
    return (
      <form action={handleApprove} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Hardware Tier</label>
          <div className="flex gap-2">
            {(["Standard", "Premium"] as HardwareTier[]).map((tier) => (
              <label
                key={tier}
                className={`flex-1 flex items-center justify-center gap-1.5 border rounded-md px-3 py-2 text-sm cursor-pointer transition-colors ${
                  selectedTier === tier
                    ? "border-indigo-500 bg-indigo-50 text-indigo-700 font-medium"
                    : "border-gray-300 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  name="overrideTier"
                  value={tier}
                  checked={selectedTier === tier}
                  onChange={() => setSelectedTier(tier)}
                  className="sr-only"
                />
                {tier}
                {tier === currentTier && <span className="text-xs text-gray-400">(original)</span>}
              </label>
            ))}
          </div>
          {tierChanged && (
            <p className="mt-1.5 text-xs text-amber-600 font-medium">
              ⚠ Tier will be changed from {currentTier} → {selectedTier}.
              {selectedTier === "Standard" ? " Request will skip Finance and go directly to IT." : " Request will be routed through Finance."}
            </p>
          )}
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Note (optional)</label>
          <textarea
            name="approvalNote"
            placeholder="Optional note (e.g. start date may shift)…"
            rows={2}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" pendingLabel="Approving…" disabled={isPending}>
            Confirm Approval
          </Button>
          <Button type="button" variant="secondary" onClick={() => { setMode("idle"); setSelectedTier(currentTier); }} disabled={isPending}>
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
        Approve
      </Button>
      <Button type="button" variant="danger" onClick={() => setMode("rejecting")} disabled={isPending}>
        Reject
      </Button>
    </div>
  );
}
