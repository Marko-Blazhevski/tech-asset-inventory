import { AssetStatus } from "../enum/asset-status.enum";
import {AssetData} from "../interface/asset-data.interface";
import {IsDate, IsEnum, IsNotEmpty, IsOptional, IsString} from "class-validator";

export class CreateAssetDto implements AssetData {

    @IsNotEmpty()
    @IsString()
    tag: string;

    @IsNotEmpty()
    @IsString()
    serialNumber: string;

    @IsNotEmpty()
    @IsString()
    model: string;

    @IsOptional()
    @IsEnum(AssetStatus)
    status?: AssetStatus;

    @IsNotEmpty()
    @IsDate()
    purchaseDate: Date;

}
