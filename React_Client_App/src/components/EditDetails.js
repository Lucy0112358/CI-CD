import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import axios from "axios";
import { BASE_URL } from "../api/index";

function EditDetails(props) {
  const [show, setShow] = useState(false);
  console.log(props.resume.id);
  const handleClose = () => {
    setShow(false);
    let recid = JSON.parse(localStorage.getItem(`resumeId`));
    axios
      .post(BASE_URL + "api/Resume/EditResume?id=" + props.resume.id, { ...props.resume })
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
        <Modal.Body>Woohoo, you're updating your resume!</Modal.Body>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            value={props.resume.name}
            onChange={(e) => {
              props.setResume({ ...props.resume, name: e.target.value });
            }}
          />
        </InputGroup>

        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Surname</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            value={props.resume.fullName}
            onChange={(e) => {
              props.setResume({ ...props.resume, fullName: e.target.value });
            }}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Job title</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            value={props.resume.jobTitle}
            onChange={(e) => {
              props.setResume({ ...props.resume, jobTitle: e.target.value });
            }}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">Location</InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            value={props.resume.location}
            onChange={(e) => {
              props.setResume({ ...props.resume, location: e.target.value });
            }}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
            Mobile number
          </InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            value={props.resume.phone}
            onChange={(e) => {
              props.setResume({ ...props.resume, phone: e.target.value });
            }}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
          About me
          </InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            value={props.resume.about}
            onChange={(e) => {
              props.setResume({ ...props.resume, about: e.target.value });
            }}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
           Linkedin
          </InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            value={props.resume.linkedinUrl}
            onChange={(e) => {
              props.setResume({ ...props.resume, linkedinUrl: e.target.value });
            }}
          />
        </InputGroup>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Text id="inputGroup-sizing-sm">
           Email
          </InputGroup.Text>
          <Form.Control
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            value={props.resume.emailAddress}
            onChange={(e) => {
              props.setResume({ ...props.resume, emailAddress: e.target.value });
            }}
          />
        </InputGroup>
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
export default EditDetails;
