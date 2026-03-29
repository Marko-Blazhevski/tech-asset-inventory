import * as React from "react";
import type {AssetDto} from "../type/assets.type.ts";
import {Button, Form, FormText, Modal} from "react-bootstrap";

type CreateAssetModalProps = {
  show: boolean;
  onSubmit: (assetId: string) => void;
  onClose: () => void;
  loading: boolean;
  asset: AssetDto;
};

export const DeleteAssetModal = ({ show, onSubmit, onClose, loading, asset }: CreateAssetModalProps) => {

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onSubmit(asset.id);
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton={true} className={'border-0'}>
        <Modal.Title className={'fw-bold'}>Delete asset</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body className={'d-flex flex-column gap-4'}>
          <FormText>Are you sure you want to delete this asset?</FormText>
        </Modal.Body>

        <Modal.Footer>
          <Button variant={'light'} onClick={onClose} disabled={loading}>Close</Button>
          <Button variant={'primary'} type={'submit'} disabled={loading}>{loading ? 'Deleting...' : `Delete asset`}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}