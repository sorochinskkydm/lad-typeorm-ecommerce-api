import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Goods } from './Goods';

@Entity()
export class Producers {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 32 })
  producer_name: string;

  @Column('varchar', { length: 32 })
  country: string;

  @OneToMany(() => Goods, (good) => good.title)
  good: Goods;
}
