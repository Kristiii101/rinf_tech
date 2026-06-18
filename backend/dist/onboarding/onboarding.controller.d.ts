import { OnboardingService } from "./onboarding.service";
import { CreateOnboardingDto } from "./dto/create-onboarding.dto";
import { UpdateOnboardingDto, ReviewOnboardingDto } from "./dto/review-onboarding.dto";
import { ITProvisionDto } from "./dto/it-provision.dto";
export declare class OnboardingController {
    private readonly service;
    constructor(service: OnboardingService);
    findAll(): Promise<import("./entities/onboarding-request.entity").OnboardingRequest[]>;
    findOne(id: string): Promise<import("./entities/onboarding-request.entity").OnboardingRequest>;
    create(dto: CreateOnboardingDto): Promise<import("./entities/onboarding-request.entity").OnboardingRequest>;
    update(id: string, dto: UpdateOnboardingDto): Promise<import("./entities/onboarding-request.entity").OnboardingRequest>;
    managerApprove(id: string): Promise<import("./entities/onboarding-request.entity").OnboardingRequest>;
    managerReject(id: string, dto: ReviewOnboardingDto): Promise<import("./entities/onboarding-request.entity").OnboardingRequest>;
    financeApprove(id: string): Promise<import("./entities/onboarding-request.entity").OnboardingRequest>;
    financeReject(id: string, dto: ReviewOnboardingDto): Promise<import("./entities/onboarding-request.entity").OnboardingRequest>;
    itProvision(id: string, dto: ITProvisionDto): Promise<import("./entities/onboarding-request.entity").OnboardingRequest>;
    itReject(id: string, dto: ReviewOnboardingDto): Promise<import("./entities/onboarding-request.entity").OnboardingRequest>;
    remove(id: string): Promise<void>;
}
