import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@dal/entities/user.entity';

export class CreateTicketDTO {
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty()
  public title: string;

  @IsNotEmpty()
  @MaxLength(5000)
  @ApiProperty()
  public text: string;

  @IsNotEmpty()
  @MaxLength(5000)
  @ApiProperty({
    type: 'string',
  })
  public client: User;
}
