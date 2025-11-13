import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { EnrollCourseDto } from './dto/enroll-course.dto';

@Injectable()
export class StudentService {
  private students = [];
  private enrollments = [];
  private studentIdCounter = 1;

  create(data: CreateStudentDto) {
    const newStudent = { id: this.studentIdCounter++, ...data };
    this.students.push(newStudent);
    return { message: 'Student registered successfully', student: newStudent };
  }

  findByFilters(filters: { name?: string; password?: string }) {
    return this.students.filter(student => {
      let match = true;
      if (filters.name)
        match =
          match &&
          student.name.toLowerCase().includes(filters.name.toLowerCase());
      if (filters.password) match = match && student.password === filters.password;
      return match;
    });
  }

  findOne(id: number) {
    return (
      this.students.find(s => s.id === id) || {
        message: 'Student not found',
      }
    );
  }

  update(id: number, data: UpdateStudentDto) {
    const index = this.students.findIndex(s => s.id === id);
    if (index === -1) return { message: 'Student not found' };

    this.students[index] = { ...this.students[index], ...data };
    return { message: 'Student updated', student: this.students[index] };
  }

  delete(id: number) {
    const exists = this.students.some(s => s.id === id);
    if (!exists) return { message: 'Student not found' };

    this.students = this.students.filter(s => s.id !== id);
    return { message: 'Student deleted successfully' };
  }

  enroll(id: number, dto: EnrollCourseDto) {
    const student = this.students.find(s => s.id === id);
    if (!student) return { message: 'Student not found' };

    const enrollment = { studentId: id, ...dto };
    this.enrollments.push(enrollment);

    return { message: 'Enrollment successful', enrollment };
  }

  getCourses(id: number) {
    const student = this.students.find(s => s.id === id);
    if (!student) return { message: 'Student not found' };

    return this.enrollments.filter(e => e.studentId === id);
  }
}
