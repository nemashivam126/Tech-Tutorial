import axios from "axios";
import { useState } from "react"
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

export function UserLogin(){
    const [user, setUser] = useState({UserId:'', Password:''});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [ ,setCookie] = useCookies(['user-id','userName'])

    function handleIdChange(e){
        setUser({
            UserId: e.target.value,
            Password: user.Password
        })
    }
    function handlePwdChange(e){
        setUser({
            UserId: user.UserId,
            Password: e.target.value
        })
    }
    function handleSubmit(e){
        e.preventDefault();
        axios({
            method:'get',
            url:'http://127.0.0.1:5000/users'
        })
        .then(response=>{
            // console.log(response.data);
            for(var users of response.data){

                // if(users.UserId!==user.UserId && users.Password===user.Password){
                //     setError('incorrect userid')
                //     break;
                // }else if(users.Password!==user.Password && users.UserId===user.UserId){
                //     setError('incorrect password')
                //     break;
                // }else if(users.UserId!==user.UserId && users.Password!==user.Password){
                //     setError('incorrect userid & pwd')
                //     break;
                // }else if(users.UserId===user.UserId && users.Password===user.Password){
                //     setCookie("user-id", user.UserId);
                //     setCookie("userName", users.UserName)
                //     navigate("/user-home");
                //     break;
                // }

                if(users.UserId===user.UserId && users.Password===user.Password){
                    setCookie("user-id", user.UserId);
                    setCookie("userName", users.UserName)
                    navigate("/user-home");
                    break;
                }else{
                    setError("Incorrect credentials");
                }
            }
        })
    }

    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
            <div style={{borderRadius: '20px', boxShadow: '0px 15px 15px black', padding: '20px 40px', border: '1px solid lightgrey', background: 'white'}}>
                <div className="mb-4"><h1>User Login</h1></div>
                    <form onSubmit={handleSubmit}>
                        <dl>
                            <dt>User Id</dt>
                            <dd><input type="text" className="form-control" onChange={handleIdChange} /></dd>
                            <dt>Password</dt>
                            <dd><input type="password" className="form-control" onChange={handlePwdChange} /></dd>
                        </dl>
                        <button style={{width:'100%'}} className="btn btn-danger">Login</button>
                        <div className="text-danger" style={{fontWeight:"bold"}}><p>{error}</p></div>
                    </form>
                <div><Link to="/register-user" style={{color: 'black', textDecoration: 'none'}}>Create your account<span className="bi bi-arrow-right"></span></Link></div>
            </div>
        </div>
    )
}