import type { OnboardingRequest } from "@/types/onboarding";

const ACTIVE_STATUSES = ["PENDING_MANAGER", "PENDING_FINANCE", "PENDING_IT", "NEEDS_REWORK"];

export function DashboardCounters({ requests }: { requests: OnboardingRequest[] }) {
  const total = requests.length;
  const active = requests.filter((r) => ACTIVE_STATUSES.includes(r.status)).length;
  const urgent = requests.filter((r) => r.isUrgent && r.status !== "COMPLETED").length;
  const completed = requests.filter((r) => r.status === "COMPLETED").length;

  const tiles = [
    { label: "Total Requests", value: total, color: "bg-white border-gray-200 text-gray-900", sub: "text-gray-500" },
    { label: "Active", value: active, color: "bg-indigo-50 border-indigo-200 text-indigo-900", sub: "text-indigo-500" },
    { label: "Urgent", value: urgent, color: "bg-red-50 border-red-200 text-red-900", sub: "text-red-500" },
    { label: "Completed", value: completed, color: "bg-green-50 border-green-200 text-green-900", sub: "text-green-500" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {tiles.map(({ label, value, color, sub }) => (
        <div key={label} className={`border rounded-xl px-5 py-4 ${color}`}>
          <p className="text-3xl font-bold tabular-nums">{value}</p>
          <p className={`text-xs font-medium mt-1 ${sub}`}>{label}</p>
        </div>
      ))}
    </div>
  );
}
