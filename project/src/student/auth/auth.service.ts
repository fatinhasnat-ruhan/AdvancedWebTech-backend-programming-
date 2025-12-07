import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { StudentEntity } from '../entities/student.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(StudentEntity)
    private readonly studentRepo: Repository<StudentEntity>,
    private readonly jwtService: JwtService,
  ) {}

  // REGISTER
  async register(data: any) {
    const hash = await bcrypt.hash(data.password, 10);

    const student = this.studentRepo.create({
      username: data.username,
      fullName: data.fullName,
      isActive: false,
      password: hash,
    });

    await this.studentRepo.save(student);
    return { message: 'Registration successful', student };
  }

  // LOGIN
  async login(username: string, password: string) {
    const student = await this.studentRepo.findOne({ where: { username } });
    if (!student) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, student.password);
    if (!match) throw new UnauthorizedException('Wrong password');

    const token = this.jwtService.sign({ id: student.id, username });

    return {
      message: 'Login successful',
      accessToken: token,
    };
  }

  // VALIDATE USER
  async validateUser(payload: any) {
    return this.studentRepo.findOne({ where: { id: payload.id } });
  }
}
