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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingRequest = void 0;
const typeorm_1 = require("typeorm");
const onboarding_enum_1 = require("../../common/enums/onboarding.enum");
let OnboardingRequest = class OnboardingRequest {
    id;
    firstName;
    lastName;
    role;
    startDate;
    hardwareTier;
    status;
    isUrgent;
    workHours;
    rejectionReason;
    generatedEmail;
    generatedPassword;
    laptopConfig;
    approvedBudget;
    createdAt;
    updatedAt;
};
exports.OnboardingRequest = OnboardingRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], OnboardingRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], OnboardingRequest.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], OnboardingRequest.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OnboardingRequest.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", String)
], OnboardingRequest.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: onboarding_enum_1.HardwareTier }),
    __metadata("design:type", String)
], OnboardingRequest.prototype, "hardwareTier", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: onboarding_enum_1.OnboardingStatus, default: onboarding_enum_1.OnboardingStatus.PENDING_MANAGER }),
    __metadata("design:type", String)
], OnboardingRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "boolean", default: false }),
    __metadata("design:type", Boolean)
], OnboardingRequest.prototype, "isUrgent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 8 }),
    __metadata("design:type", Number)
], OnboardingRequest.prototype, "workHours", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], OnboardingRequest.prototype, "rejectionReason", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], OnboardingRequest.prototype, "generatedEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], OnboardingRequest.prototype, "generatedPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: true }),
    __metadata("design:type", Object)
], OnboardingRequest.prototype, "laptopConfig", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Object)
], OnboardingRequest.prototype, "approvedBudget", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OnboardingRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OnboardingRequest.prototype, "updatedAt", void 0);
exports.OnboardingRequest = OnboardingRequest = __decorate([
    (0, typeorm_1.Entity)("onboarding_requests")
], OnboardingRequest);
//# sourceMappingURL=onboarding-request.entity.js.map