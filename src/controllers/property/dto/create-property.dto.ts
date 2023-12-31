import { UserE } from "src/controllers/user/entities/user.entity";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePropertyDto {
    @IsString()
    name: string;

    @IsString()
    address: string;

    @IsNumber()
    rooms: number;

    @IsNumber()
    bathrooms: number;
    
    @IsNumber()
    price: number;

    @IsBoolean()
    @IsOptional()
    electricService: boolean;

    @IsBoolean()
    @IsOptional()
    waterService: boolean;

    @IsBoolean()
    @IsOptional()
    internetService: boolean;

    @IsNumber()
    @IsOptional()
    electricServicePrice: number;

    @IsNumber()
    @IsOptional()
    waterServicePrice: number;

    @IsNumber()
    @IsOptional()
    internetServicePrice: number;

    propertyUser: UserE;
}
