import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
export const DeleteVideo = ()=>{
    const [cookies] = useCookies();
    const [videos, setVideos] = useState([{
        VideoId: 0,
        Title: "",
        Url: "",
        Likes: 0,
        Dislikes: 0,
        Views: 0,
        CategoryId: 0,
    }]);
    const param = useParams();
    const navigate = useNavigate();
    function LoadVideos(){
        axios({
            method: 'get',
            url: `http://127.0.0.1:5000/videos/${param.id}`
        }).then(response=>{
            setVideos(response.data);
        },)
    }
    useEffect(()=>{
        if(cookies['admin-id']===undefined){
            navigate("/admin-login");
        }else{
            LoadVideos();
        }
    },)
    function handleDeleteClick(){
        axios({
            method: 'delete',
            url: `http://127.0.0.1:5000/deletevideo/${param.id}`
        })
        alert('Video Deleted');
        navigate('/admin-home');
    }
    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
            <div>
                {/* <div>
                    <h1>Delete</h1>
                    <h3>{videos[0].Title}</h3>
                    {videos.length > 0 && <h3>{videos[0].Title}</h3>}
                </div> */}
                <div className="card mb-3" style={{width:'300px'}}>
                    {videos.length > 0 && (
                        <iframe src={videos[0].Url} className="card-img-top" allowFullScreen style={{height: '200px', width:'300px'}} title={videos[0].Title}></iframe>
                    )}
                    <div className="card-body">
                        {videos.length > 0 && <h5 className="card-title">{videos[0].Title}</h5>}
                    </div>
                    <div className="card-footer">
                        <button data-bs-toggle="modal" data-bs-target="#exampleModal" className="btn btn-danger w-100">Delete<i className="bi bi-trash-fill"></i></button>
                    </div>
                </div>

            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document" style={{width:'fit-content'}}>
                    <div className="modal-content">
                        <div className="modal-header flex-column">
                            <button type="button" className="btn btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            <div className="icon-box" style={{
                                border: '3px solid red',
                                borderRadius: '100%',
                                height: '90px',
                                width: '90px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <i className="bi bi-trash-fill text-danger" style={{fontSize: '40px'}}></i>
                            </div>
                            <h5 className="modal-title" style={{textAlign:'center'}} id="exampleModalLabel">Are you sure?</h5>
                        </div>
                        <div className="modal-body text-center">
                            {/* <p>Do you really want to delete record {videos[0].Title}?</p> */}
                            {videos.length > 0 && (
                                <p>Do you really want to delete record {videos[0].Title}?</p>
                            )}
                            {videos.length > 0 && (
                                <iframe src={videos[0].Url} className="card-img-top" allowFullScreen style={{height: '200px', width:'300px'}} title={videos[0].Title}></iframe>
                            )}
                        </div>
                        <div className="modal-footer justify-content-around">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleDeleteClick} className="btn btn-danger" data-bs-dismiss="modal">Yes Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}