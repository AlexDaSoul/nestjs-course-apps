import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export interface AuthCredentials {
  username: string;
  password: string;
}

export class AuthCredentialsDTO implements AuthCredentials {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(32)
  public username: string;

  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(32)
  public password: string;
}
