import React from "react";
import getStorage from "../helpers/getStorage";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../api/index";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import ResumeNavbar from "./ResumeNavbar";

function MainPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem(`userName`))
  );
  const [resumes, setResumes] = useState([]);
  const [id, setId] = useState(Number(getStorage()));

  useEffect(() => {
    axios
      .get(BASE_URL + "api/User/" + getStorage())
      .then((res) => {
        setUsername(res.data.userName);
      })
      .catch((err) => console.log(err));
  }, [id]);
  useEffect(() => {
    axios
      .get(BASE_URL + "api/Resume/GetByUser/" + getStorage())
      .then((res) => {
        setResumes(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteResume = (e) => {
    axios
      .delete(BASE_URL + "api/Resume/" + e)
      .then((res) => {
        setResumes(resumes.filter((item) => item.id != e));
      })
      .catch((err) => console.log(err));
  };
  const passId = (e) => {
    localStorage.setItem(`setResumeId`, JSON.stringify(e));
    navigate("/viewresume");
  };
  return (
    <>
      <ResumeNavbar />
      <div className="add-resume">
        <span onClick={() => navigate("/newResume")}>Add resume</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="#b44593"
          class="bi bi-plus-lg"
          viewBox="0 0 16 16"
        >
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
        </svg>
      </div>

      <Table striped className="table">
        <tr>
          <th>Resume</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
          <th>jobTitle</th>
        </tr>
        <tbody>
          {resumes.map((resume, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{resume.name}</td>
              <td>{resume.fullName}</td>
              <td>{resume.location}</td>
              <td>{resume.jobTitle}</td>
              <Button
                variant="outline-secondary"
                onClick={() => deleteResume(resume.id)}
              >
                Delete
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => passId(resume.id)}
              >
                View
              </Button>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default MainPage;
