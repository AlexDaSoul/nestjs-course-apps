import { IsUUID } from 'class-validator';

export class GetByManagerDTO {
  @IsUUID()
  public id?: string;
}
