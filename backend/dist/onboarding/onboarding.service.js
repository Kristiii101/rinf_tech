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
const onboarding_enum_1 = require("../common/enums/onboarding.enum");
let OnboardingService = class OnboardingService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    findAll() {
        return this.repo.find({ order: { createdAt: "DESC" } });
    }
    async findOne(id) {
        const req = await this.repo.findOneBy({ id });
        if (!req)
            throw new common_1.NotFoundException(`Onboarding request ${id} not found`);
        return req;
    }
    create(dto) {
        const request = this.repo.create({ ...dto, status: onboarding_enum_1.OnboardingStatus.PENDING_MANAGER });
        return this.repo.save(request);
    }
    async update(id, dto) {
        const req = await this.findOne(id);
        Object.assign(req, dto, { status: onboarding_enum_1.OnboardingStatus.PENDING_MANAGER, rejectionReason: null });
        return this.repo.save(req);
    }
    async managerReview(id, approved, dto) {
        const req = await this.findOne(id);
        if (req.status !== onboarding_enum_1.OnboardingStatus.PENDING_MANAGER) {
            throw new common_1.BadRequestException("Request is not pending manager review");
        }
        if (approved) {
            req.status =
                req.hardwareTier === onboarding_enum_1.HardwareTier.PREMIUM
                    ? onboarding_enum_1.OnboardingStatus.PENDING_FINANCE
                    : onboarding_enum_1.OnboardingStatus.PENDING_IT;
        }
        else {
            req.status = onboarding_enum_1.OnboardingStatus.NEEDS_REWORK;
            req.rejectionReason = dto.rejectionReason ?? null;
        }
        return this.repo.save(req);
    }
    async financeReview(id, approved, dto) {
        const req = await this.findOne(id);
        if (req.status !== onboarding_enum_1.OnboardingStatus.PENDING_FINANCE) {
            throw new common_1.BadRequestException("Request is not pending finance review");
        }
        if (approved) {
            req.status = onboarding_enum_1.OnboardingStatus.PENDING_IT;
        }
        else {
            req.status = onboarding_enum_1.OnboardingStatus.NEEDS_REWORK;
            req.rejectionReason = dto.rejectionReason ?? null;
        }
        return this.repo.save(req);
    }
    async itProvision(id, approved, dto) {
        const req = await this.findOne(id);
        if (req.status !== onboarding_enum_1.OnboardingStatus.PENDING_IT) {
            throw new common_1.BadRequestException("Request is not pending IT provisioning");
        }
        if (approved) {
            req.status = onboarding_enum_1.OnboardingStatus.COMPLETED;
            req.generatedEmail = dto.generatedEmail ?? null;
            req.laptopConfig = dto.laptopConfig ?? null;
        }
        else {
            req.status = onboarding_enum_1.OnboardingStatus.NEEDS_REWORK;
            req.rejectionReason = dto.rejectionReason ?? null;
        }
        return this.repo.save(req);
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
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OnboardingService);
//# sourceMappingURL=onboarding.service.js.map