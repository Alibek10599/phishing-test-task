import { jwtConstants } from 'src/modules/auth/constants';
import { JWT_TOKEN_TTL } from './constants';

export function security() {
  return {
    secret: jwtConstants.secret,
    signOptions: { expiresIn: JWT_TOKEN_TTL },
  };
}
