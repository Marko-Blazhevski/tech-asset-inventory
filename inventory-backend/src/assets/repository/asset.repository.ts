import {DataSource, Repository} from "typeorm";
import {AssetEntity} from "../model/entity/asset.entity";
import {Injectable} from "@nestjs/common";
import {AssetStatus} from "../model/enum/asset-status.enum";

@Injectable()
export class AssetRepository extends Repository<AssetEntity> {

    constructor(private dataSource: DataSource) {
        super(AssetEntity, dataSource.createEntityManager());
    }

    // This is a function created with query runner just for testing purposes.
    async filterAssets(status?: AssetStatus, modelName?: string): Promise<AssetEntity[]> {
        const qb = this.dataSource.createQueryBuilder(AssetEntity, 'asset');

        qb.select('asset');

        if (status) {
            qb.andWhere('asset.status = :status', { status });
        }

        if (modelName) {
            qb.andWhere('asset.model ILIKE :model', { model: `%${modelName}%` });
        }

        qb.orderBy('asset.createdAt', 'DESC');

        return await qb.getMany();
    }
}