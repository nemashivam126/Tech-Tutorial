import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';

export const ViewVideo = () => {
  const params = useParams();
  const [cookies] = useCookies();
  const navigate = useNavigate();
  const [videos, setVideos] = useState([
    {
      VideoId: 0,
      Title: "",
      Url: "",
      Likes: 0,
      Dislikes: 0,
      Views: 0,
      CategoryId: 0,
    },
  ]);
  function LoadVideos(){
    axios({
      method: "get",
      url: `http://127.0.0.1:5000/videos/${params.id}`,
    }).then((response) => {
      setVideos(response.data);
    });
  }
  useEffect(() => {
    if(cookies['admin-id']===undefined){
      navigate("/admin-login");
  }else{
      LoadVideos();
  }
  });
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
      <div className="card mb-3" style={{width:'60vw'}}>
        <iframe src={videos[0].Url} className="card-img-top" allowFullScreen style={{height: '60vh'}} title={videos[0].Title}></iframe>
        <div className="card-body">
          <h5 className="card-title">{videos[0].Title}</h5>
        </div>
      </div>
    </div>
  );
};
