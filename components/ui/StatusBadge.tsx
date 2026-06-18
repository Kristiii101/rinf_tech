import type { OnboardingStatus } from "@/types/onboarding";

const styles: Record<OnboardingStatus, string> = {
  PENDING_MANAGER: "bg-yellow-100 text-yellow-800",
  PENDING_FINANCE: "bg-blue-100 text-blue-800",
  PENDING_IT: "bg-purple-100 text-purple-800",
  NEEDS_REWORK: "bg-red-100 text-red-800",
  COMPLETED: "bg-green-100 text-green-800",
  REJECTED: "bg-gray-100 text-gray-800",
};

const labels: Record<OnboardingStatus, string> = {
  PENDING_MANAGER: "Pending Manager",
  PENDING_FINANCE: "Pending Finance",
  PENDING_IT: "Pending IT",
  NEEDS_REWORK: "Needs Rework",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
};

export function StatusBadge({ status }: { status: OnboardingStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}
