import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

export enum TicketEvent {
  INSERT,
  UPDATE,
  REMOVE,
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    nullable: false,
    length: 500,
  })
  title?: string;

  @Column({
    nullable: false,
    length: 5000,
  })
  text?: string;

  @ManyToOne(
    () => User,
    user => user.tickets,
  )
  client?: User;

  @ManyToOne(
    () => User,
    user => user.tickets,
  )
  manager?: User;

  @CreateDateColumn()
  createdAt?: number;

  @UpdateDateColumn()
  updatedAt?: number;

  event?: TicketEvent;
}
