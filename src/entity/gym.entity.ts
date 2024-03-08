import { IGymModel } from "src/model/gym.model";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('gym')
export class Gym implements Partial<IGymModel>{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        type: 'varchar',
        length: 255,
    })
    region: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    name: string
    @Column({
        type: 'varchar',
        length: 255,
    })
    address: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    detailAddress: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    size: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    operatingOrganization: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    phoneNumber: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    operatingTimeDay: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    operatingTimeWeekend: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    operatingTImeHoliday: string

    @Column({
        type: 'tinyint',
    })
    rentalStatus: boolean

    @Column({
        type: 'varchar',
        length: 255,
    })
    price: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    parkingInfo: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    homepage: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    sportsType: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    currentStatus: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    facilities: string

    @Column({
        type: 'varchar',
        length: 255,
    })
    etc: string
}