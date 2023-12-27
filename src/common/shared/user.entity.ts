import { BeforeInsert, BeforeUpdate, Column, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ParentEntity } from './parent.entity';
import { UserGender } from '../enum/user.gender';
import { UserType } from '../enum/user.type';

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
    })
    ruc: string;

    @Column('text', {
        unique: true,
    })
    nui: string;

    @Column('text')
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
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}