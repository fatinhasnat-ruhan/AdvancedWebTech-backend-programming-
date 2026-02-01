import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ProfileEntity } from './profile.entity';
import { CourseEntity } from './course.entity';

@Entity('students')
export class StudentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100, unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ length: 150 })
  fullName: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => ProfileEntity, (profile) => profile.student, { cascade: true })
  @JoinColumn()
  profile: ProfileEntity;

  @OneToMany(() => CourseEntity, (course) => course.student, { cascade: true })
  courses: CourseEntity[];
}
