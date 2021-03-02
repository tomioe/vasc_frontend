import React from 'react';
import { Button, Modal } from 'react-bootstrap'

export default function ModalComponent(props) {


    return (
        <>
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.body}</Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={props.handleClose}>
                        Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}