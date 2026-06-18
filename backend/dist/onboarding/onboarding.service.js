"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const onboarding_request_entity_1 = require("./entities/onboarding-request.entity");
const audit_log_entity_1 = require("./entities/audit-log.entity");
const onboarding_enum_1 = require("../common/enums/onboarding.enum");
let OnboardingService = class OnboardingService {
    repo;
    auditRepo;
    constructor(repo, auditRepo) {
        this.repo = repo;
        this.auditRepo = auditRepo;
    }
    async log(requestId, from, to, actor, note) {
        await this.auditRepo.save(this.auditRepo.create({ requestId, fromStatus: from, toStatus: to, actor, note: note ?? null }));
    }
    findAll() {
        return this.repo.find({ order: { isUrgent: "DESC", createdAt: "DESC" } });
    }
    async findOne(id) {
        const req = await this.repo.findOneBy({ id });
        if (!req)
            throw new common_1.NotFoundException(`Onboarding request ${id} not found`);
        return req;
    }
    getAuditLog(requestId) {
        return this.auditRepo.find({
            where: { requestId },
            order: { createdAt: "ASC" },
        });
    }
    async create(dto) {
        const request = this.repo.create({
            ...dto,
            isUrgent: dto.isUrgent ?? false,
            status: onboarding_enum_1.OnboardingStatus.PENDING_MANAGER,
        });
        const saved = await this.repo.save(request);
        await this.log(saved.id, null, onboarding_enum_1.OnboardingStatus.PENDING_MANAGER, "HR", `Onboarding request created${dto.isUrgent ? " — URGENT" : ""}`);
        return saved;
    }
    async update(id, dto) {
        const req = await this.findOne(id);
        if (req.status === onboarding_enum_1.OnboardingStatus.COMPLETED) {
            throw new common_1.BadRequestException("Completed onboarding requests cannot be edited");
        }
        const prev = req.status;
        Object.assign(req, dto, { status: onboarding_enum_1.OnboardingStatus.PENDING_MANAGER, rejectionReason: null });
        const saved = await this.repo.save(req);
        await this.log(id, prev, onboarding_enum_1.OnboardingStatus.PENDING_MANAGER, "HR", "Request edited and resubmitted");
        return saved;
    }
    async managerReview(id, approved, dto) {
        const req = await this.findOne(id);
        if (req.status !== onboarding_enum_1.OnboardingStatus.PENDING_MANAGER) {
            throw new common_1.BadRequestException("Request is not pending manager review");
        }
        const prev = req.status;
        if (approved) {
            req.status =
                req.hardwareTier === onboarding_enum_1.HardwareTier.PREMIUM
                    ? onboarding_enum_1.OnboardingStatus.PENDING_FINANCE
                    : onboarding_enum_1.OnboardingStatus.PENDING_IT;
            const saved = await this.repo.save(req);
            await this.log(id, prev, req.status, "Manager", dto.approvalNote ?? "Approved — Fișa de post confirmed");
            return saved;
        }
        else {
            req.status = onboarding_enum_1.OnboardingStatus.NEEDS_REWORK;
            req.rejectionReason = dto.rejectionReason ?? null;
            const saved = await this.repo.save(req);
            await this.log(id, prev, onboarding_enum_1.OnboardingStatus.NEEDS_REWORK, "Manager", dto.rejectionReason);
            return saved;
        }
    }
    async financeReview(id, approved, dto) {
        const req = await this.findOne(id);
        if (req.status !== onboarding_enum_1.OnboardingStatus.PENDING_FINANCE) {
            throw new common_1.BadRequestException("Request is not pending finance review");
        }
        const prev = req.status;
        if (approved) {
            req.status = onboarding_enum_1.OnboardingStatus.PENDING_IT;
            const saved = await this.repo.save(req);
            await this.log(id, prev, onboarding_enum_1.OnboardingStatus.PENDING_IT, "Finance", dto.approvalNote ?? "Hardware budget approved");
            return saved;
        }
        else {
            req.status = onboarding_enum_1.OnboardingStatus.NEEDS_REWORK;
            req.rejectionReason = dto.rejectionReason ?? null;
            const saved = await this.repo.save(req);
            await this.log(id, prev, onboarding_enum_1.OnboardingStatus.NEEDS_REWORK, "Finance", dto.rejectionReason);
            return saved;
        }
    }
    async itProvision(id, approved, dto) {
        const req = await this.findOne(id);
        if (req.status !== onboarding_enum_1.OnboardingStatus.PENDING_IT) {
            throw new common_1.BadRequestException("Request is not pending IT provisioning");
        }
        const prev = req.status;
        if (approved) {
            req.status = onboarding_enum_1.OnboardingStatus.COMPLETED;
            req.generatedEmail = dto.generatedEmail ?? null;
            req.generatedPassword = dto.generatedPassword ?? null;
            req.laptopConfig = dto.laptopConfig ?? null;
            const saved = await this.repo.save(req);
            await this.log(id, prev, onboarding_enum_1.OnboardingStatus.COMPLETED, "IT", `Email: ${dto.generatedEmail}, Laptop: ${dto.laptopConfig}`);
            return saved;
        }
        else {
            req.status = onboarding_enum_1.OnboardingStatus.NEEDS_REWORK;
            req.rejectionReason = dto.rejectionReason ?? null;
            const saved = await this.repo.save(req);
            await this.log(id, prev, onboarding_enum_1.OnboardingStatus.NEEDS_REWORK, "IT", dto.rejectionReason);
            return saved;
        }
    }
    async remove(id) {
        const req = await this.findOne(id);
        await this.repo.remove(req);
    }
};
exports.OnboardingService = OnboardingService;
exports.OnboardingService = OnboardingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(onboarding_request_entity_1.OnboardingRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(audit_log_entity_1.AuditLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OnboardingService);
//# sourceMappingURL=onboarding.service.js.map