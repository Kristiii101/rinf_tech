import { HardwareTier, OnboardingStatus } from "../../common/enums/onboarding.enum";
export declare class OnboardingRequest {
    id: string;
    employeeName: string;
    role: string;
    startDate: string;
    hardwareTier: HardwareTier;
    status: OnboardingStatus;
    rejectionReason: string | null;
    generatedEmail: string | null;
    laptopConfig: string | null;
    createdAt: Date;
    updatedAt: Date;
}
