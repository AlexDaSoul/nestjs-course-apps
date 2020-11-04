import { createHmac } from 'crypto';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { config } from 'dotenv';

config();

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId?: string;

  @Column({
    nullable: false,
    unique: true,
    length: 128,
  })
  username?: string;

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

  @CreateDateColumn()
  createdAt?: number;

  @UpdateDateColumn()
  updatedAt?: number;
}
