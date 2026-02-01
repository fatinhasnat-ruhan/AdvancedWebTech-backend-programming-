import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { StudentEntity } from './entities/student.entity';
import { ProfileEntity } from './entities/profile.entity';
import { CourseEntity } from './entities/course.entity';

import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { EnrollCourseDto } from './dto/enroll-course.dto';


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

  // ================= CREATE STUDENT =================
  async create(data: CreateStudentDto) {
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

    delete student.password;

    return {
      message: 'Student created successfully',
      student,
      profile,
    };
  }

  // ================= FIND =================
  async findByFullNameSubstring(name: string) {
    return this.studentRepo.find({
      where: { fullName: Like(`%${name}%`) },
      relations: {
        profile: true,
        courses: true,
      },
    });
  }

  async findByUsername(username: string) {
    const student = await this.studentRepo.findOne({
      where: { username },
      relations: {
        profile: true,
        courses: true,
      },
    });

    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  async getAllStudents() {
    return this.studentRepo.find({
      relations: {
        profile: true,
        courses: true,
      },
    });
  }

  // ================= UPDATE STUDENT =================
  async updateStudent(id: string, data: CreateStudentDto) {
    const student = await this.studentRepo.findOne({ where: { id } });
    if (!student) throw new NotFoundException('Student not found');

    Object.assign(student, data);
    await this.studentRepo.save(student);

    return { message: 'Student updated successfully', student };
  }

  // ================= DELETE STUDENT =================
  async removeByGenarateid(id: string) {
    const result = await this.studentRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
    return { message: 'User deleted successfully' };
  }

  // ================= PROFILE =================
  async updateProfileByStudent(studentId: string, data: UpdateProfileDto) {
    const student = await this.studentRepo.findOne({
      where: { id: studentId },
      relations: { profile: true },
    });

    if (!student) throw new NotFoundException('Student not found');

    // profile না থাকলে create
    if (!student.profile) {
      const profile = this.profileRepo.create({
        address: data.address,
        phoneNumber: data.phoneNumber,
        student,
      });

      await this.profileRepo.save(profile);
      return { message: 'Profile created & updated', profile };
    }

    // profile থাকলে update
    Object.assign(student.profile, data);
    await this.profileRepo.save(student.profile);

    return {
      message: 'Profile updated successfully',
      profile: student.profile,
    };
  }

  async getProfileByStudentId(studentId: string) {
    const profile = await this.profileRepo.findOne({
      where: { student: { id: studentId } },
      relations: { student: true },
    });

    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  // ================= COURSE =================
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

  async removeCourse(id: string) {
    await this.courseRepo.delete(id);
    return { message: 'Course removed' };
  }

  async getCoursesByStudentId(studentId: string) {
    return this.courseRepo.find({
      where: { student: { id: studentId } },
    });
  }

  async getStudentsByCourseId(courseId: string) {
    const course = await this.courseRepo.findOne({
      where: { id: courseId },
      relations: { student: true },
    });

    if (!course) throw new NotFoundException('Course not found');
    return course.student;
    
  }
}

