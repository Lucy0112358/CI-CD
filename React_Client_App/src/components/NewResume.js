import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getStorage from "../helpers/getStorage";
import { BASE_URL } from "../api/index";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ResumeNavbar from "./ResumeNavbar";

function NewResume() {
  const navigate = useNavigate();
  const [resumeData, setData] = useState({
    Name: "",
    FullName: "",
    JobTitle: "",
    Location: "",
    Phone: "",
    UserId: getStorage(),
    About: ``,
    LinkedinUrl: ``,
    EmailAddress: ``,
  });

  const createResume = (e) => {
    e.preventDefault();
    const data = resumeData;
    data.UrlId =
      data.Name +
      "-" +
      data.FullName +
      "-" +
      Math.floor(Math.random() * (999 - 100 + 1) + 100);
    axios
      .post(BASE_URL + "api/Resume", data)
      .then((res) => {
        console.log(res);
        navigate("/addDetails");
        localStorage.setItem(`newResumeId`, JSON.stringify(res.data.id));
        localStorage.setItem(`setResumeId`, JSON.stringify(res.data.id));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ResumeNavbar />
      <div className="mainForm">
        <Form noValidate autoComplete="off" onSubmit={createResume}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="tel"
                value={resumeData.Name}
                onChange={(e) => {
                  setData({ ...resumeData, Name: e.target.value });
                }}
                placeholder="Enter your name"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="">
              <Form.Label>Surname</Form.Label>
              <Form.Control
                type="text"
                value={resumeData.FullName}
                onChange={(e) => {
                  setData({ ...resumeData, FullName: e.target.value });
                }}
                placeholder="Enter your surname"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            {/* <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group> */}

            <Form.Group as={Col} controlId="">
              <Form.Label>Job title</Form.Label>
              <Form.Control
                type="text"
                value={resumeData.JobTitle}
                onChange={(e) => {
                  setData({ ...resumeData, JobTitle: e.target.value });
                }}
                placeholder="Enter your profession"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formBasicEmail">
              <Form.Label>Enter your email address</Form.Label>
              <Form.Control
                type="email"
                value={resumeData.EmailAddress}
                onChange={(e) => {
                  setData({ ...resumeData, EmailAddress: e.target.value });
                }}
                placeholder="email@example.com"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="">
              <Form.Label>Number</Form.Label>
              <Form.Control
                type="tel"
                value={resumeData.Phone}
                onChange={(e) => {
                  setData({ ...resumeData, Phone: e.target.value });
                }}
                placeholder="Enter your number"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                value={resumeData.Location}
                onChange={(e) => {
                  setData({ ...resumeData, Location: e.target.value });
                }}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="">
              <Form.Label>Tell a bit about yourself</Form.Label>
              <Form.Control
                type="textarea"
                value={resumeData.About}
                onChange={(e) => {
                  setData({ ...resumeData, About: e.target.value });
                }}
                placeholder="about you"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="">
              <Form.Label>Enter your linkedin profile</Form.Label>
              <Form.Control
                type="text"
                value={resumeData.LinkedinUrl}
                onChange={(e) => {
                  setData({ ...resumeData, LinkedinUrl: e.target.value });
                }}
                placeholder="linkedin"
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

export default NewResume;
