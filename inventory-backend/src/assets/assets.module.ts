import {Module} from '@nestjs/common';
import {AssetsService} from './service/assets.service';
import {AssetsController} from './controller/assets.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {AssetEntity} from "./model/entity/asset.entity";
import {AssetRepository} from "./repository/asset.repository";

@Module({
    imports: [TypeOrmModule.forFeature([AssetEntity,])],
    controllers: [AssetsController],
    providers: [AssetsService, AssetRepository],
    exports: [AssetsService]
})

export class AssetsModule {}