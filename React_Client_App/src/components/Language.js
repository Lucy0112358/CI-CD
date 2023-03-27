import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/index";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Language() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState({
    ResumeId: JSON.parse(localStorage.getItem(`setResumeId`)),
    SpokenLevel: "10",
    WrittenLevel: "10",
    Name: "",
  });
  const createLanguage = (e) => {
    e.preventDefault();
    const data = language;
    axios
      .post(BASE_URL + "api/Language", data)
      .then((res) => {
        console.log(res);
        setLanguage({
          ResumeId: JSON.parse(localStorage.getItem(`setResumeId`)),
          SpokenLevel: "10",
          WrittenLevel: "10",
          Name: "",
        });
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h5>Language </h5>
      <div className="mainForm">
        <Form noValidate autoComplete="off" onSubmit={createLanguage}>
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>Enter a Language you know</Form.Label>
            <Form.Control
              value={language.Name}
              onChange={(e) => {
                setLanguage({ ...language, Name: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Label>Spoken level</Form.Label>
          <Form.Range
            value={language.SpokenLevel}
            onChange={(e) => {
              setLanguage({ ...language, SpokenLevel: e.target.value });
            }}
          />
          <Form.Label>Written level</Form.Label>
          <Form.Range
            value={language.WrittenLevel}
            onChange={(e) => {
              setLanguage({ ...language, WrittenLevel: e.target.value });
            }}
          />
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default Language;
