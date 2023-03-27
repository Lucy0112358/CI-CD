import React from "react";
import { useState } from "react";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { login } from "../helpers/login.js";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/loqinpaqe.css";
import Form from "react-bootstrap/Form";

function Login() {
  const [val, setVal] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  let sourcepicture =
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp";
  return (
    <>
      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img src={sourcepicture} />
                        <h4 className="mt-1 mb-5 pb-1">
                          We are The ResumeBuilders
                        </h4>
                      </div>

                      <form>
                        <p>Please login to your account</p>

                        <div className="form-outline mb-4">
                          <label className="form-label">Username</label>

                          <Form.Control
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            value={val}
                            onChange={(e) => {
                              setVal(e.target.value);
                            }}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label">Password</label>
                          <Form.Control
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon1"
                            type="password"
                            value={pass}
                            onChange={(e) => {
                              setPass(e.target.value);
                            }}
                          />
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            onClick={(e) => {
                              login(val, pass, e);
                              localStorage.setItem(
                                `userName`,
                                JSON.stringify(val)
                              );
                              navigate("/main");
                            }}
                          >
                            Log in
                          </button>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                          >
                            Create new
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h4 className="mb-4">Creativity is intelligence having fun</h4>
                      <p className="small mb-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit, sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua. Ut enim ad minim veniam, quis
                        nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
