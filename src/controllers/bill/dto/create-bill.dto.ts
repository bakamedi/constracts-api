import { IsEnum, IsNumber, IsString } from "class-validator";
import { BillStatus, BillType } from "../utils/bill-enum";

export class CreateBillDto {
    @IsNumber()
    amount: number;
    
    @IsEnum(BillType)
    billType: BillType;

    @IsEnum(BillStatus)
    status: BillStatus;

    @IsString()
    comments: string;

    idContract: string;

    idProperty: string;
}
