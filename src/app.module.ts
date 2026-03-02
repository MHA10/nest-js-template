/**
 * Root Application Module
 *
 * The core module of the NestJS application. It imports the configuration,
 * database setup, and all feature modules required to run the application.
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { databaseConfig } from '@config';
import { HealthModule } from '@modules';

/**
 * AppModule
 *
 * Bootstraps the application dependencies, including environment variables,
 * database connection, and feature modules.
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.getOrThrow('database'),
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
