"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import type { OnboardingStatus } from "@/types/onboarding";

const STATUS_OPTIONS: { value: OnboardingStatus | "ALL"; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "PENDING_MANAGER", label: "Pending Manager" },
  { value: "PENDING_FINANCE", label: "Pending Finance" },
  { value: "PENDING_IT", label: "Pending IT" },
  { value: "NEEDS_REWORK", label: "Needs Rework" },
  { value: "COMPLETED", label: "Completed" },
];

export function DashboardFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentStatus = searchParams.get("status") ?? "ALL";
  const currentSearch = searchParams.get("search") ?? "";

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "ALL") params.set(key, value);
    else params.delete(key);
    params.delete("page"); // reset to page 1 on filter change
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  return (
    <div className="flex gap-3 flex-wrap">
      <input
        type="search"
        placeholder="Search by name…"
        defaultValue={currentSearch}
        onChange={(e) => update("search", e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48"
      />
      <select
        value={currentStatus}
        onChange={(e) => update("status", e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {STATUS_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
