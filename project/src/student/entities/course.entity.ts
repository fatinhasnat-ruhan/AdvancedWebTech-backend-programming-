import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity('courses')
export class CourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  courseName: string;

  @Column()
  courseCode: string;

  @ManyToOne(() => StudentEntity, (student) => student.courses)
  student: StudentEntity;
}
