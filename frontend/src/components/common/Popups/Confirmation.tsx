import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface IConfirmation {
    show: boolean,
    handleClose: () => void;
    handleDelete: () => void;
    title: string;
    description: string;
    btnText: string;
}


const Confirmation: React.FC<IConfirmation> = ({ show, handleClose, handleDelete, title, description, btnText }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{description}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    {btnText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Confirmation;
