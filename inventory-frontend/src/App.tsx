import './App.css';
import { useAssets } from "./hook/useAssets.ts";
import {useEffect, useState} from "react";
import {CreateOrUpdateAssetModal} from "./modal/CreateOrUpdateAssetModal.tsx";
import type {AssetDto} from "./type/assets.type.ts";
import {DeleteAssetModal} from "./modal/DeleteAssetModal.tsx";
import api from "./api/axios.ts";

function App() {
  const { assets, isLoading, createAsset, isCreating, patchAsset, isUpdating, deleteAsset, isDeleting } = useAssets();
  const [showAdd, setShowAdd] = useState<AssetDto | boolean | undefined>(false);
  const [showDelete, setShowDelete] = useState<AssetDto>();

  const formatDate = (dateInput: Date) => {
    if (!dateInput) return "N/A";
    const date = new Date(dateInput);
    return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
  };

  useEffect(() => {
    api.get('/express/users').then((res: object) => {
      console.log(res);
    })
  }, []);

  return (
    <>
      <div className="container mt-5">
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="fw-bold text-primary">Asset Management</h1>
            <p className="text-muted">Tracking {assets.length} active hardware assets</p>
          </div>
          <button className="btn btn-primary shadow-sm" onClick={() => setShowAdd(true)}>
            <i className="bi bi-plus-lg me-2"></i> Add New Asset
          </button>
        </div>

        {/* Main Table Card */}
        <div className="card shadow-sm border-0">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                <tr>
                  <th className="ps-4">Tag ID</th>
                  <th>Model</th>
                  <th>Purchase Date</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
                </thead>
                <tbody>
                {isLoading ? (
                  /* Loading State */
                  <tr>
                    <td colSpan={5} className="text-center py-5">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-2 text-muted">Fetching assets...</p>
                    </td>
                  </tr>
                ) : assets.length === 0 ? (
                  /* Empty State */
                  <tr>
                    <td colSpan={5} className="text-center py-5 text-muted">
                      No assets found. Click "Add New Asset" to get started.
                    </td>
                  </tr>
                ) : (
                  /* Data State */
                  assets.map((asset) => (
                    <tr key={asset.id}>
                      <td className="ps-4">
                        <span className="badge bg-light text-dark border">
                          {asset.tag}
                        </span>
                      </td>
                      <td className="fw-semibold">{asset.model}</td>
                      <td>{formatDate(asset.purchaseDate)}</td>
                      <td>
                        <span className="badge rounded-pill bg-success-subtle text-success">
                          {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                        </span>
                      </td>
                      <td className="text-end pe-4">
                        <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => setShowAdd(asset)}>
                          Edit
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => setShowDelete(asset)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {showAdd && <CreateOrUpdateAssetModal show={!!showAdd} onSubmit={(assetId, data) => {
        if (assetId) {
          patchAsset({ id: assetId, partial: data });
        } else {
          createAsset(data);
        }
        setShowAdd(false);
      }} loading={isCreating || isUpdating} onClose={() => setShowAdd(false)} asset={typeof showAdd === 'object' ? showAdd : undefined} /> }
      {showDelete && <DeleteAssetModal show={!!showDelete} onSubmit={(assetId) => {
        deleteAsset(assetId);
        setShowDelete(undefined);
      }} onClose={() => setShowDelete(undefined)} loading={isDeleting} asset={showDelete} /> }
    </>
  );
}

export default App;