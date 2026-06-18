import { notFound } from "next/navigation";
import { getOnboardingRequest } from "@/lib/api";
import { formatDate } from "@/lib/formatDate";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { DeleteButton } from "@/components/onboarding/DeleteButton";
import { updateOnboarding, deleteOnboarding } from "@/app/actions";

export default async function OnboardingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let request;
  try {
    request = await getOnboardingRequest(id);
  } catch {
    notFound();
  }

  const updateWithId = updateOnboarding.bind(null, id);
  const deleteWithId = deleteOnboarding.bind(null, id);

  return (
    <div className="max-w-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-gray-900">{request.employeeName}</h1>
          <StatusBadge status={request.status} />
        </div>
        <DeleteButton action={deleteWithId} employeeName={request.employeeName} />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6 space-y-3 text-sm text-gray-700">
        <div className="flex justify-between"><span className="font-medium">Role</span><span>{request.role}</span></div>
        <div className="flex justify-between"><span className="font-medium">Start Date</span><span>{formatDate(request.startDate)}</span></div>
        <div className="flex justify-between"><span className="font-medium">Hardware Tier</span><span>{request.hardwareTier}</span></div>
        {request.generatedEmail && (
          <div className="flex justify-between"><span className="font-medium">Email</span><span>{request.generatedEmail}</span></div>
        )}
        {request.rejectionReason && (
          <div className="bg-red-50 border border-red-200 rounded p-3">
            <p className="font-medium text-red-700 text-xs mb-1">Rejection Reason</p>
            <p className="text-red-600">{request.rejectionReason}</p>
          </div>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Edit &amp; Resubmit</h2>
        <OnboardingForm action={updateWithId} defaultValues={request} />
      </div>
    </div>
  );
}
