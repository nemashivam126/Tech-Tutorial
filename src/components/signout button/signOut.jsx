import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
export const SignOut = ()=>{
    const [cookies, ,removeCookie] = useCookies()
    const navigate = useNavigate();
    const handleClick = () => {
        if('admin-id' in cookies){
            removeCookie('admin-id');
            removeCookie('adminName')
            navigate("/admin-login");
        }else if('user-id' in cookies){
            removeCookie('user-id');
            removeCookie('userName');
            navigate("/user-login");
        }
    }
    return(
        <div>
            <button className='btn btn-danger' onClick={handleClick}>Logout</button>
        </div>
    )
}