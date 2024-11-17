import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user';
import { SignupUserDto } from './dto/signup-user-dto';
import { LoginUserDto } from './dto/login-user-dto';
import { JwtResponseDto } from './dto/jwt-response-dto';
import { comparePasswords, hashPassword } from 'src/utils/compare-hash';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name)
    private readonly userRepository: Model<UserDocument>,
  ) {}

  async register(dto: SignupUserDto): Promise<JwtResponseDto> {
    const { password, email: existingEmail } = dto;

    const dbUser = await this.userRepository.findOne({ email: existingEmail });

    if (dbUser)
      throw new ConflictException('User with provided email already exists!');

    const hash = await hashPassword(password);

    const user = await this.userRepository.create({
      ...dto,
      password: hash,
    });

    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        username: user.username,
        email: user.email,
      },
    };
  }

  async login(dto: LoginUserDto): Promise<JwtResponseDto> {
    const { email, password } = dto;
    const user = await this.userRepository.findOne({ email }).exec();

    if (!user) throw new NotFoundException('Not found user with such email');

    const isHashValid = await comparePasswords(password, user.password);

    if (!isHashValid) throw new UnauthorizedException('Wrong password!');

    const payload = { email: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        username: user.username,
        email: user.email,
      },
    };
  }
}
