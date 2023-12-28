import { ParentEntity } from "src/common/shared/parent.entity";
import { UserE } from "src/controllers/user/entities/user.entity";
import { Column, Entity, ManyToOne } from "typeorm";

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

    @Column('bool',{
        default: false,
    })
    electricService: boolean;

    @Column({
        default: 0.0,
    })
    electricServicePrice: number;

    @Column({
        default: 0.0,
    })
    waterService: number;

    @Column({
        default: 0.0,
    })
    internetService: number;

    @ManyToOne(() => UserE, user => user.properties)
    propertyUser: UserE;

}
