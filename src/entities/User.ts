import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";


export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  avatar: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export class LoginUserDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}