import { OnboardingRequest } from "../../onboarding/entities/onboarding-request.entity";
import { OnboardingStatus } from "../../common/enums/onboarding.enum";
export declare class AuditLog {
    id: string;
    request: OnboardingRequest;
    requestId: string;
    fromStatus: OnboardingStatus | null;
    toStatus: OnboardingStatus;
    actor: string | null;
    note: string | null;
    createdAt: Date;
}
