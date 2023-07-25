import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";

export function MainComponent(){
    const [userEmail, setUserEmail] = useState([]);
    const [error, setError] = useState();
    const navigate = useNavigate()
    const handleEmailChange=(e)=>{
        setUserEmail(e.target.value)
    }
    const handleSubmit=()=>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/users'
        }).then((response)=>{
            // console.log(response.data)
            for(let user of response.data){
                if(user.Email===userEmail){
                    navigate("/user-login");
                    break;
                }else{
                    // setError('Account does not exis');
                    setError(
                        <>
                            Account does not exist.&nbsp;
                            <Link to="/register-user">Register here</Link>
                        </>
                    );                    
                }
            }
        })
    }
    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
            <main>
                <div>
                    <h1>
                        Learn & Design
                    </h1>
                    <p>Watch Videos Learn Technology</p>
                </div>
                <div className="input-group">
                    <input className="form-control" type="email" placeholder="Enter your email" onChange={handleEmailChange}/>
                    <button className="btn btn-danger" onClick={handleSubmit}>Get Started<span className="bi bi-chevron-right"></span></button>
                </div><br/>
                <div className="div text-danger">{error}</div>
            </main>
        </div>
    )
}