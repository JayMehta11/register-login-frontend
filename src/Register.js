import React, { useContext, useState } from 'react'
import { Link,  } from 'react-router-dom';

export default function Register() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    

    let HandleSignUp = (e) => {
        e.preventDefault();
        fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                emailId: email,
                password: password,
            }
            )
        })
            .then(res => res.json())
            .then(data => {
                // setLoader(false);
                if (data.status) {
                    alert("User created successfully");
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
                <h1 className="text-center mb-4">Sign Up</h1>
                <form className="px-lg-5 px-md-3 mt-3 mb-4 d-flex flex-column justify-content-between" onSubmit={(e) => HandleSignUp(e)}>
                    <input placeholder="firstName" onChange={(e) => setFirstName(e.target.value)} required></input>
                    <input placeholder="lastName"  onChange={(e) => setLastName(e.target.value)} required></input>
                    <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} required></input>
                    <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} required></input>
                    <input placeholder="Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} required></input>
                    <button className="btn btn-success w-100 align-self-center" disabled={password==="" || confirmPassword !== password} type="submit">Sign Up</button>
                </form>
                <p className="text-center mb-3"><Link to="/login">Already have an account</Link></p>
            </div>
            
        </div>
    )
}
