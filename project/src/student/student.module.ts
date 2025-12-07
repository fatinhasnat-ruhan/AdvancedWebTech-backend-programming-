





import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { StudentEntity } from './entities/student.entity';
import { ProfileEntity } from './entities/profile.entity';
import { CourseEntity } from './entities/course.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StudentEntity,
      ProfileEntity,
      CourseEntity,
    ]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}