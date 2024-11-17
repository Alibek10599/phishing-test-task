import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { SignupUserDto } from './dto/signup-user-dto';
import { JwtResponseDto } from './dto/jwt-response-dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: SignupUserDto): Promise<JwtResponseDto> {
    return await this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<JwtResponseDto> {
    try {
      return await this.authService.login(dto);
    } catch (error) {
      throw new ConflictException(error);
    }
  }
}
