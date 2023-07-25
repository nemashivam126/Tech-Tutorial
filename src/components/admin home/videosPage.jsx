import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie"

export function VideoFolder(){
    const [videos, setVideos] = useState([]);
    const [cookies] = useCookies(['admin-id'])
    const navigate = useNavigate();

    const LoadFunction = () =>{
        axios({
            method: 'get',
            url: 'http://127.0.0.1:5000/videos'
        }).then((response)=>{
            const reversedVideos = response.data.reverse();
            setVideos(reversedVideos);
        })
    }
    useEffect(()=>{
        if(cookies['admin-id'] === undefined){
            navigate("/admin-login");
        }else{
            LoadFunction();
        }
    },[cookies, navigate])
    return(
        <div>
            <div className="text-center"><h1>Videos List</h1></div>
            <div>
                <Link to='/add-video' className="btn btn-success mb-2"><span className="bi bi-plus">Add New Video</span></Link>
                <div className="table-reponsive">
                    <table className="table table-hover table-dark" style={{width: '100%'}}>
                        <thead style={{textAlign: 'center'}}>
                            <tr>
                                <th>Title</th>
                                <th>Video</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{textAlign: 'center'}}>
                            {videos.map(video=>(
                                <tr key={video.VideoId}>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>{video.Title}</td>
                                    <td><iframe src={video.Url} title={video.Title} allowFullScreen height="150" width='50%'></iframe></td>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                                        <Link to={`/view-video/${video.VideoId}`} className="btn btn-primary"><span className="bi bi-eye-fill"></span></Link>
                                        <Link to={`/edit-video/${video.VideoId}`} className="btn btn-warning mx-2"><i className="bi bi-pen-fill text-white"></i></Link>
                                        <Link to={`/delete-video/${video.VideoId}`} className="btn btn-danger"><i className="bi bi-trash-fill"></i></Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}