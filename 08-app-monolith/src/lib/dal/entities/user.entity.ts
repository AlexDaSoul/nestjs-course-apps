import { createHmac } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { config } from 'dotenv';
import { Ticket } from './ticket.entity';

config();

export enum Role {
  CLIENT = 'client',
  MANAGER = 'manager',
}

@Entity('users')
export class User {
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

  @Column({
    nullable: false,
    default: 'client',
    length: 8,
  })
  role?: Role;

  @ManyToMany(() => Ticket)
  public tickets?: Ticket[];

  @CreateDateColumn()
  createdAt?: number;

  @UpdateDateColumn()
  updatedAt?: number;
}
