import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { HardwareTier, OnboardingStatus } from "../../common/enums/onboarding.enum";

@Entity("onboarding_requests")
export class OnboardingRequest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  firstName: string;

  @Column({ type: "varchar" })
  lastName: string;

  @Column()
  role: string;

  @Column({ type: "date" })
  startDate: string;

  @Column({ type: "enum", enum: HardwareTier })
  hardwareTier: HardwareTier;

  @Column({ type: "enum", enum: OnboardingStatus, default: OnboardingStatus.PENDING_MANAGER })
  status: OnboardingStatus;

  @Column({ type: "boolean", default: false })
  isUrgent: boolean;

  @Column({ type: "int", default: 8 })
  workHours: number;

  @Column({ type: "varchar", nullable: true })
  rejectionReason: string | null;

  @Column({ type: "varchar", nullable: true })
  generatedEmail: string | null;

  @Column({ type: "varchar", nullable: true })
  generatedPassword: string | null;

  @Column({ type: "varchar", nullable: true })
  laptopConfig: string | null;

  @Column({ type: "int", nullable: true })
  approvedBudget: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
