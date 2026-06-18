import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { OnboardingService } from "./onboarding.service";
import { CreateOnboardingDto } from "./dto/create-onboarding.dto";
import { UpdateOnboardingDto, ReviewOnboardingDto } from "./dto/review-onboarding.dto";
import { ITProvisionDto } from "./dto/it-provision.dto";

@Controller("onboarding")
export class OnboardingController {
  constructor(private readonly service: OnboardingService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateOnboardingDto) {
    return this.service.create(dto);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateOnboardingDto) {
    return this.service.update(id, dto);
  }

  @Patch(":id/manager/approve")
  managerApprove(@Param("id") id: string, @Body() dto: ReviewOnboardingDto) {
    return this.service.managerReview(id, true, dto);
  }

  @Patch(":id/manager/reject")
  managerReject(@Param("id") id: string, @Body() dto: ReviewOnboardingDto) {
    return this.service.managerReview(id, false, dto);
  }

  @Patch(":id/finance/approve")
  financeApprove(@Param("id") id: string, @Body() dto: ReviewOnboardingDto) {
    return this.service.financeReview(id, true, dto);
  }

  @Patch(":id/finance/reject")
  financeReject(@Param("id") id: string, @Body() dto: ReviewOnboardingDto) {
    return this.service.financeReview(id, false, dto);
  }

  @Patch(":id/it/provision")
  itProvision(@Param("id") id: string, @Body() dto: ITProvisionDto) {
    return this.service.itProvision(id, true, dto);
  }

  @Patch(":id/it/reject")
  itReject(@Param("id") id: string, @Body() dto: ReviewOnboardingDto) {
    return this.service.itProvision(id, false, dto as ITProvisionDto);
  }

  @Get(":id/audit")
  getAuditLog(@Param("id") id: string) {
    return this.service.getAuditLog(id);
  }

  @Delete(":id")
  @HttpCode(204)
  remove(@Param("id") id: string) {
    return this.service.remove(id);
  }
}
