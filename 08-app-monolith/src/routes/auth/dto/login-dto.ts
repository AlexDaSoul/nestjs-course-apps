import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength } from 'class-validator';

export class LoginDTO {
  @MinLength(2)
  @MaxLength(128)
  @ApiProperty()
  public name: string;

  @MinLength(4)
  @MaxLength(32)
  @ApiProperty()
  public password: string;
}
