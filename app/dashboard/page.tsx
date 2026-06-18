import Link from "next/link";
import { getOnboardingRequests } from "@/lib/api";
import { RequestRow } from "@/components/onboarding/RequestRow";
import type { OnboardingRequest } from "@/types/onboarding";

export default async function DashboardPage() {
  let requests: OnboardingRequest[] = [];
  try {
    requests = await getOnboardingRequests();
  } catch {
    // backend not yet running
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold text-gray-900">All Onboarding Requests</h1>
        <Link
          href="/onboarding/new"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          + New Request
        </Link>
      </div>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-sm">No onboarding requests yet.</p>
      ) : (
        <div className="overflow-hidden border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Role", "Start Date", "Hardware", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((r) => (
                <RequestRow key={r.id} request={r} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
