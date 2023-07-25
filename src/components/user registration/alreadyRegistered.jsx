import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const AlreadyLogged=()=>{
    const navigate = useNavigate();
    const [ , ,removeCookie] = useCookies();
    const handleClick =()=>{
        if(true){
            removeCookie('user-id');
            removeCookie('userName');
            navigate("/user-login");
        }
    }
    return(
        <div className='d-flex align-items-center justify-content-center flex-column' style={{height:"80vh"}}>
            <div><h1>You Are already logged in!</h1></div>
            <div><p>To register a new user please <button className="btn btn-danger" onClick={handleClick}>Logout</button> and then register!</p></div>
        </div>
    )
}