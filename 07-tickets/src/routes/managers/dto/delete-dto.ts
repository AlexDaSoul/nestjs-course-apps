import { IsUUID } from 'class-validator';

export class DeleteDTO {
    @IsUUID()
    public id: string;
}
