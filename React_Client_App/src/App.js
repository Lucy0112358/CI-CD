import React from "react";
import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import NewResume from "./components/NewResume";
import UploadPicture from "./components/UploadPicture";
import Experience from "./components/Experience";
import Language from "./components/Language";
import Resume from "./components/Resume";
import Education from "./components/Education";
import AddDetails from "./components/AddDetails";


function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />   
        <Route path="/newResume" element={<NewResume />} />   
        <Route path="/uploadpicture" element={<UploadPicture />} />    
        <Route path="/experience" element={<Experience />} />    
        <Route path="/language" element={<Language />} />    
        <Route path="/viewresume" element={<Resume />} />   
        <Route path="/education" element={<Education />} />   
        <Route path="/addDetails" element={<AddDetails />} />                   
      </Routes>
    </>
  );
}

export default App;
