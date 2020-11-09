import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateDTO {
    @IsNotEmpty()
    @MaxLength(500)
    public title: string;

    @IsNotEmpty()
    @MaxLength(5000)
    public text: string;
}
