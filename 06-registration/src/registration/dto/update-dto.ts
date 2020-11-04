import { MinLength, MaxLength, IsOptional } from 'class-validator';

export class UpdateDTO {
  @IsOptional()
  @MinLength(2)
  @MaxLength(128)
  public username?: string;

  @IsOptional()
  @MinLength(4)
  @MaxLength(32)
  public password?: string;
}
