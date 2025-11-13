import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { EnrollCourseDto } from './dto/enroll-course.dto';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  async create(@Body() body: any) {
    const dto = plainToInstance(CreateStudentDto, body);
    const errors = await validate(dto);

    if (errors.length > 0) return this.formatErrors(errors);

    return this.studentService.create(dto);
  }

@Get('getinfo')
findByFilters(
  @Query('name') name?: string,
  @Query('password') password?: string,
) {
  return this.studentService.findByFilters({ name, password });
}

  @Get(':id/courses')
  getCourses(@Param('id') id: string) {
    return this.studentService.getCourses(Number(id));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(Number(id));
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const dto = plainToInstance(UpdateStudentDto, body);
    const errors = await validate(dto, { skipMissingProperties: true });

    if (errors.length > 0) return this.formatErrors(errors);

    return this.studentService.update(Number(id), dto);
  }

  @Patch(':id')
  async partialUpdate(@Param('id') id: string, @Body() body: any) {
    const dto = plainToInstance(UpdateStudentDto, body);
    const errors = await validate(dto, { skipMissingProperties: true });

    if (errors.length > 0) return this.formatErrors(errors);

    return this.studentService.update(Number(id), dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.delete(Number(id));
  }

  @Post(':id/enroll')
  async enroll(@Param('id') id: string, @Body() body: any) {
    const dto = plainToInstance(EnrollCourseDto, body);
    const errors = await validate(dto);

    if (errors.length > 0) return this.formatErrors(errors);

    return this.studentService.enroll(Number(id), dto);
  }

  private formatErrors(errors: any) {
    return {
      message: 'Validation failed',
      errors: errors.map(err => ({
        field: err.property,
        messages: Object.values(err.constraints),
      })),
    };
  }
}
