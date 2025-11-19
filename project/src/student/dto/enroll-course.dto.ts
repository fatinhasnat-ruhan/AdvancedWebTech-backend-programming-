import { IsNotEmpty } from 'class-validator';

export class EnrollCourseDto {
  @IsNotEmpty()
  courseName: string;

  @IsNotEmpty()
  courseCode: string;
}
