import React from "react";
import "./MyNotes.css"
import { useState } from "react";
import Login from "./Login";
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";



function SignUp(){

    const navigate = useNavigate();

    const [userDetails, setUserDetails] = useState({
        name: "",
        username: "",
        dob: "",
        password: ""
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;

        setUserDetails(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(userDetails)
        navigate('/login',{state:{userDetails}})
       
    }

    return (
        <div className="signUpPage">

            <form onSubmit={handleSubmit}>
                <div >
                    {/* <label htmlFor="name">Name: </label> */}
                    <TextField id="name" label="Name" name="name" value={userDetails.name} onChange={handleChange}/>
                </div>

                <div id="username">
                    {/* <label htmlFor="username">User Name: </label> */}
                    <TextField id="username" label="User Name"name="username" value={userDetails.username} onChange={handleChange}/>
                </div>

                <div id="dob">
                    {/* <label htmlFor="dob">Date of Birth: </label> */}
                    <TextField id="dob"  type="date" name="dob" value={userDetails.dob} onChange={handleChange} style={{width:200}}/>
                </div>

                <div id="password">
                    {/* <label htmlFor="password">Password: </label> */}
                    <TextField id="passwword" label="Password" name="password" value={userDetails.password} onChange={handleChange} style={{width:200}}/>
                </div>

                <Button id="signUpButton" type="submit" variant="contained">SignUp</Button>
            </form>

        </div>
    )
}

export default SignUp;