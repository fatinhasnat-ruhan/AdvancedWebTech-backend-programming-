import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Patch,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { EnrollCourseDto } from './dto/enroll-course.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.guard';
@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  //  STUDENT ROUTES 
  @Post('create')
@UsePipes(new ValidationPipe({ whitelist: true }))
create(@Body() body: CreateStudentDto) {
  return this.studentService.create(body);
}

  @UseGuards(JwtAuthGuard)
  @Get('username/:username')
  getByUsername(@Param('username') username: string) {
    return this.studentService.findByUsername(username);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search-fullname')
  searchByFullName(@Query('name') name: string) {
    return this.studentService.findByFullNameSubstring(name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update/:id')
  updateStudent(
    @Param('id') id: string,
    @Body() body: CreateStudentDto,
  ) {
    return this.studentService.updateStudent(id, body);
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete('id/:id')
  deleteByGeneratedId(@Param('id') id: string) {
    return this.studentService.removeByGenarateid(id);
  }

  // PROFILE ROUTES 
  @UseGuards(JwtAuthGuard)
  @Get('profile/:studentId')
  getProfile(@Param('studentId') studentId: string) {
    return this.studentService.getProfileByStudentId(studentId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile/update/:id')
  updateProfile(
    @Param('id') id: number,
    @Body() body: UpdateProfileDto,
  ) {
    return this.studentService.updateProfile(id, body);
  }

  // COURSE ROUTES 
  @UseGuards(JwtAuthGuard)
  @Post('course/add/:studentId')
  addCourse(
    @Param('studentId') studentId: string,
    @Body() body: EnrollCourseDto,
  ) {
    return this.studentService.addCourse(studentId, body);
  }
  @UseGuards(JwtAuthGuard)
  @Get('course/student/:studentId')
  getCourses(@Param('studentId') studentId: string) {
    return this.studentService.getCoursesByStudentId(studentId);
  }
}