import {AssetData} from "../interface/asset-data.interface";
import {AssetStatus} from "../enum/asset-status.enum";
import {AssetEntity} from "../entity/asset.entity";
import {Expose, plainToInstance} from "class-transformer";

export class AssetDto implements AssetData {
    @Expose()
    id: string;
    @Expose()
    model: string;
    @Expose()
    purchaseDate: Date;
    @Expose()
    serialNumber: string;
    @Expose()
    status: AssetStatus;
    @Expose()
    tag: string;
    @Expose()
    createdAt: Date;
    @Expose()
    updatedAt: Date;

    public static fromEntity(entity: AssetEntity) {
        const dto = plainToInstance(AssetDto, entity, {
            excludeExtraneousValues: true
        });
        return dto;
    }

    public static fromEntities(entities: AssetEntity[]): AssetDto[] {
        return entities.map(entity => this.fromEntity(entity));
    }
}