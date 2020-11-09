import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1604563177901 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
create table if not exists managers
(
    id uuid default uuid_generate_v4() not null,
    "name" varchar(50),
    "password" varchar(128) not null,
    "createdAt" timestamp default now() not null,
    "updatedAt" timestamp default now() not null,
    constraint "PK_MANAGERS"
        primary key (id),
    constraint "PK_MANAGERS__NAME"
        unique ("name")
);

create table if not exists tickets
(
    id uuid default uuid_generate_v4() not null,
    "title" varchar(500),
    "text" varchar(128) not null,
    "managerId" uuid,
    "createdAt" timestamp default now() not null,
    "updatedAt" timestamp default now() not null,
    constraint "PK_TICKETS"
        primary key (id),
    constraint "FK_TICKETS__MANAGER_ID"
        foreign key ("managerId") references managers
);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`drop table if exists managers`);
        await queryRunner.query(`drop table if exists tickets`);
    }

}
