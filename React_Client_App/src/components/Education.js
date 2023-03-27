import React from "react";
import { useState, useEffect } from "react";
import { BASE_URL } from "../api/index";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";


function Education() {
    const [education, setEducation] = useState({
        IsStillStudiengHere: false,
        FacilityName: ``,
        EducationTitle: ``,
        Level: ``,
        Description: `just for test`,
        ResumeId: JSON.parse(localStorage.getItem(`setResumeId`)),
        StartDate: "2019-08-01T00:00:00-07:00",
        EndDate: "2019-08-01T00:00:00-07:00",
    });
    const createEducation = (e) => {
        e.preventDefault();
        const data = education;
        axios
          .post(BASE_URL + "api/Education", data)
          .then((res) => {
            console.log(res);
            setEducation({
                IsStillStudiengHere: false,
                FacilityName: ``,
                EducationTitle: ``,
                Level: ``,
                Description: `just for test`,
                ResumeId: JSON.parse(localStorage.getItem(`setResumeId`)),
                StartDate: "2019-08-01T00:00:00-07:00",
                EndDate: "2019-08-01T00:00:00-07:00",
            })
          })
          .catch((err) => console.log(err));
}
  return (
    <>
      <h5>Education </h5>
      <div className="mainForm">
        <Form onSubmit={createEducation}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="">
              <Form.Label>Your profession</Form.Label>
              <Form.Control
                type="text"
                value={education.EducationTitle}
                onChange={(e) => {
                  setEducation({ ...education, EducationTitle: e.target.value });
                }}
                placeholder="Enter your number"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="">
              <Form.Label> Name of your university </Form.Label>
              <Form.Control
                type="text"
                value={education.FacilityName}
                onChange={(e) => {
                  setEducation({ ...education, FacilityName: e.target.value });
                }}
                placeholder="Enter your number"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>Level of education</Form.Label>
              <Form.Control
                value={education.Level}
                onChange={(e) => {
                  setEducation({
                    ...education,
                    Level: e.target.value,
                  });
                }}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      
      </div>
    </>
  );
}

export default Education;
