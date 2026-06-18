import { IsOptional, IsString } from "class-validator";
import { CreateOnboardingDto } from "./create-onboarding.dto";
import { PartialType } from "@nestjs/mapped-types";

export class UpdateOnboardingDto extends PartialType(CreateOnboardingDto) {}

export class ReviewOnboardingDto {
  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
