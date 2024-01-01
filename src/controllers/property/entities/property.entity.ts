import { ParentEntity } from "src/common/shared/parent.entity";
import { ContractE } from "src/controllers/contract/entities/contract.entity";
import { UserE } from "src/controllers/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class PropertyE extends ParentEntity {
    @Column('text')
    name: string;

    @Column('text')
    address: string;

    @Column()
    rooms: number;

    @Column()
    bathrooms: number;

    @Column()
    price: number;

    @Column('bool', {
        default: false,
    })
    electricService: boolean;

    @Column('bool', {
        default: false,
    })
    waterService: boolean;

    @Column('bool', {
        default: false,
    })
    internetService: boolean;

    @Column({
        default: 0.0,
    })
    electricServicePrice: number;

    @Column({
        default: 0.0,
    })
    waterServicePrice: number;

    @Column({
        default: 0.0,
    })
    internetServicePrice: number;

    @ManyToOne(() => UserE, user => user.properties)
    propertyUser: UserE;

    @OneToMany(() => ContractE, contract => contract.property)
    contracts: ContractE[];
}
