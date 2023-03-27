import React from "react";
import axios from "axios";
import { BASE_URL } from "../api/index";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import "../styles/resume.css";
import getStorage from "../helpers/getStorage";
import ResumeNavbar from "./ResumeNavbar";
import EditDetails from "./EditDetails";
import EditExperience from "./EditExperience";
import EditEducation from "./EditEducation";
import EditLanguages from "./EditLanguages";

function Resume() {
  const [imageName, setimageName] = useState(``);
  let testid = JSON.parse(localStorage.getItem(`setResumeId`));
  let pictureUrl = BASE_URL + "Images/" + imageName;
  const navigate = useNavigate();
  const [language, setLanguage] = useState([]);
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);

  const [resume, setResume] = useState({
    id: JSON.parse(localStorage.getItem(`setResumeId`)),
  });
  useEffect(() => {
    let id = JSON.parse(localStorage.getItem(`setResumeId`));
    axios
      .get(BASE_URL + "api/Resume/" + id)
      .then((res) => {
        setResume(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(BASE_URL + "api/Experience/GetExperienceByResume/" + testid)
      .then((res) => {
        setExperience(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(BASE_URL + "api/Education/GetEducationByResume/" + testid)
      .then((res) => {
        setEducation(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(BASE_URL + "api/Language/GetLanguageByResume/" + testid)
      .then((res) => {
        setLanguage(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(BASE_URL + "api/User/" + getStorage())
      .then((res) => {
        setimageName(res.data.imageName);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteExperience = (e) => {
    axios
      .delete(BASE_URL + "api/Experience/" + e)
      .then((res) => {
        setExperience(experience.filter((item) => item.id != e));
      })
      .catch((err) => console.log(err));
  };

  const deleteEducation = (e) => {
    axios
      .delete(BASE_URL + "api/Education/" + e)
      .then((res) => {
        setEducation(education.filter((item) => item.id != e));
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <ResumeNavbar />
      <div className="resume">
        <div className="resume_left">
          <div className="resume_profile">
            <img src={pictureUrl} alt="profile_pic" />
          </div>
          <div className="resume_content">
            <div className="resume_item resume_info">
              <div className="title">
                <p className="bold">{resume.name}</p>
                <p className="regular">{resume.jobTitle}</p>
              </div>
              <ul>
                <li>
                  <div className="icon">
                    <i className="fas fa-map-signs"></i>
                  </div>
                  <div className="data">{resume.location}</div>
                </li>
                <li>
                  <div className="icon">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="data">{resume.phone}</div>
                </li>
                <li>
                  <div className="icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="data">{resume.emailAddress}</div>
                </li>
                <li>
                  <div className="icon">
                    <i className="fab fa-linkedin"></i>
                  </div>
                  <div className="data">{resume.linkedinUrl}</div>
                </li>
              </ul>
            </div>
            <div className="resume_item resume_skills">
              <div className="title">
                <p className="bold">skill's</p>
              </div>
              <ul>
                <li>
                  <div className="skill_name">HTML</div>
                  <div className="skill_progress">
                    {/* <span style="width: 80%;"></span> */}
                  </div>
                  <div className="skill_per">80%</div>
                </li>
                <li>
                  <div className="skill_name">CSS</div>
                  <div className="skill_progress">
                    {/* <span style="width: 70%;"></span> */}
                  </div>
                  <div className="skill_per">70%</div>
                </li>
                <li>
                  <div className="skill_name">SASS</div>
                  <div className="skill_progress">
                    {/* <span style="width: 90%;"></span> */}
                  </div>
                  <div className="skill_per">90%</div>
                </li>
                <li>
                  <div className="skill_name">JS</div>
                  <div className="skill_progress">
                    {/* <span style="width: 60%;"></span> */}
                  </div>
                  <div className="skill_per">60%</div>
                </li>
                <li>
                  <div className="skill_name">JQUERY</div>
                  <div className="skill_progress">
                    {/* <span style="width: 88%;"></span> */}
                  </div>
                  <div className="skill_per">88%</div>
                </li>
              </ul>
            </div>
            <div className="resume_item resume_skills">
              <div className="title">
                <span className="bold">Languages</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  fill="white"
                  class="bi bi-plus-circle"
                  viewBox="0 0 16 16"
                  onClick={() => navigate("/language")}
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
              </div>
              <ul>
                {language.map((la) => (
                  <li>
                    <EditLanguages language={la} />
                    <div className="skill_name">{la.name.slice(0, 3)}</div>
                    <div className="skill_progress">
                      <span style={{ width: `${la.spokenLevel}%` }}></span>
                    </div>
                    <div className="skill_per">{la.spokenLevel}%</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="resume_right">
          <div className="resume_item resume_about">
            <div className="title">
              <span className="bold">About Me</span>{" "}
              <EditDetails resume={resume} setResume={setResume} />
            </div>

            <p>{resume.about}</p>
          </div>
          <div className="resume_item resume_work">
            <div className="title">
              <span className="bold">Work Experience</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
                onClick={() => navigate("/experience")}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </div>
            <ul>
              {experience.map((exp) => {
                return (
                  <li>
                    <div className="date">
                      {exp.startDate.slice(0, 10)} - {exp.endDate.slice(0, 10)}
                      <EditExperience experience={exp} />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash3"
                        viewBox="0 0 16 16"
                        onClick={() => deleteExperience(exp.id)}
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                      </svg>
                    </div>
                    <div className="info">
                      <p className="semi-bold">{exp.role}</p>
                      <p>{exp.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="resume_item resume_education">
            <div className="title">
              <span className="bold">Education</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-plus-circle-fill"
                viewBox="0 0 16 16"
                onClick={() => navigate("/education")}
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </div>
            <ul>
              {education.map((edu) => (
                <li>
                  <div>
                    {edu.endDate.slice(0, 10)}{" "}
                    <EditEducation education={edu} setEdu={setEducation} />{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash3"
                      viewBox="0 0 16 16"
                      onClick={() => deleteEducation(edu.id)}
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
                    </svg>
                  </div>
                  <div className="info">
                    <p className="semi-bold">{edu.facilityName}</p>
                    <p>{edu.educationTitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resume;
