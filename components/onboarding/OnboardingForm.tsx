"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import type { OnboardingRequest } from "@/types/onboarding";

interface OnboardingFormProps {
  action: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
  defaultValues?: Partial<OnboardingRequest>;
}

export function OnboardingForm({ action, defaultValues }: OnboardingFormProps) {
  const [state, formAction] = useActionState(action, null);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {state.error}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label>
        <input
          name="employeeName"
          defaultValue={defaultValues?.employeeName}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <input
          name="role"
          defaultValue={defaultValues?.role}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
        <input
          type="date"
          name="startDate"
          defaultValue={defaultValues?.startDate?.slice(0, 10)}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Hardware Tier</label>
        <select
          name="hardwareTier"
          defaultValue={defaultValues?.hardwareTier ?? "Standard"}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
        </select>
      </div>

      <Button type="submit" pendingLabel="Saving…">
        Submit
      </Button>
    </form>
  );
}
