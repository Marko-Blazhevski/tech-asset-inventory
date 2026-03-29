import * as React from "react";
import {useState} from "react";
import {type AssetDto, AssetStatus, type CreateAssetData} from "../type/assets.type.ts";
import {Button, Form, Modal} from "react-bootstrap";

type CreateAssetModalProps = {
  show: boolean;
  onSubmit: (assetId: string | undefined, asset: CreateAssetData) => void;
  onClose: () => void;
  loading: boolean;
  asset?: AssetDto;
};

export const CreateOrUpdateAssetModal = ({ show, onSubmit, onClose, loading, asset }: CreateAssetModalProps) => {

  const [form, setForm] = useState<CreateAssetData>(() => ({
    tag: asset?.tag ?? '',
    serialNumber: asset?.serialNumber ?? '',
    model: asset?.model ?? '',
    purchaseDate: asset?.purchaseDate ? new Date(asset.purchaseDate) : new Date(),
    status: AssetStatus.AVAILABLE
  }));
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const eventForm = e.currentTarget;
    e.stopPropagation();
    e.preventDefault();
    if (!eventForm.checkValidity()) {
      return;
    } else {
      onSubmit(asset?.id, form);
      setValidated(false);
    }
    setValidated(true);
  }

  const formDataChangeHandler = (e: React.ChangeEvent<HTMLInputElement> & React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'purchaseDate' ? new Date(value) : value }))
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton={true} className={'border-0'}>
        <Modal.Title className={'fw-bold'}>{asset ? 'Update asset' : 'Add new asset'}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit} noValidate validated={validated}>
        <Modal.Body className={'d-flex flex-column gap-4'}>
          <Form.Group>
            <Form.Label>Tag</Form.Label>
            <Form.Control placeholder={'eg. MAC-2024-001'} name={'tag'} required value={form.tag} onChange={formDataChangeHandler} />
            <Form.Control.Feedback type="invalid">Tag is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Serial number</Form.Label>
            <Form.Control placeholder={'eg. 000xeras1356a'} name={'serialNumber'} required value={form.serialNumber} onChange={formDataChangeHandler} />
            <Form.Control.Feedback type="invalid">
              Serial number is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Model</Form.Label>
            <Form.Control placeholder={'eg. MacBook Pro M3'} name={'model'} required value={form.model} onChange={formDataChangeHandler} />
            <Form.Control.Feedback type="invalid">Model is required.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Label>Status</Form.Label>
            <Form.Select name={'status'} required value={form.status} onChange={formDataChangeHandler}>
              {Object.values(AssetStatus).map(status => <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <Form.Label>Purchase date</Form.Label>
            <Form.Control type={'date'} placeholder={'eg. June 1st 2024 13:00'} name={'purchaseDate'} required value={form.purchaseDate.toISOString().split('T')[0]} onChange={formDataChangeHandler} />
          </Form.Group>

        </Modal.Body>

        <Modal.Footer>
          <Button variant={'light'} onClick={onClose} disabled={loading}>Close</Button>
          <Button variant={'primary'} type={'submit'} disabled={loading}>{loading ? 'Saving...' : `${asset ? 'Update' : 'Save'} asset`}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}