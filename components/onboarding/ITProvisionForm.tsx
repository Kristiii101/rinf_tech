"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/Button";

interface ITProvisionFormProps {
  provisionAction: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
  rejectAction: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
  defaultEmail?: string | null;
  defaultLaptopConfig?: string | null;
}

export function ITProvisionForm({ provisionAction, rejectAction, defaultEmail, defaultLaptopConfig }: ITProvisionFormProps) {
  const [showReject, setShowReject] = useState(false);
  const [provisionState, provisionFormAction] = useActionState(provisionAction, null);
  const [rejectState, rejectFormAction] = useActionState(rejectAction, null);

  if (showReject) {
    return (
      <form action={rejectFormAction} className="space-y-2">
        {rejectState?.error && <p className="text-xs text-red-600">{rejectState.error}</p>}
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
    );
  }

  return (
    <form action={provisionFormAction} className="space-y-3">
      {provisionState?.error && (
        <p className="text-xs text-red-600">{provisionState.error}</p>
      )}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Generated Email</label>
        <input
          name="generatedEmail"
          defaultValue={defaultEmail ?? ""}
          placeholder="firstname.lastname@company.com"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-1">Laptop Configuration</label>
        <input
          name="laptopConfig"
          defaultValue={defaultLaptopConfig ?? ""}
          placeholder="e.g. MacBook Pro 16 / Dell XPS 15"
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit" pendingLabel="Provisioning…">
          Complete Provisioning
        </Button>
        <Button type="button" variant="danger" onClick={() => setShowReject(true)}>
          Reject
        </Button>
      </div>
    </form>
  );
}
