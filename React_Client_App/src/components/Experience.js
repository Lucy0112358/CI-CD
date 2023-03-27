import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../api/index";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Language from "./Language";
import Education from "./Education";
import ResumeNavbar from "./ResumeNavbar";

function Experience() {
  const navigate = useNavigate();
  const [experience, setExperience] = useState({
    ResumeId: JSON.parse(localStorage.getItem(`setResumeId`)),
    IsStillWorkingHere: false,
    role: "",
    organisationName: "",
    description: "",
    responsibilities: "",
    StartDate: "2019-08-01T00:00:00-07:00",
    EndDate: "2019-08-01T00:00:00-07:00",
  });
  const createExperience = (e) => {
    e.preventDefault();
    const data = experience;
    axios
      .post(BASE_URL + "api/Experience", data)
      .then((res) => {
        console.log(res);
        setExperience({
          ResumeId: JSON.parse(localStorage.getItem(`setResumeId`)),
          IsStillWorkingHere: false,
          role: "",
          organisationName: "",
          description: "",
          responsibilities: "",
          StartDate: "2019-08-01T00:00:00-07:00",
          EndDate: "2019-08-01T00:00:00-07:00",
        })
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
    <ResumeNavbar/>
      <h5>Experience </h5>    
      
        <Form onSubmit={createExperience}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={experience.role}
                onChange={(e) => {
                  setExperience({ ...experience, role: e.target.value });
                }}
                placeholder="Enter your number"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Company name</Form.Label>
              <Form.Control
                value={experience.organisationName}
                onChange={(e) => {
                  setExperience({
                    ...experience,
                    organisationName: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="">
              <Form.Label>Job description</Form.Label>
              <Form.Control
                type="text"
                value={experience.description}
                onChange={(e) => {
                  setExperience({ ...experience, description: e.target.value });
                }}
                placeholder="Enter your number"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Enter your main responsibility</Form.Label>
              <Form.Control
                value={experience.responsibilities}
                onChange={(e) => {
                  setExperience({
                    ...experience,
                    responsibilities: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>

          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Form>
        <Button variant="secondary" onClick={() =>navigate("/viewresume")}>View resume</Button>      
    </>
  );
}

export default Experience;
