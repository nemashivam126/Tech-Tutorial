import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { MainComponent } from './components/main component/mainComp';
import { UserLogin } from './components/user login/userLogin';
import { RegisterUser } from './components/user registration/registerUser';
import { AdminLogin } from './components/admin login/adminLogin';
import { VideoFolder } from './components/admin home/videosPage';
import { ViewVideo } from './components/view component/viewComp';
import { useCookies } from 'react-cookie';
import { SignOut } from './components/signout button/signOut';
import { UserHome } from './components/user home/userHome';
import { AddVideo } from './components/add video/addVideo';
import { EditVideo } from './components/edit video/editVideo';
import { DeleteVideo } from './components/delete video/deleteVideo';
import { AlreadyLogged } from './components/user registration/alreadyRegistered';

function App() {
  const [cookies] = useCookies();

  return (
    <div className="container-fluid">
      <BrowserRouter>
        <header className='d-flex justify-content-between align-items-center bg-dark text-white mt-2 p-2' style={{borderRadius:"20px"}}>
          <div className='mx-3'><Link to="/" style={{color:"white",textDecoration: "none"}}><h1>Tech Tutorials</h1></Link></div>
          <div className='mx-3'>
            {
              cookies['admin-id']===undefined && cookies['user-id']===undefined ? 
              <div>
                <Link to="/user-login" className='btn btn-danger me-2'>User Sign-in</Link>
                <Link to="/admin-login" className='btn btn-danger'>Admin Sign-in</Link>
              </div>:   
              <div className='d-flex me-2'>
                <Link style={{textDecoration: 'none', color:'white'}} to={cookies['admin-id']?"/admin-home":"/user-home"}>
                  <h4 className='me-2'>
                    {cookies['admin-id']?cookies['adminName'].toUpperCase():cookies['userName'].toUpperCase()}
                  </h4>
                </Link><span><SignOut /></span>
              </div>
            }
          </div>
        </header>
        <section >
          <Routes>
            <Route path='/' element= {<MainComponent />} />
            <Route path='/user-login' element={<UserLogin />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            {/* <Route path='/register-user' element={<RegisterUser />} /> */}
            <Route path='/register-user' element={!cookies['user-id']?<RegisterUser />:<AlreadyLogged/>} />
            <Route path='/admin-home' element={<VideoFolder />} />
            <Route path='/view-video/:id' element={<ViewVideo />} />
            <Route path='/user-home' element={<UserHome />} />
            <Route path='/add-video' element={<AddVideo />} />
            <Route path='/edit-video/:id' element={<EditVideo/>} />
            <Route path='/delete-video/:id' element={<DeleteVideo/>}/>
          </Routes>
        </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
