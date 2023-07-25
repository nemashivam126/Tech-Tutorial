import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export function AdminLogin(){
    const [admin, setAdmin] = useState({UserId:'', Password:''})
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [, setCookie] = useCookies(['admin-id', 'adminName']);
    
    function handleIdChange(e){
        setAdmin((prevUser)=>({
            ...prevUser,
            UserId:e.target.value
        }))
    }
    function handlePwdChange(e){
        setAdmin({
            UserId:admin.UserId,
            Password:e.target.value
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/admin'
        }).then(response=>{
            for(var adm of response.data){
                if(adm.UserId===admin.UserId && adm.Password===admin.Password){
                    setCookie("admin-id",admin.UserId);
                    setCookie("adminName", adm.UserName);
                    navigate("/admin-home");
                    break;
                }else{
                    setError('Invalid credentials!');
                }
            }
        })

    }
    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
            <div style={{borderRadius: '20px', boxShadow: '0px 15px 15px black', padding: '20px 40px', border: '1px solid lightgrey', background: 'white'}}>
            <div className="mb-4"><h1>Admin Login</h1></div>
                <form onSubmit={handleSubmit}>
                    <dl>
                        <dt>Admin ID</dt>
                        <dd><input type="text" onChange={handleIdChange} className="form-control"/></dd>
                        <dt>Password</dt>
                        <dd><input type="password" onChange={handlePwdChange} className="form-control"/></dd>
                    </dl>
                    <button className="btn btn-primary w-100">Login</button>
                    <div className="text-danger"><p>{error}</p></div>
                </form>
            </div>
        </div>
    )
}