import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepo: Repository<StudentEntity>,
  ) {}

  async create(data: CreateStudentDto) {
    const newStudent = this.studentRepo.create({
      username: data.username,
      fullName: data.fullName,
      isActive: data.isActive ?? false,
    });

    await this.studentRepo.save(newStudent);
    return { message: 'Student created successfully', student: newStudent };
  }

  async findByFullNameSubstring(name: string) {
    return this.studentRepo.find({ where: { fullName: Like(`%${name}%`) } });
  }

  async findByUsername(username: string) {
    const student = await this.studentRepo.findOne({ where: { username } });
    if (!student) throw new NotFoundException('User not found');
    return student;
  }

  async removeByGenarateid(id: string) {
    const result = await this.studentRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
    
  }
}
