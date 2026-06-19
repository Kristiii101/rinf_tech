import { IsEnum, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { CreateOnboardingDto } from "./create-onboarding.dto";
import { PartialType } from "@nestjs/mapped-types";
import { HardwareTier } from "../../common/enums/onboarding.enum";

export class UpdateOnboardingDto extends PartialType(CreateOnboardingDto) {}

export class ReviewOnboardingDto {
  @IsString()
  @IsOptional()
  rejectionReason?: string;

  @IsString()
  @IsOptional()
  approvalNote?: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  approvedBudget?: number;

  @IsEnum(HardwareTier)
  @IsOptional()
  overrideTier?: HardwareTier;
}
