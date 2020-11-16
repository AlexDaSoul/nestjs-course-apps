import { MinLength, MaxLength, IsOptional, IsUUID } from 'class-validator';
import { Ticket } from '@dal/entities/ticket.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@dal/entities/user.entity';

export class UpdateUserDTO {
  @IsUUID()
  @ApiProperty()
  public id: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(128)
  @ApiProperty()
  public name?: string;

  @IsOptional()
  @ApiProperty()
  public tickets?: Ticket[];

  @IsOptional()
  @MinLength(4)
  @MaxLength(32)
  @ApiProperty()
  public password?: string;

  @IsOptional()
  @MaxLength(8)
  @ApiProperty({
    enum: Role,
    default: Role.CLIENT,
  })
  public role?: Role;
}
