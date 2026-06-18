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

  @Column()
  employeeName: string;

  @Column()
  role: string;

  @Column({ type: "date" })
  startDate: string;

  @Column({ type: "enum", enum: HardwareTier })
  hardwareTier: HardwareTier;

  @Column({ type: "enum", enum: OnboardingStatus, default: OnboardingStatus.PENDING_MANAGER })
  status: OnboardingStatus;

  @Column({ type: "varchar", nullable: true })
  rejectionReason: string | null;

  @Column({ type: "varchar", nullable: true })
  generatedEmail: string | null;

  @Column({ type: "varchar", nullable: true })
  laptopConfig: string | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
