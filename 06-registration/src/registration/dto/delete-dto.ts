import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteDTO {
  @IsNotEmpty()
  @IsUUID()
  public userId: string;
}
