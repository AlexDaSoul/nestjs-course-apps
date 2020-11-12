import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TicketUuidDTO {
  @IsUUID()
  @ApiProperty()
  public id: string;
}
