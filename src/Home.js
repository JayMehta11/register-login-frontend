import React,{useState} from "react";
import {Link,} from "react-router-dom";


export default function Home() {
    const [user,setUser] = useState(window.localStorage.getItem("userToken") ? JSON.parse(atob(window.localStorage.getItem("userToken")?.split(".")[1])) : null);

    if(user==null){
        window.location.href = "/login";     
    }
    console.log(user);
    return(
        <div>
            <h1>Home</h1>
            <p>{user?.emailId}</p>
            <button onClick={
                ()=>{
                    window.localStorage.removeItem("userToken");
                    setUser(null);
                }
            }>Logout</button> 
        </div>
    )

}
