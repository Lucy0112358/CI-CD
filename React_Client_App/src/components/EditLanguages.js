import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { BASE_URL } from "../api/index";

function EditLanguage(props) {
  const [show, setShow] = useState(false);
  const [language, setLanguage] = useState(props.language);
  const handleClose = () => {
    setShow(false);
    axios
      .post(
        BASE_URL + "api/Language/EditLanguage?id=" + props.language.id,
        language
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-pencil-fill"
        viewBox="0 0 16 16"
        onClick={handleShow}
      >
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
      </svg>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your details</Modal.Title>
        </Modal.Header>
        <Modal.Body>Update your language level</Modal.Body>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Enter a Language you know</Form.Label>
          <Form.Control
            value={language.name}
            onChange={(e) => {
              setLanguage({ ...language, name: e.target.value });
            }}
          />
        </Form.Group>
        <Form.Label>Spoken level</Form.Label>
        <Form.Range
          value={language.spokenLevel}
          onChange={(e) => {
            setLanguage({ ...language, spokenLevel: e.target.value });
          }}
        />
        <Form.Label>Written level</Form.Label>
        <Form.Range
          value={language.writtenLevel}
          onChange={(e) => {
            setLanguage({ ...language, writtenLevel: e.target.value });
          }}
        />
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default EditLanguage;
