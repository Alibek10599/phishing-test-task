import { PhishingStatus } from '../phishing-status.enum';

export class PhishingDTO {
  uuid: string;
  email: string;
  content: string;
  status: PhishingStatus;
  clicked: boolean;
  clickTimeStamp: Date;
}
