import type { OnboardingRequest, OnboardingStatus } from "@/types/onboarding";

const COUNTS: { status: OnboardingStatus; label: string; color: string }[] = [
  { status: "PENDING_MANAGER", label: "Pending Manager", color: "bg-yellow-50 border-yellow-200 text-yellow-800" },
  { status: "PENDING_FINANCE", label: "Pending Finance", color: "bg-blue-50 border-blue-200 text-blue-800" },
  { status: "PENDING_IT",      label: "Pending IT",      color: "bg-purple-50 border-purple-200 text-purple-800" },
  { status: "NEEDS_REWORK",    label: "Needs Rework",    color: "bg-red-50 border-red-200 text-red-800" },
  { status: "COMPLETED",       label: "Completed",       color: "bg-green-50 border-green-200 text-green-800" },
];

export function DashboardCounters({ requests }: { requests: OnboardingRequest[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {COUNTS.map(({ status, label, color }) => {
        const count = requests.filter((r) => r.status === status).length;
        return (
          <div key={status} className={`border rounded-lg px-4 py-3 ${color}`}>
            <p className="text-2xl font-bold">{count}</p>
            <p className="text-xs mt-0.5 opacity-80">{label}</p>
          </div>
        );
      })}
    </div>
  );
}
