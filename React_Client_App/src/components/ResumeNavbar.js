import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from "react";
import getStorage from "../helpers/getStorage";
import axios from "axios";
import { BASE_URL } from "../api/index";
import { useNavigate } from "react-router-dom";

function ResumeNavbar() {
  const navigate = useNavigate();
  const [imageName, setimageName] = useState(``);
  let pictureUrl =BASE_URL +"Images/" + imageName;
  const [username, setUsername] = useState(
    JSON.parse(localStorage.getItem(`userName`))
  );
  let defaultPicture = "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
  useEffect(() => {
    axios
      .get(BASE_URL + "api/User/" + getStorage())
      .then((res) => {
        setimageName(res.data.imageName);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    axios
      .get(BASE_URL + "api/User/" + getStorage())
      .then((res) => {
        setUsername(res.data.userName);
      })
      .catch((err) => console.log(err));
  }, [getStorage()]);
  return (
    <Navbar className='main-menu'>
      <Container>
        <Navbar.Brand className="resumeBuilder" onClick={() =>navigate("/main")}>ResumeBuilder</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <span>{username ? `Signed in as:  ${username}` : <span onClick={() =>navigate("/")}>Login</span>}</span>
            {username ? <img src={pictureUrl ? pictureUrl : defaultPicture} onClick={() => navigate("/uploadpicture")} /> : null}
            {username ? (
        <span
          onClick={() => {
            localStorage.clear();
            setUsername("");            
            navigate("/")
          }}
        >
         Logout
        </span>
      ) : null}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default ResumeNavbar;