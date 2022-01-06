import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [user,setUser] = useState(window.localStorage.getItem("userToken") ? JSON.parse(atob(window.localStorage.getItem("userToken")?.split(".")[1])):null)
    const [userDetails,setUserDetails] = useState(null);

    useEffect(() => {
        getUser();
    }, [user])
    let getUser = () => {
        if(user){
            fetch(`http://localhost:5000/api/auth`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`${window.localStorage.getItem("userToken")}`
                }
            })
            .then(res => res.json())
            .then(data => {
                setUserDetails(data)
            })
        }else{
            setUserDetails(null)
        }
    }

    let EditUser = (e) => {
        e.preventDefault();
        fetch(`http://localhost:5000/api/auth/edit`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`${window.localStorage.getItem("userToken")}`
            },
            body:JSON.stringify({
                firstName:userDetails.firstName,
                lastName:userDetails.lastName,
                emailId:userDetails.emailId,
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.status){
                alert("User profile updated successfully");
            }else{
                alert(data.message)
            }
        })
    }


    if(user==null){
        window.location.href = "/login";
    }
    return(
        <>{window.localStorage.getItem("userToken") && <div className="d-flex justify-content-center align-items-centers">
        <div className="col-lg-5 mt-5 py-4 px-5 shadow rounded auth-container">
            <h1 className="text-center mb-4">User Details</h1>
            <form className="px-lg-5 mb-4 d-flex flex-column justify-content-between" onSubmit={(e)=>EditUser(e)}>                   
                <input placeholder="Email" type="email" value={userDetails?.emailId || ""} disabled onChange={(e)=>{}} required></input>
                <input placeholder="First Name" value={userDetails?.firstName || ""} onChange={(e)=>setUserDetails({...userDetails,firstName:e.target.value})} required></input>
                <input placeholder="Last Name" value={userDetails?.lastName || ""} onChange={(e)=>setUserDetails({...userDetails,lastName:e.target.value})} required></input>
                <button className="btn btn-primary w-50 align-self-center" type="submit">Save Details</button>
            
            <button className="btn btn-danger w-50 align-self-center" onClick={
                ()=>{
                    window.localStorage.removeItem("userToken");
                    setUser(null);
                }
            }>Logout</button>
            </form>
        </div>
        </div>}</>
    )
}
