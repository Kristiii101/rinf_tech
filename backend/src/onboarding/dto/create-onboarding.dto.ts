import { IsBoolean, IsDateString, IsEnum, IsIn, IsNumber, IsOptional, IsString } from "class-validator";
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

  @IsNumber()
  @IsIn([4, 6, 8])
  @IsOptional()
  workHours?: number;
}
