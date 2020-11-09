import { MaxLength, IsOptional, IsUUID } from 'class-validator';
import { Manager } from '@dal/entities/manager.entity';

export class UpdateDTO {
    @IsUUID()
    public id: string;

    @IsOptional()
    @MaxLength(500)
    public title?: string;

    @IsOptional()
    @MaxLength(5000)
    public text?: string;

    @IsOptional()
    public manager?: Manager;
}
