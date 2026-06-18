import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OnboardingRequest } from "../../onboarding/entities/onboarding-request.entity";
import { OnboardingStatus } from "../../common/enums/onboarding.enum";

@Entity("audit_logs")
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => OnboardingRequest, { onDelete: "CASCADE" })
  request: OnboardingRequest;

  @Column()
  requestId: string;

  @Column({ type: "enum", enum: OnboardingStatus, nullable: true })
  fromStatus: OnboardingStatus | null;

  @Column({ type: "enum", enum: OnboardingStatus })
  toStatus: OnboardingStatus;

  @Column({ type: "varchar", nullable: true })
  actor: string | null;

  @Column({ type: "varchar", nullable: true })
  note: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
