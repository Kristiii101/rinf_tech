import { getOnboardingByStatus } from "@/lib/api";
import { formatDate } from "@/lib/formatDate";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ITProvisionForm } from "@/components/onboarding/ITProvisionForm";
import { itProvision, itReject } from "@/app/actions";
import type { OnboardingRequest } from "@/types/onboarding";

export default async function ITPage() {
  let requests: OnboardingRequest[] = [];
  try {
    requests = await getOnboardingByStatus("PENDING_IT");
  } catch {
    // backend not yet running
  }

  return (
    <div>
      <h1 className="text-xl font-bold text-gray-900 mb-6">IT Provisioning</h1>
      {requests.length === 0 ? (
        <p className="text-gray-500 text-sm">No requests pending IT provisioning.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((r) => {
            const provision = itProvision.bind(null, r.id);
            const reject = itReject.bind(null, r.id);
            return (
              <div key={r.id} className="bg-white border border-gray-200 rounded-lg p-5">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-semibold text-gray-900">{r.employeeName}</p>
                    <p className="text-sm text-gray-500">{r.role} · {formatDate(r.startDate)} · {r.hardwareTier}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <ITProvisionForm provisionAction={provision} rejectAction={reject} defaultEmail={r.generatedEmail} defaultLaptopConfig={r.laptopConfig} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
