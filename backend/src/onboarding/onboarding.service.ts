import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OnboardingRequest } from "./entities/onboarding-request.entity";
import { CreateOnboardingDto } from "./dto/create-onboarding.dto";
import { UpdateOnboardingDto, ReviewOnboardingDto } from "./dto/review-onboarding.dto";
import { ITProvisionDto } from "./dto/it-provision.dto";
import { HardwareTier, OnboardingStatus } from "../common/enums/onboarding.enum";

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(OnboardingRequest)
    private readonly repo: Repository<OnboardingRequest>,
  ) {}

  findAll() {
    return this.repo.find({ order: { createdAt: "DESC" } });
  }

  async findOne(id: string) {
    const req = await this.repo.findOneBy({ id });
    if (!req) throw new NotFoundException(`Onboarding request ${id} not found`);
    return req;
  }

  create(dto: CreateOnboardingDto) {
    const request = this.repo.create({ ...dto, status: OnboardingStatus.PENDING_MANAGER });
    return this.repo.save(request);
  }

  async update(id: string, dto: UpdateOnboardingDto) {
    const req = await this.findOne(id);
    Object.assign(req, dto, { status: OnboardingStatus.PENDING_MANAGER, rejectionReason: null });
    return this.repo.save(req);
  }

  async managerReview(id: string, approved: boolean, dto: ReviewOnboardingDto) {
    const req = await this.findOne(id);
    if (req.status !== OnboardingStatus.PENDING_MANAGER) {
      throw new BadRequestException("Request is not pending manager review");
    }
    if (approved) {
      req.status =
        req.hardwareTier === HardwareTier.PREMIUM
          ? OnboardingStatus.PENDING_FINANCE
          : OnboardingStatus.PENDING_IT;
    } else {
      req.status = OnboardingStatus.NEEDS_REWORK;
      req.rejectionReason = dto.rejectionReason ?? null;
    }
    return this.repo.save(req);
  }

  async financeReview(id: string, approved: boolean, dto: ReviewOnboardingDto) {
    const req = await this.findOne(id);
    if (req.status !== OnboardingStatus.PENDING_FINANCE) {
      throw new BadRequestException("Request is not pending finance review");
    }
    if (approved) {
      req.status = OnboardingStatus.PENDING_IT;
    } else {
      req.status = OnboardingStatus.NEEDS_REWORK;
      req.rejectionReason = dto.rejectionReason ?? null;
    }
    return this.repo.save(req);
  }

  async itProvision(id: string, approved: boolean, dto: ITProvisionDto) {
    const req = await this.findOne(id);
    if (req.status !== OnboardingStatus.PENDING_IT) {
      throw new BadRequestException("Request is not pending IT provisioning");
    }
    if (approved) {
      req.status = OnboardingStatus.COMPLETED;
      req.generatedEmail = dto.generatedEmail ?? null;
      req.laptopConfig = dto.laptopConfig ?? null;
    } else {
      req.status = OnboardingStatus.NEEDS_REWORK;
      req.rejectionReason = dto.rejectionReason ?? null;
    }
    return this.repo.save(req);
  }

  async remove(id: string) {
    const req = await this.findOne(id);
    await this.repo.remove(req);
  }
}
