import { Module } from '@nestjs/common';
import { AssetsService } from './service/assets.service';
import { AssetsController } from './controller/assets.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Asset} from "./model/entities/asset.entity";

@Module({
  imports: [
      TypeOrmModule.forFeature([
          Asset,
      ])
  ],
  controllers: [AssetsController],
  providers: [AssetsService],
})
export class AssetsModule {}
