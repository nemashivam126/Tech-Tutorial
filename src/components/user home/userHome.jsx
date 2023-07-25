import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const UserHome = () => {
  const [videos, setVideos] = useState([]);
  const [cookies] = useCookies([]);
  const navigate = useNavigate();
  const LoadVideos = ()=>{
    axios({
      method: 'get',
      url: 'http://127.0.0.1:5000/videos'
    }).then((response)=>{
      const reversedData = response.data.reverse();
      setVideos(reversedData);
    })
  }
  
  useEffect(()=>{
    if(cookies['user-id'] === undefined){
      navigate("/user-login");
    }else{
      LoadVideos();
    }
  })

  return (
    <div className="d-flex">
      {
        videos.map(video=>(
          <div className="card mx-3" style={{ width: "18rem" }} key={video.VideoId}>
            <iframe className="card-img-top" src={video.Url} title={video.Title} allowFullScreen></iframe>
            <div className="card-body">
              <p className="card-text">{video.Title}</p>
            </div>
          </div>
        ))
      }
    </div>
  );
};
