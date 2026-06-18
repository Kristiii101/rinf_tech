import Link from "next/link";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatDate } from "@/lib/formatDate";
import type { OnboardingRequest } from "@/types/onboarding";

export function RequestRow({ request }: { request: OnboardingRequest }) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        <Link href={`/onboarding/${request.id}`} className="hover:text-indigo-600">
          {request.employeeName}
        </Link>
      </td>
      <td className="px-4 py-3 text-sm text-gray-600">{request.role}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(request.startDate)}</td>
      <td className="px-4 py-3 text-sm text-gray-600">{request.hardwareTier}</td>
      <td className="px-4 py-3">
        <StatusBadge status={request.status} />
      </td>
    </tr>
  );
}
