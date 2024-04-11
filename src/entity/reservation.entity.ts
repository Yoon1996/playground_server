import { IReservationModel } from "src/model/reservation.model";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('reservation')
export class Reservation implements Partial<IReservationModel>{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
    })
    userId?: number;

    @Column({
        type: 'int',
    })
    gymId?: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    locationName?: string;

    @Column({
        type: 'datetime',
    })
    date?: Date;

    @Column({
        type: 'varchar',
        length: 255
    })
    people?: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    phoneNumber?: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    time?: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    price?: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    paymentMethod?: string;

    @CreateDateColumn({})
    createdAt?: Date;

    @UpdateDateColumn({
    })
    updatedAt?: Date;
}