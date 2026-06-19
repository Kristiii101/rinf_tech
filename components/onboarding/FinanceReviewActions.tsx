"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

const BUDGET_PRESETS = [800, 1000, 1500, 2000];

interface FinanceReviewActionsProps {
  approveAction: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
  rejectAction: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
}

export function FinanceReviewActions({ approveAction, rejectAction }: FinanceReviewActionsProps) {
  const [mode, setMode] = useState<"idle" | "approving" | "rejecting">("idle");
  const [isPending, startTransition] = useTransition();
  const [budget, setBudget] = useState("");
  const { showToast } = useToast();

  const handleApprove = (formData: FormData) => {
    startTransition(async () => {
      const result = await approveAction(null, formData);
      if (result?.error) showToast(result.error, "error");
      else showToast("Budget approved successfully.", "success");
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
      <form action={handleApprove} className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Approved Hardware Budget <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-1.5 mb-2">
            {BUDGET_PRESETS.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setBudget(String(preset))}
                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                  budget === String(preset)
                    ? "bg-indigo-600 border-indigo-600 text-white font-medium"
                    : "border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600"
                }`}
              >
                €{preset}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 text-sm pointer-events-none">€</span>
            <input
              name="approvedBudget"
              type="number"
              min={1}
              step={1}
              required
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              placeholder="or enter custom amount"
              className="w-full border border-gray-300 rounded-md pl-7 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">IT will only see laptops within this budget.</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Note (optional)</label>
          <textarea
            name="approvalNote"
            placeholder="Any additional notes…"
            rows={2}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" pendingLabel="Approving…" disabled={isPending}>
            Confirm Approval
          </Button>
          <Button type="button" variant="secondary" onClick={() => { setMode("idle"); setBudget(""); }} disabled={isPending}>
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

