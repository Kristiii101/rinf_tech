import { CreateOnboardingDto } from "./create-onboarding.dto";
import { HardwareTier } from "../../common/enums/onboarding.enum";
declare const UpdateOnboardingDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOnboardingDto>>;
export declare class UpdateOnboardingDto extends UpdateOnboardingDto_base {
}
export declare class ReviewOnboardingDto {
    rejectionReason?: string;
    approvalNote?: string;
    approvedBudget?: number;
    overrideTier?: HardwareTier;
}
export {};
