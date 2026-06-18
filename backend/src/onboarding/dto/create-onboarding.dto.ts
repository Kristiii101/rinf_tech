import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString } from "class-validator";
import { HardwareTier } from "../../common/enums/onboarding.enum";

export class CreateOnboardingDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  role: string;

  @IsDateString()
  startDate: string;

  @IsEnum(HardwareTier)
  hardwareTier: HardwareTier;

  @IsBoolean()
  @IsOptional()
  isUrgent?: boolean;
}
