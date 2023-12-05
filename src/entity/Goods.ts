import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Producers } from './Producers';

@Entity()
export class Goods {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 64 })
  title: string;

  @OneToMany(() => Producers, (producer) => producer.id)
  producer_id: number;

  @OneToMany(() => Good_types, (good_type) => good_type.id)
  type_id: number;

  @Column('text')
  description: string;
}

@Entity()
export class Good_types {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  type_name: string;
}
