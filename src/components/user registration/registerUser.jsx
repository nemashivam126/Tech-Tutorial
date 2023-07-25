import axios from "axios";
import { useState } from "react"

export function RegisterUser(){
    const [userDetails, setUserDetails] = useState({UserId:'', UserName:'', Email:'', Password:'', Mobile:''});
    const [error, setError] = useState('');
    const [errorClass, setErrorClass] = useState('');

    function handleBlurUserId(e){
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/users'
        }).then(response=>{
            for(var users of response.data){
                var submit = document.getElementById('register');
                submit.disabled = false;
                if(users.UserId===e.target.value){
                    setError('userid already taken');
                    setErrorClass('text-danger');
                    submit.disabled = true;
                    break;
                }else{
                    setError('');
                }
            }
        })
    }
    function handleIdChange(e){
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/users'
        }).then(response=>{
            for(var users of response.data){
                var submit = document.getElementById('register');
                submit.disabled = false;
                if(users.UserId===e.target.value){
                    setError('userid already taken');
                    setErrorClass('text-danger')
                    submit.disabled = true;
                    break;
                }else{
                    setError('userid available');
                    setErrorClass('text-success')
                    // submit.disabled = false;
                }
            }
        })

        setUserDetails((prevUser)=>({
            ...prevUser,
             UserId: e.target.value
        }))
    } 
    function handleNameChange(e){
        setUserDetails((prevUser)=>({
            ...prevUser,
            UserName: e.target.value
       }))
    }
    function handleEmailChange(e){
        setUserDetails((prevUser)=>({
            ...prevUser,
            Email: e.target.value
       }))
    }
    function handlePwdChange(e){
        setUserDetails((prevUser)=>({
            ...prevUser,
            Password: e.target.value
       }))
    }
    function handleMobileChange(e){
        setUserDetails((prevUser)=>({
            ...prevUser,
            Mobile: e.target.value
       }))
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/adduser',
            data: userDetails
        }).then(()=>{
            alert('Registered Successfully')
        })
    }

    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
            <div style={{borderRadius: '20px', boxShadow: '0px 15px 15px black', padding: '20px', border: '1px solid lightgrey', background: 'white'}}>
                <h1>Register here!</h1>
                <form onSubmit={handleSubmit}>
                    <dl>
                        <dt>Enter UserId</dt>
                        <dd><input className="form-control" onChange={handleIdChange} onBlur={handleBlurUserId} type="text" name="UserId" /></dd>
                        <div className={errorClass} style={{fontWeight:'bold'}}><p>{error}</p></div>
                        <dt>Enter Name</dt>
                        <dd><input className="form-control" onChange={handleNameChange} type="text" name="UserName" /></dd>
                        <dt>Enter Email</dt>
                        <dd><input className="form-control" onChange={handleEmailChange} type="email" name="Email" /></dd>
                        <dt>Enter Password</dt>
                        <dd><input className="form-control" onChange={handlePwdChange} type="password" name="Password" /></dd>
                        <dt>Enter Mobile No.</dt>
                        <dd><input className="form-control" onChange={handleMobileChange} type="text" name="Mobile" /></dd>
                    </dl>
                    <div className="btns d-flex justify-content-between">
                        <button className="btn btn-primary" id="register">Register</button>
                        <button className="btn btn-info" type="reset">Reset</button>
                    </div>
                </form>
            </div>
        </div>
    )
}