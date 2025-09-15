import { IsString, MinLength, IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
    password: string;
}
