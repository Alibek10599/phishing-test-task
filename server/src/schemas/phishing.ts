import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { PhishingStatus } from 'src/modules/phishing/phishing-status.enum';

export type PhishingDocument = HydratedDocument<Phishing>;

@Schema()
export class Phishing {
  @Prop()
  uuid: string;

  @Prop()
  email: string;

  @Prop()
  content: string;

  @Prop({
    type: String,
    enum: PhishingStatus,
    default: PhishingStatus.Pending,
  })
  status: PhishingStatus;

  @Prop({ default: false })
  clicked: boolean;

  @Prop()
  clickTimestamp: Date;
}

export const PhishingSchema = SchemaFactory.createForClass(Phishing);
