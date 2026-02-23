import api from "../api/axios.ts";
import type {AssetData, AssetDto} from "../type/assets.type.ts";
import type {DeepPartial} from "ts-essentials";

const API_URL = '/assets';

export const AssetsService = {

    async getAll() {
        const response = await api.get<AssetDto[]>(API_URL);
        return response.data;
    },

    async getOne(id: string) {
        const response = await api.get<AssetDto>(`${API_URL}/${id}`);
        return response.data;
    },

    async create(data: AssetData) {
        const response = await api.post<AssetDto>(`${API_URL}`, data);
        return response.data;
    },

    async update(id: string, data: DeepPartial<AssetData>) {
        const response = await api.patch<AssetDto>(`${API_URL}/${id}`, data);
        return response.data;
    },

    async delete(id: string) {
        const response = await api.delete<AssetDto>(`${API_URL}/${id}`);
        return response.data;
    }
}