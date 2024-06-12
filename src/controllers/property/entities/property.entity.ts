import { ParentEntity } from "src/common/shared/index-shared";
import { ContractE } from "src/controllers/contract/entities/contract.entity";
import { ImagepropertyE } from "src/controllers/imageproperty/entities/imageproperty.entity";
import { UserE } from "src/controllers/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class PropertyE extends ParentEntity {
    @Column('text')
    address: string;

    @Column('double precision',{
        default: 0.0
    })
    lat: number;

    @Column('double precision',{
        default: 0.0
    })
    lng: number;

    @Column()
    rooms: number;

    @Column()
    bathrooms: number;

    @Column('double precision', {
        default: 0.0,
    })
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

    @Column('double precision',{
        default: 0.0,
    })
    electricServicePrice: number;

    @Column('double precision',{
        default: 0.0,
    })
    waterServicePrice: number;

    @Column('double precision',{
        default: 0.0,
    })
    internetServicePrice: number;

    @ManyToOne(() => UserE, user => user.properties)
    propertyUser: UserE;

    @OneToMany(() => ContractE, contract => contract.property)
    contracts: ContractE[];

    @OneToMany(() => ImagepropertyE, imageProperty => imageProperty.imagesProperty)
    imagesProperties: ImagepropertyE[];
}
