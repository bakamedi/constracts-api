import { ParentEntity } from "src/common/shared/index-shared";
import { BillE } from "src/controllers/bill/entities/bill.entity";
import { PropertyE } from "src/controllers/property/entities/property.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class ContractE extends ParentEntity {
    @Column('text')
    content: string;

    @Column('bool',{
        default: false,
    })
    isSign: boolean;

    @ManyToOne(() => PropertyE, (property) => property.contracts)
    property: PropertyE;

    @OneToMany(() => BillE, bill => bill.contract)
    bills: BillE[];
}
