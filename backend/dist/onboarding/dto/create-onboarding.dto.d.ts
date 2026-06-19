import { HardwareTier } from "../../common/enums/onboarding.enum";
export declare class CreateOnboardingDto {
    firstName: string;
    lastName: string;
    role: string;
    startDate: string;
    hardwareTier: HardwareTier;
    isUrgent?: boolean;
    workHours?: number;
}
