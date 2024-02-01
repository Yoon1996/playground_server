import { IUserModel } from "src/model/user.model";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export enum sexType {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

@Entity('user')
export class User implements Partial<IUserModel>{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 20
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    email: string;

    @Column({
        type: 'text'
    })
    password?: string;

    @Column({
        type: 'enum',
        enum: [
            sexType.MALE,
            sexType.FEMALE,
        ]
    })
    sex: sexType

    @Column({
        type: 'varchar',
        length: 16
    })
    phoneNumber?: string;

    @Column({
    })
    birth?: Date;

    @Column({
        type: 'varchar',
        length: 50
    })
    provider?: string;

    @Column({
        type: 'tinyint'
    })
    withDraw?: boolean;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn({
    })
    updatedAt?: Date;

}

