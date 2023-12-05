import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Producers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  producer_name: string;

  @Column('varchar', { length: 32 })
  country: string;
}
