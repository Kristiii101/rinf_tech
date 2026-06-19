import Link from "next/link";
import { getOnboardingRequests } from "@/lib/api";
import { RequestRow } from "@/components/onboarding/RequestRow";
import { DashboardFilters } from "@/components/onboarding/DashboardFilters";
import { DashboardCounters } from "@/components/onboarding/DashboardCounters";
import { Pagination } from "@/components/ui/Pagination";
import { PAGE_SIZE } from "@/lib/constants";
import type { OnboardingRequest, OnboardingStatus } from "@/types/onboarding";
import { Suspense } from "react";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string; page?: string }>;
}) {
  const { status, search, page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10));

  let all: OnboardingRequest[] = [];
  try {
    all = await getOnboardingRequests();
  } catch {
    // backend not yet running
  }

  const filtered = all
    .filter((r) => !status || r.status === (status as OnboardingStatus))
    .filter((r) => !search || `${r.firstName} ${r.lastName}`.toLowerCase().includes(search.toLowerCase()));

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-900">All Onboarding Requests</h1>
        <Link
          href="/onboarding/new"
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          + New Request
        </Link>
      </div>

      <DashboardCounters requests={all} />

      <div className="mb-4">
        <Suspense>
          <DashboardFilters />
        </Suspense>
      </div>

      {paginated.length === 0 ? (
        <p className="text-gray-500 text-sm">No onboarding requests match your filters.</p>
      ) : (
        <>
          <div className="overflow-hidden border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Name", "Role", "Start Date", "Hardware", "Status", "SLA"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginated.map((r) => (
                  <RequestRow key={r.id} request={r} />
                ))}
              </tbody>
            </table>
          </div>
          <Suspense>
            <Pagination total={filtered.length} page={page} />
          </Suspense>
        </>
      )}
    </div>
  );
}
