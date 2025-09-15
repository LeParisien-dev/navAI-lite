import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Email invalide' })
    @IsNotEmpty({ message: 'L’email est requis' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Le mot de passe est requis' })
    @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères' })
    password: string;
}
