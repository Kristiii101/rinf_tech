import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OnboardingModule } from "./onboarding/onboarding.module";
import { OnboardingRequest } from "./onboarding/entities/onboarding-request.entity";
import { AuditLog } from "./onboarding/entities/audit-log.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get("DB_HOST", "localhost"),
        port: config.get<number>("DB_PORT", 5432),
        username: config.get("DB_USER", "postgres"),
        password: config.get("DB_PASSWORD", "postgres"),
        database: config.get("DB_NAME", "onboarding"),
        entities: [OnboardingRequest, AuditLog],
        synchronize: true,
      }),
    }),
    OnboardingModule,
  ],
})
export class AppModule {}
