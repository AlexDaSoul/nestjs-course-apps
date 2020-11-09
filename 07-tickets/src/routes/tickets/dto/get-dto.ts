import { IsUUID } from 'class-validator';

export class GetDTO {
    @IsUUID()
    public id?: string;
}
