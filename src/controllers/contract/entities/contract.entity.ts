import { ParentEntity } from "src/common/shared/parent.entity";
import { PropertyE } from "src/controllers/property/entities/property.entity";
import { Column, Entity, ManyToOne } from "typeorm";

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
}
