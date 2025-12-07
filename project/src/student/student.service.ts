export class StudentModule {}
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { StudentEntity } from './entities/student.entity';
import { ProfileEntity } from './entities/profile.entity';
import { CourseEntity } from './entities/course.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { EnrollCourseDto } from './dto/enroll-course.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentEntity)
    private studentRepo: Repository<StudentEntity>,

    @InjectRepository(ProfileEntity)
    private profileRepo: Repository<ProfileEntity>,

    @InjectRepository(CourseEntity)
    private courseRepo: Repository<CourseEntity>,
  ) {}

 async create(data: CreateStudentDto) {
  // hash password
  const hashPass = await bcrypt.hash(data.password, 10);

  const student = this.studentRepo.create({
    username: data.username,
    fullName: data.fullName,
    password: hashPass,
    isActive: data.isActive ?? false,
  });

  await this.studentRepo.save(student);

  const profile = this.profileRepo.create({
    address: data.address || 'N/A',
    phoneNumber: data.phoneNumber || 'N/A',
    student,
  });

  await this.profileRepo.save(profile);

  // never return hashed password
  delete student.password;

  return {
    message: 'Student created successfully',
    student,
    profile,
  };
}


  async findByFullNameSubstring(name: string) {
    return this.studentRepo.find({
      where: { fullName: Like(`%${name}%`) },
      relations: ['profile', 'courses'],
    });
  }

  async findByUsername(username: string) {
    const student = await this.studentRepo.findOne({
      where: { username },
      relations: ['profile', 'courses'],
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async updateStudent(id: string, data: CreateStudentDto) {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');

    Object.assign(student, data);
    await this.studentRepo.save(student);
    return { message: 'Student updated successfully', student };
  }

  async removeByGenarateid(id: string) {
    const result = await this.studentRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }

  // PROFILE CRUD 
  async getProfileByStudentId(studentId: string) {
    const profile = await this.profileRepo.findOne({
      where: { student: { id: studentId } },
      relations: ['student'],
    });
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async updateProfile(id: number, data: UpdateProfileDto) {
    const profile = await this.profileRepo.findOne({ where: { id } });
    if (!profile) throw new NotFoundException('Profile not found');

    Object.assign(profile, data);
    await this.profileRepo.save(profile);
    return { message: 'Profile updated successfully', profile };
  }

  // COURSE CRUD
async addCourse(studentId: string, data: EnrollCourseDto) {
  const student = await this.studentRepo.findOne({ where: { id: studentId } });
  if (!student) throw new NotFoundException('Student not found');

  const course = this.courseRepo.create({
    courseName: data.courseName,
    courseCode: data.courseCode,
    student,
  });

  await this.courseRepo.save(course);
  return { message: 'Course enrolled successfully', course };
}
async getStudentsByCourseId(courseId: string) {
  const course = await this.courseRepo.findOne({
    where: { id: courseId },
    relations: ['student'], 
  });

  if (!course) throw new NotFoundException('Course not found');

  return course.student;
}



  async getCoursesByStudentId(studentId: string) {
    const courses = await this.courseRepo.find({
      where: { student: { id: studentId } },
    });
    return courses;
  }
}