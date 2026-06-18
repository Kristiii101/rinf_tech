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

  @Column({ nullable: true })
  rejectionReason: string;

  @Column({ nullable: true })
  generatedEmail: string;

  @Column({ nullable: true })
  laptopConfig: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
