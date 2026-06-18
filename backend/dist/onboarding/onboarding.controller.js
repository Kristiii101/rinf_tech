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
exports.OnboardingController = void 0;
const common_1 = require("@nestjs/common");
const onboarding_service_1 = require("./onboarding.service");
const create_onboarding_dto_1 = require("./dto/create-onboarding.dto");
const review_onboarding_dto_1 = require("./dto/review-onboarding.dto");
const it_provision_dto_1 = require("./dto/it-provision.dto");
let OnboardingController = class OnboardingController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    create(dto) {
        return this.service.create(dto);
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    managerApprove(id) {
        return this.service.managerReview(id, true, {});
    }
    managerReject(id, dto) {
        return this.service.managerReview(id, false, dto);
    }
    financeApprove(id) {
        return this.service.financeReview(id, true, {});
    }
    financeReject(id, dto) {
        return this.service.financeReview(id, false, dto);
    }
    itProvision(id, dto) {
        return this.service.itProvision(id, true, dto);
    }
    itReject(id, dto) {
        return this.service.itProvision(id, false, dto);
    }
    remove(id) {
        return this.service.remove(id);
    }
};
exports.OnboardingController = OnboardingController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_onboarding_dto_1.CreateOnboardingDto]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_onboarding_dto_1.UpdateOnboardingDto]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(":id/manager/approve"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "managerApprove", null);
__decorate([
    (0, common_1.Patch)(":id/manager/reject"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_onboarding_dto_1.ReviewOnboardingDto]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "managerReject", null);
__decorate([
    (0, common_1.Patch)(":id/finance/approve"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "financeApprove", null);
__decorate([
    (0, common_1.Patch)(":id/finance/reject"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_onboarding_dto_1.ReviewOnboardingDto]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "financeReject", null);
__decorate([
    (0, common_1.Patch)(":id/it/provision"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, it_provision_dto_1.ITProvisionDto]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "itProvision", null);
__decorate([
    (0, common_1.Patch)(":id/it/reject"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, review_onboarding_dto_1.ReviewOnboardingDto]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "itReject", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingController.prototype, "remove", null);
exports.OnboardingController = OnboardingController = __decorate([
    (0, common_1.Controller)("onboarding"),
    __metadata("design:paramtypes", [onboarding_service_1.OnboardingService])
], OnboardingController);
//# sourceMappingURL=onboarding.controller.js.map