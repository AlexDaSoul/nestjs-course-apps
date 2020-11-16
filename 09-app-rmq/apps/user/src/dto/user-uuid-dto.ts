import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUuidDTO {
  @IsUUID()
  @ApiProperty()
  public id: string;
}
