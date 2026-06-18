"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HardwareTier = exports.OnboardingStatus = void 0;
var OnboardingStatus;
(function (OnboardingStatus) {
    OnboardingStatus["PENDING_MANAGER"] = "PENDING_MANAGER";
    OnboardingStatus["PENDING_FINANCE"] = "PENDING_FINANCE";
    OnboardingStatus["PENDING_IT"] = "PENDING_IT";
    OnboardingStatus["NEEDS_REWORK"] = "NEEDS_REWORK";
    OnboardingStatus["COMPLETED"] = "COMPLETED";
})(OnboardingStatus || (exports.OnboardingStatus = OnboardingStatus = {}));
var HardwareTier;
(function (HardwareTier) {
    HardwareTier["STANDARD"] = "Standard";
    HardwareTier["PREMIUM"] = "Premium";
})(HardwareTier || (exports.HardwareTier = HardwareTier = {}));
//# sourceMappingURL=onboarding.enum.js.map