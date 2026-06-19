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
  firstName: string;
  lastName: string;
  role: string;
  startDate: string;
  hardwareTier: HardwareTier;
  status: OnboardingStatus;
  isUrgent: boolean;
  workHours: 4 | 6 | 8;
  rejectionReason?: string | null;
  generatedEmail?: string | null;
  generatedPassword?: string | null;
  laptopConfig?: string | null;
  approvedBudget?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface AuditLogEntry {
  id: string;
  requestId: string;
  fromStatus: OnboardingStatus | null;
  toStatus: OnboardingStatus;
  actor: string | null;
  note: string | null;
  createdAt: string;
}
