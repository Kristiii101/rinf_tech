"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import type { OnboardingRequest } from "@/types/onboarding";

const ROLES = [
  "Software Engineer",
  "DevOps Engineer",
  "QA Engineer",
  "Product Manager",
  "UI/UX Designer",
  "HR Specialist",
  "Data Analyst",
  "Project Manager",
];

interface OnboardingFormProps {
  action: (prev: { error?: string } | null, formData: FormData) => Promise<{ error?: string }>;
  defaultValues?: Partial<OnboardingRequest>;
}

export function OnboardingForm({ action, defaultValues }: OnboardingFormProps) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const result = await action(null, formData);
      if (result?.error) showToast(result.error, "error");
      else showToast("Onboarding request submitted successfully.", "success");
    });
  };

  return (
    <form action={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input
            name="firstName"
            defaultValue={defaultValues?.firstName}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input
            name="lastName"
            defaultValue={defaultValues?.lastName}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
        <select
          name="role"
          defaultValue={defaultValues?.role ?? ""}
          required
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="" disabled>Select a role…</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
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

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Program de lucru</label>
        <select
          name="workHours"
          defaultValue={defaultValues?.workHours ?? 8}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value={4}>4h / zi — Part-time</option>
          <option value={6}>6h / zi — Part-time</option>
          <option value={8}>8h / zi — Full-time</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isUrgent"
          name="isUrgent"
          defaultChecked={defaultValues?.isUrgent ?? false}
          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
        />
        <label htmlFor="isUrgent" className="text-sm font-medium text-gray-700">
          Mark as <span className="text-red-600 font-semibold">Urgent</span>
        </label>
      </div>

      <Button type="submit" pendingLabel="Saving…" disabled={isPending}>
        Submit
      </Button>
    </form>
  );
}
