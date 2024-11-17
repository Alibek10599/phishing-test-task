import { ConflictException, Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { Model } from 'mongoose';
import { Phishing, PhishingDocument } from 'src/schemas/phishing';
import { InjectModel } from '@nestjs/mongoose';
import { PhishingStatus } from './phishing-status.enum';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PhishingService {
  constructor(
    private readonly emailService: EmailService,
    @InjectModel(Phishing.name)
    private readonly phishingRepository: Model<PhishingDocument>,
  ) {}

  async sendPhishingEmail(email: string): Promise<PhishingDocument> {
    const uuid = uuidv4();
    const url = `${process.env.APP_URL}/phishing/click?id=${uuid}`;
    const content = `
        <p>Dear User,</p>
        <p>Please click the link below to verify your email address:</p>
        <a href="${url}" style="color: blue; text-decoration: underline;">Verify Email</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Best regards,<br>Your Company</p>
      `;

    await this.emailService.sendEmail(email, content);

    const phishing = new this.phishingRepository({
      uuid,
      email: email,
      status: PhishingStatus.Pending,
      content,
    });

    await phishing.save();

    return phishing;
  }

  async markAsClicked(uuid: string): Promise<void> {
    const phishing = await this.phishingRepository.findOne({
      uuid,
    });

    console.log(`User with email ${phishing.email} clicked the phishing link!`);

    if (!phishing) new ConflictException('Phishing attempt not found!');

    phishing.status = PhishingStatus.Clicked;
    phishing.clickTimestamp = new Date();
    phishing.clicked = true;
    await phishing.save();
  }

  async getAll() {
    return this.phishingRepository.find();
  }
}
