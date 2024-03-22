import React, {useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./MyNotes.css"



function Login(){

    const location = useLocation();

    // const userDetails = location.state.userDetails

    // const [usersData,setUsersData] = useState([])

    
    // useEffect(()=>{

    //     setUsersData(prevState => {
    //         return [...prevState,userDetails]
    //     })

    // },[userDetails])

    // console.log(usersData)

    const [userData, setUserData] = useState({
        username:"",
        password:""
    })

    const handleChange =(e)=>{
        const {name, value} = e.target;
        console.log(name,value)
        setUserData((prevState)=>(
            {
                ...prevState,
                [name] : value
            }
        ))
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(userData)
        
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="loginForm">
                    {/* <label htmlFor="username">User Name</label> */}
                    {/* <input id="username" name="username" value={userData.username} onChange={handleChange}></input> */}
                    <TextField id="username" label="username" name="username" variant="outlined" value={userData.username} onChange={handleChange}/>
                </div>

                <div id="password">
                    {/* <label htmlFor="password">Password</label> */}
                    <TextField id="password" label="password" name="password" variant="outlined" value={userData.password} onChange={handleChange}/>
                </div>

                {/* <button type="submit">Login</button> */}
                <Button id="loginButton" variant="contained" type="submit">Login</Button>
            </form>
            <p>if you don't have an accoount? <Link  to='/signUp'>SignUp</Link></p>
        </div>
    )
}

export default Login;