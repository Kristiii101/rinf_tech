import type { OnboardingStatus } from "@/types/onboarding";

const COMPLETED_STATUSES: OnboardingStatus[] = ["COMPLETED", "REJECTED"];

function daysSince(iso: string): number {
  const diff = Date.now() - new Date(iso).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

interface SlaIndicatorProps {
  status: OnboardingStatus;
  updatedAt: string;
}

export function SlaIndicator({ status, updatedAt }: SlaIndicatorProps) {
  if (COMPLETED_STATUSES.includes(status)) return null;

  const days = daysSince(updatedAt);
  const isOverdue = days >= 3;

  return (
    <span
      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
        isOverdue
          ? "bg-red-100 text-red-700"
          : "bg-gray-100 text-gray-500"
      }`}
      title={`In current status for ${days} day${days !== 1 ? "s" : ""}`}
    >
      {isOverdue && <span>⚠</span>}
      {days === 0 ? "Today" : `${days}d in stage`}
    </span>
  );
}
