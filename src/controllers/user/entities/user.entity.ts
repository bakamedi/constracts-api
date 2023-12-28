import { UserEntity } from "src/common/shared/user.entity";
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";

@Entity()
export class User extends UserEntity {
    @ManyToOne(() => User, user => user.lessor)
    landlord: User;

    @OneToMany(() => User, user => user.landlord)
    lessor: User[];
}
