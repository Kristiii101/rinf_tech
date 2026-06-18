import { Repository } from "typeorm";
import { OnboardingRequest } from "./entities/onboarding-request.entity";
import { CreateOnboardingDto } from "./dto/create-onboarding.dto";
import { UpdateOnboardingDto, ReviewOnboardingDto } from "./dto/review-onboarding.dto";
import { ITProvisionDto } from "./dto/it-provision.dto";
export declare class OnboardingService {
    private readonly repo;
    constructor(repo: Repository<OnboardingRequest>);
    findAll(): Promise<OnboardingRequest[]>;
    findOne(id: string): Promise<OnboardingRequest>;
    create(dto: CreateOnboardingDto): Promise<OnboardingRequest>;
    update(id: string, dto: UpdateOnboardingDto): Promise<OnboardingRequest>;
    managerReview(id: string, approved: boolean, dto: ReviewOnboardingDto): Promise<OnboardingRequest>;
    financeReview(id: string, approved: boolean, dto: ReviewOnboardingDto): Promise<OnboardingRequest>;
    itProvision(id: string, approved: boolean, dto: ITProvisionDto): Promise<OnboardingRequest>;
    remove(id: string): Promise<void>;
}
