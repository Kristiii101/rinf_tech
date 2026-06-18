import { getOnboardingByStatus } from "@/lib/api";
import { formatDate } from "@/lib/formatDate";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ReviewActions } from "@/components/onboarding/ReviewActions";
import { managerApprove, managerReject } from "@/app/actions";
import type { OnboardingRequest } from "@/types/onboarding";

export default async function ManagerPage() {
  let requests: OnboardingRequest[] = [];
  try {
    requests = await getOnboardingByStatus("PENDING_MANAGER");
  } catch {
    // backend not yet running
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">Manager Review</h1>
      {requests.length === 0 ? (
        <p className="text-gray-500 text-sm">No requests pending manager review.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => {
            const approve = managerApprove.bind(null, r.id);
            const reject = managerReject.bind(null, r.id);
            return (
              <div key={r.id} className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900">{r.employeeName}</p>
                    <p className="text-sm text-gray-500">{r.role} · {formatDate(r.startDate)} · {r.hardwareTier}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <ReviewActions approveAction={approve} rejectAction={reject} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
