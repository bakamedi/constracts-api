import { UserEntity } from "src/common/shared/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity()
export class User extends UserEntity {

}
