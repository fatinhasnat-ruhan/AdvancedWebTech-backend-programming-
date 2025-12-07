import {
  Entity,
  Column,
  PrimaryColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import { ProfileEntity } from './profile.entity';
import { CourseEntity } from './course.entity';

@Entity('students')
export class StudentEntity {
  @PrimaryColumn()
  id: string;

  @BeforeInsert()
  generateId() {
    this.id = uuid();
  }

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ nullable: true }) 
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
