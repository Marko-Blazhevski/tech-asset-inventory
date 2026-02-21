import {Injectable, NotFoundException} from '@nestjs/common';
import { CreateAssetDto } from '../model/dto/create-asset.dto';
import { UpdateAssetDto } from '../model/dto/update-asset.dto';
import {AssetRepository} from "../repository/asset.repository";

@Injectable()
export class AssetsService {

  constructor(
     private readonly assetRepository: AssetRepository
  ) {}

  async create(createAssetDto: CreateAssetDto) {
    const entity = this.assetRepository.create(createAssetDto);
    return await this.assetRepository.save(entity);
  }

  async findAll() {
    return await this.assetRepository.find();
  }

  async findOne(id: string) {
    const entity = await this.assetRepository.findOne({ where: { id: id } });
    if (!entity) {
      throw new NotFoundException(`Asset with id ${id} not found`);
    }
    return entity;
  }

  async update(id: string, updateAssetDto: UpdateAssetDto) {
    const entity = await this.findOne(id);
    const updated = Object.assign(entity, updateAssetDto);
    return await this.assetRepository.save(updated);
  }

  async remove(id: string) {
    const entity = await this.findOne(id);
    await this.assetRepository.softRemove(entity);
    return entity;
  }
}
