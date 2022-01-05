import React, { useContext, useRef, useState } from 'react'
import { Link,  } from 'react-router-dom';

export default function Login() {

    const email = useRef("");
    const password = useRef("");
    // const {loader,setLoader} = useContext(LoaderContext);


    let HandleSignIn = (e) => {
        // setLoader(true);
        e.preventDefault();
        fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailId: email.current.value,
                password: password.current.value,
            })
        })
            .then(res => res.json())
            .then(data => {
                // setLoader(false);
                if (data.status) {
                    alert("Login Successful");
                    window.localStorage.setItem("userToken", data.token);
                    window.location.href = "/";
                }
                else {
                    alert(data.message);
                }
            })

    }

    if(window.localStorage.getItem('userToken')){
        window.location.href = "/";
    }   

    return (
        <div className="d-flex justify-content-center align-items-centers">
            <div className="col-lg-5 col-md-7 col-10 mt-5 py-4 px-5 shadow rounded auth-container">
                <h1 className="text-center mb-4">Sign In</h1>
                <form className="px-lg-5 px-md-3 mt-3 mb-4 d-flex flex-column justify-content-between" onSubmit={(e) => HandleSignIn(e)}>
                    <input placeholder="Email" ref={email} type="email" required></input>
                    <input placeholder="Password" ref={password} type="password" required></input>
                    <button className="btn btn-success w-100 align-self-center" type="submit">Sign In</button>
                    
                </form>

                <p className="text-center mb-3"><Link to="/register">Create an account</Link></p>
            </div>
        </div>
    )
}