import {Column, Entity} from "typeorm";
import {AssetStatus} from "../enums/asset-status.enum";
import {BaseEntity} from "../../../common/model/base.entity";

@Entity('assets')
export class Asset extends BaseEntity {

    @Column({
        type: 'varchar',
        length: 50
    })
    tag: string;

    @Column({
        name: 'serial_number',
        type: 'varchar',
        unique: true
    })
    serialNumber: string;

    @Column({
        type: 'varchar',
        length: 50
    })
    model: string;

    @Column({
        type: 'enum',
        enum: AssetStatus,
        default: AssetStatus.AVAILABLE
    })
    status: AssetStatus;

    @Column({
        name: 'purchase_date',
        type: 'timestamptz'
    })
    purchaseDate: Date;
}
