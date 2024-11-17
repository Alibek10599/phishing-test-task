import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EmailModule } from 'src/modules/email/email.module';
import { Phishing, PhishingSchema } from 'src/schemas/phishing';
import { PhishingService } from './phishing.service';
import { PhishingController } from './phishing.controller';

@Module({
  imports: [
    EmailModule,
    MongooseModule.forFeature([
      { name: Phishing.name, schema: PhishingSchema },
    ]),
  ],
  controllers: [PhishingController],
  providers: [PhishingService],
})
export class PhishingModule {}
