import { IsEmail, IsEnum, IsOptional, IsString, IsUrl, Matches, MaxLength, MinLength } from "class-validator";
import { UserType } from "src/common/enum/user.type";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;

    @MinLength(1)
    fullname: string;

    @IsOptional()
    ruc: string;

    @IsOptional()
    nui: string;

    @IsOptional()
    passport: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    birthday: string;

    @IsOptional()
    @IsUrl()
    urlPath: string;

    @IsOptional()
    @IsEnum(UserType)
    userType: UserType;
}
