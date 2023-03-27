import React from "react";
import Form from "react-bootstrap/Form";
import getStorage from "../helpers/getStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UploadPicture() {
  const navigate = useNavigate();
  var formData = new FormData();
  const upload = (e) => {
    if (e.target && e.target.files[0]) {
      formData.append(`file`, e.target.files[0]);
      formData.append(`UserId`, getStorage());
    }  
  };
  const submit = () => {
    axios.post("http://localhost:5133/api/Resume/PictureUpload/?userid=" + getStorage(), formData).then(
      res => navigate("/main").catch(err => console.log(err))
    )
  }
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Default file input example</Form.Label>
        <Form.Control type="file" onChange={upload} />
      </Form.Group>
      <button onClick={submit}>Click</button>
    </>
  );
}

export default UploadPicture;
