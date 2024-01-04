import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';
import { UserGender } from '../enum/user.gender';
import { UserType } from '../enum/user.type';
import { ParentEntity } from './index-shared';

export abstract class UserEntity extends ParentEntity {
    @Column('bool', {
        default: true,
    })
    isActive: boolean;

    @Column('text')
    fullname: string;

    @Column('text', {
        unique: true,
        nullable: true,
        default: '',
    })
    ruc: string;

    @Column('text', {
        unique: true,
        nullable: true,
        default: '',
    })
    nui: string;

    @Column('text', {
        nullable: true,
        default: '',
    })
    passport: string;

    @Column('text', {
        unique: true,
    })
    email: string;

    @Column('text', {
        select: false,
        nullable: true,
    })
    password: string;

    @Column('text')
    phone: string;

    @Column({
        type: 'enum',
        enum: UserGender,
        default: UserGender.MEN,
    })
    gender: UserGender;

    @Column({
        type: 'enum',
        enum: UserType,
        default: UserType.NOT_SELECTED,
    })
    userType: UserType;

    @Column({
        nullable: false,
        default: () => 'CURRENT_TIMESTAMP',
        type: 'timestamp',
    })
    birthday: string;

    @Column('text', {
        default: '',
    })
    urlPath: string;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        if (this.email) {
            this.email = this.email.trim();
        }
        if (this.fullname) {
            this.fullname = this.fullname.trim();
        }
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}