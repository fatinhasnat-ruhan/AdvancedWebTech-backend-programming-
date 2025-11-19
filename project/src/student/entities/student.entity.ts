import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
import { v4 as uuid } from 'uuid';

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

  @Column({ length: 150 })
  fullName: string;

  @Column({ default: false })
  isActive: boolean;
}
