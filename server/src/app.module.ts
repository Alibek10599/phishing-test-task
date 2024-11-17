import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { PhishingModule } from './modules/phishing/phishing.module';
import configuration from './config/configuration';
import { Env } from './utils/env';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: [
        Env.readString('NODE_ENV', '')
          ? `.env.${Env.readString('NODE_ENV', '')}`
          : null,
        '.env',
        '.sample.env',
      ].filter(Boolean),
      expandVariables: true,
    }),
    PhishingModule,
    AuthModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtAuthGuard],
})
export class AppModule {}
