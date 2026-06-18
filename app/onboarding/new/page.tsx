import { OnboardingForm } from "@/components/onboarding/OnboardingForm";
import { createOnboarding } from "@/app/actions";

export default function NewOnboardingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-lg">
        <h1 className="text-xl font-bold text-gray-900 mb-6 text-center">New Onboarding Request</h1>
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <OnboardingForm action={createOnboarding} />
        </div>
      </div>
    </div>
  );
}
