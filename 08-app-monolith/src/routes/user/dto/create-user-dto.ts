import { ApiProperty } from '@nestjs/swagger';
import { MinLength, MaxLength, IsOptional } from 'class-validator';
import { Role } from '@dal/entities/user.entity';

export class CreateUserDTO {
  @MinLength(2)
  @MaxLength(128)
  @ApiProperty()
  public name: string;

  @MinLength(4)
  @MaxLength(32)
  @ApiProperty()
  public password: string;

  @IsOptional()
  @MaxLength(8)
  @ApiProperty({
    enum: Role,
    default: Role.CLIENT,
  })
  public role?: Role;
}
