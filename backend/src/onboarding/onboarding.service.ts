import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OnboardingRequest } from "./entities/onboarding-request.entity";
import { AuditLog } from "./entities/audit-log.entity";
import { CreateOnboardingDto } from "./dto/create-onboarding.dto";
import { UpdateOnboardingDto, ReviewOnboardingDto } from "./dto/review-onboarding.dto";
import { ITProvisionDto } from "./dto/it-provision.dto";
import { HardwareTier, OnboardingStatus } from "../common/enums/onboarding.enum";

@Injectable()
export class OnboardingService {
  constructor(
    @InjectRepository(OnboardingRequest)
    private readonly repo: Repository<OnboardingRequest>,
    @InjectRepository(AuditLog)
    private readonly auditRepo: Repository<AuditLog>,
  ) {}

  private async log(
    requestId: string,
    from: OnboardingStatus | null,
    to: OnboardingStatus,
    actor: string,
    note?: string,
  ) {
    await this.auditRepo.save(
      this.auditRepo.create({ requestId, fromStatus: from, toStatus: to, actor, note: note ?? null }),
    );
  }

  findAll() {
    return this.repo.find({ order: { isUrgent: "DESC", createdAt: "DESC" } });
  }

  async findOne(id: string) {
    const req = await this.repo.findOneBy({ id });
    if (!req) throw new NotFoundException(`Onboarding request ${id} not found`);
    return req;
  }

  getAuditLog(requestId: string) {
    return this.auditRepo.find({
      where: { requestId },
      order: { createdAt: "ASC" },
    });
  }

  async create(dto: CreateOnboardingDto) {
    const request = this.repo.create({
      ...dto,
      isUrgent: dto.isUrgent ?? false,
      status: OnboardingStatus.PENDING_MANAGER,
    });
    const saved = await this.repo.save(request);
    await this.log(saved.id, null, OnboardingStatus.PENDING_MANAGER, "HR", `Onboarding request created${dto.isUrgent ? " — URGENT" : ""}`);
    return saved;
  }

  async update(id: string, dto: UpdateOnboardingDto) {
    const req = await this.findOne(id);
    if (req.status === OnboardingStatus.COMPLETED) {
      throw new BadRequestException("Completed onboarding requests cannot be edited");
    }
    const prev = req.status;
    Object.assign(req, dto, { status: OnboardingStatus.PENDING_MANAGER, rejectionReason: null });
    const saved = await this.repo.save(req);
    await this.log(id, prev, OnboardingStatus.PENDING_MANAGER, "HR", "Request edited and resubmitted");
    return saved;
  }

  async managerReview(id: string, approved: boolean, dto: ReviewOnboardingDto) {
    const req = await this.findOne(id);
    if (req.status !== OnboardingStatus.PENDING_MANAGER) {
      throw new BadRequestException("Request is not pending manager review");
    }
    const prev = req.status;
    if (approved) {
      req.status =
        req.hardwareTier === HardwareTier.PREMIUM
          ? OnboardingStatus.PENDING_FINANCE
          : OnboardingStatus.PENDING_IT;
      const saved = await this.repo.save(req);
      await this.log(id, prev, req.status, "Manager", dto.approvalNote ?? "Approved — Fișa de post confirmed");
      return saved;
    } else {
      req.status = OnboardingStatus.NEEDS_REWORK;
      req.rejectionReason = dto.rejectionReason ?? null;
      const saved = await this.repo.save(req);
      await this.log(id, prev, OnboardingStatus.NEEDS_REWORK, "Manager", dto.rejectionReason);
      return saved;
    }
  }

  async financeReview(id: string, approved: boolean, dto: ReviewOnboardingDto) {
    const req = await this.findOne(id);
    if (req.status !== OnboardingStatus.PENDING_FINANCE) {
      throw new BadRequestException("Request is not pending finance review");
    }
    const prev = req.status;
    if (approved) {
      req.status = OnboardingStatus.PENDING_IT;
      const saved = await this.repo.save(req);
      await this.log(id, prev, OnboardingStatus.PENDING_IT, "Finance", dto.approvalNote ?? "Hardware budget approved");
      return saved;
    } else {
      req.status = OnboardingStatus.NEEDS_REWORK;
      req.rejectionReason = dto.rejectionReason ?? null;
      const saved = await this.repo.save(req);
      await this.log(id, prev, OnboardingStatus.NEEDS_REWORK, "Finance", dto.rejectionReason);
      return saved;
    }
  }

  async itProvision(id: string, approved: boolean, dto: ITProvisionDto) {
    const req = await this.findOne(id);
    if (req.status !== OnboardingStatus.PENDING_IT) {
      throw new BadRequestException("Request is not pending IT provisioning");
    }
    const prev = req.status;
    if (approved) {
      req.status = OnboardingStatus.COMPLETED;
      req.generatedEmail = dto.generatedEmail ?? null;
      req.generatedPassword = dto.generatedPassword ?? null;
      req.laptopConfig = dto.laptopConfig ?? null;
      const saved = await this.repo.save(req);
      await this.log(id, prev, OnboardingStatus.COMPLETED, "IT", `Email: ${dto.generatedEmail}, Laptop: ${dto.laptopConfig}`);
      return saved;
    } else {
      req.status = OnboardingStatus.NEEDS_REWORK;
      req.rejectionReason = dto.rejectionReason ?? null;
      const saved = await this.repo.save(req);
      await this.log(id, prev, OnboardingStatus.NEEDS_REWORK, "IT", dto.rejectionReason);
      return saved;
    }
  }

  async remove(id: string) {
    const req = await this.findOne(id);
    await this.repo.remove(req);
  }
}
