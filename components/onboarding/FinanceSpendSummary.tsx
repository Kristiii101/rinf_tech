import type { OnboardingRequest } from "@/types/onboarding";

const CURRENT_MONTH = new Date().toISOString().slice(0, 7); // "YYYY-MM"

export function FinanceSpendSummary({ requests }: { requests: OnboardingRequest[] }) {
  const thisMonth = requests.filter(
    (r) => r.approvedBudget && r.updatedAt.slice(0, 7) === CURRENT_MONTH,
  );
  const total = thisMonth.reduce((sum, r) => sum + (r.approvedBudget ?? 0), 0);
  const count = thisMonth.length;

  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-5 py-4 mb-6 flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-indigo-500 uppercase tracking-wide mb-0.5">This month</p>
        <p className="text-sm text-indigo-900">
          <span className="font-bold text-lg">€{total.toLocaleString()}</span>
          <span className="ml-2 text-indigo-600">allocated across {count} {count === 1 ? "request" : "requests"}</span>
        </p>
      </div>
      <div className="text-3xl text-indigo-300 select-none">€</div>
    </div>
  );
}
