import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {AssetsService} from "../service/assets.service.ts";
import type {AssetData} from "../type/assets.type.ts";
import type {DeepPartial} from "ts-essentials";

export const useAssets = () => {

    const queryClient = useQueryClient();

    const { data: assets = [], isLoading, isError, error } = useQuery({
        queryKey: ['assets'],
        queryFn: AssetsService.getAll
    });

    const createMutation = useMutation({
        mutationFn: (newAsset: AssetData) => AssetsService.create(newAsset),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assets'] })
        }
    });

    const patchMutation = useMutation({
        mutationFn: ({ id, partial }: {id: string, partial: DeepPartial<AssetData>}) => AssetsService.update(id, partial),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assets'] })
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => AssetsService.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assets'] })
        }
    });

    return {
        assets,
        isLoading,
        isError,
        error,
        createAsset: createMutation.mutate,
        isCreating: createMutation.isPending,
        patchAsset: patchMutation.mutate,
        isUpdating: patchMutation.isPending,
        deleteAsset: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending
    }
};

export const useAsset = (id: string) => {
    return useQuery({
        queryKey: ['asset'],
        queryFn: () => AssetsService.getOne(id),
        enabled: !!id
    });
}