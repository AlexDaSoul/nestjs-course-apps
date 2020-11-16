import { MaxLength, IsOptional, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@dal/entities/user.entity';

export class UpdateTicketDTO {
  @IsUUID()
  @ApiProperty()
  public id: string;

  @IsOptional()
  @MaxLength(500)
  @ApiProperty()
  public title?: string;

  @IsOptional()
  @MaxLength(5000)
  @ApiProperty()
  public text?: string;

  @IsOptional()
  @ApiProperty({
    type: 'string',
  })
  public client?: User;

  @IsOptional()
  @ApiProperty({
    type: 'string',
  })
  public manager?: User;
}
