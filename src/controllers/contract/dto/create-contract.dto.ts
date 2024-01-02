import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateContractDto {

    @IsString()
    @IsNotEmpty()
    idProperty: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsBoolean()
    @IsOptional()
    isSign: boolean;
}
