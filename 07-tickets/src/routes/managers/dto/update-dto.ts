import { MinLength, MaxLength, IsOptional, IsUUID } from 'class-validator';
import { Ticket } from '@dal/entities/ticket.entity';

export class UpdateDTO {
  @IsUUID()
  public id: string;

  @IsOptional()
  @MinLength(2)
  @MaxLength(128)
  public name?: string;

  @IsOptional()
  public tickets?: Ticket[];

  @IsOptional()
  @MinLength(4)
  @MaxLength(32)
  public password?: string;
}
