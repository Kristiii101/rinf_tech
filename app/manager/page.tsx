import { getOnboardingByStatus } from "@/lib/api";
import { formatDate } from "@/lib/formatDate";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SlaIndicator } from "@/components/ui/SlaIndicator";
import { ReviewActions } from "@/components/onboarding/ReviewActions";
import { FisaDePost } from "@/components/onboarding/FisaDePost";
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
              <div key={r.id} className={`bg-white border rounded-lg p-5 ${r.isUrgent ? "border-red-400 ring-1 ring-red-300" : "border-gray-200"}`}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{r.firstName} {r.lastName}</p>
                      {r.isUrgent && <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Urgent</span>}
                      <SlaIndicator status={r.status} updatedAt={r.updatedAt} />
                    </div>
                    <p className="text-sm text-gray-500">{r.role} · {formatDate(r.startDate)} · {r.hardwareTier}</p>
                    <div className="mt-1">
                      <FisaDePost request={r} />
                    </div>
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
