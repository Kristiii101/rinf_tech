import { notFound } from "next/navigation";
import { getOnboardingRequest, getAuditLog } from "@/lib/api";
import { formatDate } from "@/lib/formatDate";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { DeleteButton } from "@/components/onboarding/DeleteButton";
import { AuditTimeline } from "@/components/onboarding/AuditTimeline";
import { CollapsibleEdit } from "@/components/onboarding/CollapsibleEdit";
import { updateOnboarding, deleteOnboarding } from "@/app/actions";

export default async function OnboardingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let request;
  let auditEntries = [];
  try {
    [request, auditEntries] = await Promise.all([
      getOnboardingRequest(id),
      getAuditLog(id),
    ]);
  } catch {
    notFound();
  }

  const updateWithId = updateOnboarding.bind(null, id);
  const deleteWithId = deleteOnboarding.bind(null, id);

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">{request.firstName} {request.lastName}</h1>
          <StatusBadge status={request.status} />
          {request.isUrgent && request.status !== "COMPLETED" && (
            <span className="text-xs font-semibold bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Urgent</span>
          )}
          {request.isUrgent && request.status === "COMPLETED" && (
            <span className="text-xs font-medium bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">Was urgent</span>
          )}
        </div>
        <DeleteButton action={deleteWithId} employeeName={`${request.firstName} ${request.lastName}`} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 space-y-3 text-sm text-gray-700">
        <div className="flex justify-between"><span className="font-medium">First Name</span><span>{request.firstName}</span></div>
        <div className="flex justify-between"><span className="font-medium">Last Name</span><span>{request.lastName}</span></div>
        <div className="flex justify-between"><span className="font-medium">Role</span><span>{request.role}</span></div>
        <div className="flex justify-between"><span className="font-medium">Start Date</span><span>{formatDate(request.startDate)}</span></div>
        <div className="flex justify-between"><span className="font-medium">Hardware Tier</span><span>{request.hardwareTier}</span></div>
        {request.approvedBudget && (
          <div className="flex justify-between"><span className="font-medium">Approved Budget</span><span className="text-indigo-700 font-medium">€{request.approvedBudget}</span></div>
        )}
        <div className="flex justify-between"><span className="font-medium">Program de lucru</span><span>{request.workHours}h / zi — {request.workHours === 8 ? "Full-time" : "Part-time"}</span></div>
        {request.generatedEmail && (
          <div className="flex justify-between"><span className="font-medium">Email</span><span>{request.generatedEmail}</span></div>
        )}
        {request.generatedPassword && request.status !== "COMPLETED" && (
          <div className="flex justify-between"><span className="font-medium">Password</span><span className="font-mono text-xs bg-gray-100 px-2 py-0.5 rounded">{request.generatedPassword}</span></div>
        )}
        {request.rejectionReason && (
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="font-medium text-red-700 text-xs mb-1">Rejection Reason</p>
            <p className="text-red-600">{request.rejectionReason}</p>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Activity Log</h2>
        <AuditTimeline entries={auditEntries} />
      </div>

      {request.status !== "COMPLETED" && (
        <CollapsibleEdit>
          <OnboardingForm action={updateWithId} defaultValues={request} />
        </CollapsibleEdit>
      )}
      </div>
    </div>
  );
}
