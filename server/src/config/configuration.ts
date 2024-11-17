import { database } from './database';

import { security } from './security';
import { email } from './email';
import { Env } from 'src/utils/env';

export default () => {
  Env.init();

  const config: any = {};
  const configParts = {
    database,
    security,
    email,
  };

  for (const key in configParts) {
    config[key] = configParts[key](config);
  }

  return config;
};
