import { createHmac } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { config } from 'dotenv';
import { Ticket } from '@dal/entities/ticket.entity';

config();

@Entity('managers')
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    unique: true,
    length: 128,
  })
  name?: string;

  @Column({
    nullable: false,
    length: 128,
    select: false,
    transformer: {
      from: value => value,
      to: value =>
        createHmac('sha512', process.env.SALT)
          .update(value)
          .digest('hex'),
    },
  })
  password?: string;

  @OneToMany(
    () => Ticket,
    tiket => tiket.manager,
    { cascade: false },
  )
  public tickets?: Ticket[];

  @CreateDateColumn()
  createdAt?: number;

  @UpdateDateColumn()
  updatedAt?: number;
}
