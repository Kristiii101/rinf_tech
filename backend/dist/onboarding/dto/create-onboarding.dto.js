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
exports.CreateOnboardingDto = void 0;
const class_validator_1 = require("class-validator");
const onboarding_enum_1 = require("../../common/enums/onboarding.enum");
class CreateOnboardingDto {
    firstName;
    lastName;
    role;
    startDate;
    hardwareTier;
    isUrgent;
}
exports.CreateOnboardingDto = CreateOnboardingDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOnboardingDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOnboardingDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOnboardingDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateOnboardingDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(onboarding_enum_1.HardwareTier),
    __metadata("design:type", String)
], CreateOnboardingDto.prototype, "hardwareTier", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateOnboardingDto.prototype, "isUrgent", void 0);
//# sourceMappingURL=create-onboarding.dto.js.map