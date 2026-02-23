export interface AssetDto extends AssetData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface AssetData {
    tag: string;
    serialNumber: string;
    model: string;
    status?: AssetStatus;
    purchaseDate: Date;
}

export enum AssetStatus {
    AVAILABLE = 'available',
    ASSIGNED = 'assigned',
    MAINTENANCE = 'maintenance',
    RETIRED = 'retired',
    LOST = 'lost',
}