import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string, role: UserRole) {
    const userExists = await this.userRepo.findOne({ where: { email } });
    if (userExists) {
      throw new ConflictException({
        success: false,
        message: 'Account exists already',
      });
    }

    const hashed_password = await argon2.hash(password);
    const user = this.userRepo.create({
      email,
      password: hashed_password,
      role,
    });
    await this.userRepo.save(user);
    return this.signToken(user.id, user.role);
  }

  async login(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const password_is_valid = await argon2.verify(user.password, password);
    if (!password_is_valid) {
      throw new UnauthorizedException({
        success: false,
        message: ' Invalid credentials',
      });
    }
    return this.signToken(user.id, user.role);
  }

  private signToken(user_id: number, role: UserRole) {
    const payload = {
      user_id,
      role,
    };

    return { access_token: this.jwtService.sign(payload) };
  }
}
