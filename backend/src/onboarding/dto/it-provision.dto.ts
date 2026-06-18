import { IsOptional, IsString } from "class-validator";

export class ITProvisionDto {
  @IsString()
  generatedEmail: string;

  @IsString()
  laptopConfig: string;

  @IsString()
  @IsOptional()
  rejectionReason?: string;
}
