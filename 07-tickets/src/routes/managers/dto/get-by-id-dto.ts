import { IsUUID } from 'class-validator';

export class GetByIdDTO {
  @IsUUID()
  public id: string;
}
