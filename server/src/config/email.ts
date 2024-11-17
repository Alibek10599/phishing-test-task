import { Env } from 'src/utils/env';

export function email() {
  return {
    sendGridKey: Env.readString('SENDGRID_API_KEY'),
    sender: Env.readString('SENDGRID_SENDER'),
  };
}
