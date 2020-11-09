import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
} from 'typeorm';
import { config } from 'dotenv';
import { Manager } from '@dal/entities/manager.entity';

config();

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

    @ManyToOne(() => Manager, (user) => user.tickets, { nullable: true })
    manager?: Manager;

    @CreateDateColumn()
    createdAt?: number;

    @UpdateDateColumn()
    updatedAt?: number;

    event?: TicketEvent;
}
