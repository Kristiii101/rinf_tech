import type { AuditLogEntry, OnboardingStatus } from "@/types/onboarding";

const statusLabels: Record<OnboardingStatus, string> = {
  PENDING_MANAGER: "Pending Manager",
  PENDING_FINANCE: "Pending Finance",
  PENDING_IT: "Pending IT",
  NEEDS_REWORK: "Needs Rework",
  COMPLETED: "Completed",
  REJECTED: "Rejected",
};

const dotColors: Record<OnboardingStatus, string> = {
  PENDING_MANAGER: "bg-yellow-400",
  PENDING_FINANCE: "bg-blue-400",
  PENDING_IT: "bg-purple-400",
  NEEDS_REWORK: "bg-red-400",
  COMPLETED: "bg-green-500",
  REJECTED: "bg-gray-400",
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hh}:${mm}`;
}

export function AuditTimeline({ entries }: { entries: AuditLogEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-gray-400">No activity recorded yet.</p>;
  }

  return (
    <ol className="relative border-l border-gray-200 space-y-6 ml-2">
      {entries.map((entry) => (
        <li key={entry.id} className="ml-5">
          <span className={`absolute -left-2 w-4 h-4 rounded-full border-2 border-white ${dotColors[entry.toStatus]}`} />
          <div>
            <p className="text-sm font-medium text-gray-900">
              {entry.fromStatus
                ? `${statusLabels[entry.fromStatus]} → ${statusLabels[entry.toStatus]}`
                : statusLabels[entry.toStatus]}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {entry.actor && <span className="font-medium text-gray-600">{entry.actor} · </span>}
              {formatDateTime(entry.createdAt)}
            </p>
            {entry.note && (
              <p className="text-xs text-gray-500 mt-1 italic">"{entry.note}"</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
