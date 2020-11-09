import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreateDTO {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(128)
  public name: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  public password: string;
}
