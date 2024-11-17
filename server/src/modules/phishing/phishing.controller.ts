import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PhishingService } from './phishing.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { SendPhishingDTO } from './dto/send-phishing-dto';

@Controller('phishing')
export class PhishingController {
  constructor(private readonly phishingService: PhishingService) {}

  @Post('send')
  @UseGuards(JwtAuthGuard)
  async sendEmail(@Body() dto: SendPhishingDTO) {
    const { email } = dto;
    try {
      return this.phishingService.sendPhishingEmail(email);
    } catch (error) {
      throw new ConflictException(`Error on sending email: ${error}.`);
    }
  }

  @Get('click')
  async markClick(@Query('id') uuid: string) {
    return this.phishingService.markAsClicked(uuid);
  }

  @Get('attempts')
  @UseGuards(JwtAuthGuard)
  async getAllAttempts() {
    return await this.phishingService.getAll();
  }
}
