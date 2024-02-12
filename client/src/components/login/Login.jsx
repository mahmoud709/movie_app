/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
    const [isLoading, setisLoading] = useState(false);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    function takeData(event) {
        let user = { ...userData };
        user[event.target.name] = event.target.value;
        setUserData(user);
    }
    function handleLoginErr(){
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Email or Password are invalid",
          showConfirmButton: false,
          timer: 1500,
        });
    }
    async function postData() {
        try{
        const response = await axios.post("http://localhost:5000/", userData);
        setisLoading(false);
        if (response.data.message === "success") {
            localStorage.setItem("token", response.data.token);
            navigate("/home");
            }
        } 
        catch(err){
            handleLoginErr();
        }
        }
    
    function sendData(e) {
        e.preventDefault();
        postData();
    }


    return (
        <section className="vh-100 row mx-1">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Login Image"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={sendData}>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="form3Example3">
                                    Email address
                                </label>
                                <input
                                    onChange={takeData}
                                    type="email"
                                    id="form3Example3"
                                    className="form-control form-control-lg"
                                    placeholder="Enter a valid email address"
                                    name="email"
                                />
            
                            </div>
                            <div className="form-outline mb-3">
                                <label className="form-label" htmlFor="form3Example4">
                                    Password
                                </label>
                                <input
                                    onChange={takeData}
                                    type="password"
                                    id="form3Example4"
                                    className="form-control form-control-lg"
                                    placeholder="Enter password"
                                    name="password"
                                />
                            </div>
                            <div className="text-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block mb-4"
                                >
                                    {isLoading === true ? (
                                        <i className="fa-solid fa-spinner fa-spin"></i>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                                <p className="small fw-bold mt-2 pt-1 text-white">
                                    Don't have an account?{" "}
                                    <Link to="/register" className="link-danger">
                                        Register
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
