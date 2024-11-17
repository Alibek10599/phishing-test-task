import { User } from '../types/user';

export class JwtResponseDto {
  readonly access_token: string;
  user: User;
}
