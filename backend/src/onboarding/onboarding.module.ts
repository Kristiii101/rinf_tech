import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OnboardingRequest } from "./entities/onboarding-request.entity";
import { OnboardingService } from "./onboarding.service";
import { OnboardingController } from "./onboarding.controller";

@Module({
  imports: [TypeOrmModule.forFeature([OnboardingRequest])],
  controllers: [OnboardingController],
  providers: [OnboardingService],
})
export class OnboardingModule {}
