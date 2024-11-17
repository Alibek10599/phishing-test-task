import { Env } from 'src/utils/env';

export function database() {
  return Env.readString('MONGODB_URI');
}
