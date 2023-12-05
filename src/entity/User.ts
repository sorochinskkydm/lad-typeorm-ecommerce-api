import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Roles } from './Roles';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 64 })
  lastName: string;

  @Column('varchar', { length: 64 })
  firstName: string;

  @Column('varchar', { length: 64 })
  surname: string;

  @Column('varchar', { length: 64 })
  email: string;

  @Column('varchar', { length: 150 })
  user_pass: string;

  @OneToMany(() => Roles, (role) => role.id)
  role_id: number;
}
