import { UserEntity } from "src/common/shared/user.entity";
import { PropertyE } from "src/controllers/property/entities/property.entity";
import { Entity, OneToMany, } from "typeorm";

@Entity()
export class UserE extends UserEntity {

    @OneToMany(() => PropertyE, property => property.propertyUser)
    properties: PropertyE[];
}
