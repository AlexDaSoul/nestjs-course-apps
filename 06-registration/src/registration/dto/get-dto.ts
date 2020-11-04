import { IsUUID } from 'class-validator';

export class GetDTO {
  @IsUUID()
  public userId?: string;
}
