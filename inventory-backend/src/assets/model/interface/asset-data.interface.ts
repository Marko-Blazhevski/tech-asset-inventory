import {AssetStatus} from "../enum/asset-status.enum";

export interface AssetData {
    tag: string;
    serialNumber: string;
    model: string;
    status?: AssetStatus;
    purchaseDate: Date;
}