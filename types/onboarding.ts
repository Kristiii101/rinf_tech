export type HardwareTier = "Standard" | "Premium";

export type OnboardingStatus =
  | "PENDING_MANAGER"
  | "PENDING_FINANCE"
  | "PENDING_IT"
  | "NEEDS_REWORK"
  | "COMPLETED"
  | "REJECTED";

export interface OnboardingRequest {
  id: string;
  employeeName: string;
  role: string;
  startDate: string;
  hardwareTier: HardwareTier;
  status: OnboardingStatus;
  rejectionReason?: string;
  generatedEmail?: string;
  createdAt: string;
  updatedAt: string;
}
