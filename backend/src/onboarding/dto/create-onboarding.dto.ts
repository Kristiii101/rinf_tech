import { IsDateString, IsEnum, IsString } from "class-validator";
import { HardwareTier } from "../../common/enums/onboarding.enum";

export class CreateOnboardingDto {
  @IsString()
  employeeName: string;

  @IsString()
  role: string;

  @IsDateString()
  startDate: string;

  @IsEnum(HardwareTier)
  hardwareTier: HardwareTier;
}
