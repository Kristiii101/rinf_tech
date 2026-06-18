import { HardwareTier, OnboardingStatus } from "../../common/enums/onboarding.enum";
export declare class OnboardingRequest {
    id: string;
    firstName: string;
    lastName: string;
    role: string;
    startDate: string;
    hardwareTier: HardwareTier;
    status: OnboardingStatus;
    isUrgent: boolean;
    rejectionReason: string | null;
    generatedEmail: string | null;
    generatedPassword: string | null;
    laptopConfig: string | null;
    createdAt: Date;
    updatedAt: Date;
}
