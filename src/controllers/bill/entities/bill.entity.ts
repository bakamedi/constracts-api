import { ParentEntity } from "src/common/shared/parent.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { BillStatus, BillType } from "../utils/bill-enum";
import { ContractE } from "src/controllers/contract/entities/contract.entity";

@Entity()
export class BillE extends ParentEntity {
    @Column({
        default: 0.0,
    })
    amount: number;

    @Column({
        type: 'enum',
        enum: BillType,
        default: BillType.CASH,
    })
    billType: BillType;

    @Column({
        type: 'enum',
        enum: BillStatus,
        default: BillStatus.INIT,
    })
    status: BillStatus;

    @Column('text')
    comments: string;

    @ManyToOne(() => ContractE, (contract) => contract.bills)
    contract: ContractE;
}
