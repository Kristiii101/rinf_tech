import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { createOnboarding } from "@/app/actions";

export default function NewOnboardingPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-bold text-gray-900 mb-6">New Onboarding Request</h1>
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <OnboardingForm action={createOnboarding} />
      </div>
    </div>
  );
}
