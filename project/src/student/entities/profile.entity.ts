import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { StudentEntity } from './student.entity';

@Entity('profiles')
export class ProfileEntity {       // ✅ MUST be exactly 'ProfileEntity'
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @OneToOne(() => StudentEntity, (student) => student.profile)
  student: StudentEntity;
}
