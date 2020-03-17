import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
// Modules
import { UserModule } from "./modules/user/user.module";
import { AuthModule } from "./modules/auth/auth.module";

const migrationsDir = "/db/migrations";

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mongodb",
        url: configService.get<string>("DATABASE_URL"),
        entities: ["dist/**/*.entity{.ts,.js}"],
        migrations: [migrationsDir + "/*.js"],
        cli: { migrationsDir },
        synchronize: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
})
export class AppModule {}
