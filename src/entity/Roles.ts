import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  role_name: string;
}
