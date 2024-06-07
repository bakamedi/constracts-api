import { ParentEntity } from "src/common/shared/index-shared";
import { PropertyE } from "src/controllers/property/entities/property.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class ImagepropertyE extends ParentEntity {
    @Column('text')
    imageUrl: string;

    @ManyToOne(() => PropertyE, property => property.imagesProperties)
    imagesProperty: PropertyE;
}
