import { ConflictException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class EmailService {
  private sender: string;
  constructor(protected readonly configService: ConfigService) {
    const { sendGridKey, sender } = this.configService.get('email');

    this.sender = sender;
    sgMail.setApiKey(sendGridKey);
  }

  async sendEmail(to: string, emailContent: string): Promise<void> {
    try {
      const msg: sgMail.MailDataRequired = {
        to,
        from: this.sender,
        subject: 'Phishing attempt from your department!',
        html: emailContent,
      };

      await sgMail.send(msg);

      console.log(`Email sent successfully to ${to}`);
    } catch (error) {
      console.error(`Error upon sending email: ${error}.`);
      throw new ConflictException('Failed to send email');
    }
  }
}
