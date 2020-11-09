import { IsUUID } from 'class-validator';

export class ManagerDTO {
    @IsUUID()
    public id: string;
}
