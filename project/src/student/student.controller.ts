import { Controller, Get, Post, Delete, Body, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

   
  @Post('create')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  create(@Body() body: CreateStudentDto) {
    return this.studentService.create(body);
  }

  @Get('search-fullname')
  searchByFullName(@Query('name') name: string) {
    return this.studentService.findByFullNameSubstring(name);
  }

  @Get('username/:username')
  getByUsername(@Param('username') username: string) {
    return this.studentService.findByUsername(username);
  }

  @Delete('id/:id')
  deleteByGenaratedId(@Param('id') id: string) {
    return this.studentService.removeByGenarateid (id)};

    
  }

