import axios from "axios"
import { useFormik } from "formik"
import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom"
import { useCookies } from "react-cookie";

export function EditVideo(){
    const params = useParams();
    const navigate = useNavigate();
    const [cats, setCats] = useState([]);
    const [cookies] = useCookies()
    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Likes:0, Dislikes:0, Views:0, CategoryId:0}]);
    const formik = useFormik({
        initialValues: {
            VideoId: videos[0].VideoId,
            Title: videos[0].Title,
            Url: videos[0].Url,
            Likes:videos[0].Likes,
            Dislikes:videos[0].Dislikes,
            Views:videos[0].Views,
            CategoryId:videos[0].CategoryId
        },
        onSubmit:(values)=> {
            axios({
                method: 'put',
                url: `http://127.0.0.1:5000/updatevideo/${params.id}`,
                data: values
            }).then(response => {
                if (response.status === 200) {
                  alert('Data updated successfully!');
                  navigate("/admin-home");
                }
            })
        },
        enableReinitialize: true
    })
    function LoadCategory(){
        axios.get('http://127.0.0.1:5000/categories')
        .then(response=>{
            response.data.unshift({CategoryId: -1, CategoryName: 'Select Category'});
            setCats(response.data)
        })
    }
    function LoadVideos(){
        axios({
            method: 'get',
            url: `http://127.0.0.1:5000/videos/${params.id}`
        })
        .then(response=>{
            setVideos(response.data);
        })
    }
    useEffect(()=>{
        if(cookies['admin-id']===undefined){
            navigate("/admin-login");
        }else{
            LoadCategory();
            LoadVideos();
        }
    },)

    // useEffect(() => {
    //     formik.setValues(videos[0]);
    // }, [videos]);

    return(
        <div>
            <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
                <div style={{borderRadius: '20px', boxShadow: '0px 15px 15px black', padding: '20px 40px', border: '1px solid lightgrey', background: 'white'}}>
                    <form onSubmit={formik.handleSubmit}>
                        <dl>
                            <dt>VideoId</dt>
                            <dd><input type="number" onChange={formik.handleChange} value={formik.values.VideoId} className="form-control" name="VideoId" /></dd>
                            <dt>Title</dt>
                            <dd><input type="text" onChange={formik.handleChange} value={formik.values.Title} className="form-control" name="Title" /></dd>
                            <dt>Url</dt>
                            <dd><input type="text" onChange={formik.handleChange} value={formik.values.Url} className="form-control" name="Url" /></dd>
                            <dt>Likes</dt>
                            <dd><input type="number" onChange={formik.handleChange} value={formik.values.Likes} className="form-control" name="Likes" /></dd>
                            <dt>Dislikes</dt>
                            <dd><input type="number" onChange={formik.handleChange} value={formik.values.Dislikes} className="form-control" name="Dislikes" /></dd>
                            <dt>Views</dt>
                            <dd><input type="number" onChange={formik.handleChange} value={formik.values.Views} className="form-control" name="Views" /></dd>
                            <dt>CategoryId</dt>
                            <dd><select className="form-control" name="CategoryId" value={formik.values.CategoryId} onChange={formik.handleChange}>
                                    {
                                        cats.map(cat=>
                                            <option value={cat.CategoryId} key={cat.CategoryId}>
                                                {cat.CategoryName.toUpperCase()}
                                            </option>
                                        )
                                    }
                                </select>
                            </dd>
                        </dl>
                        <button className="btn btn-primary">Update Video</button>
                    </form>
                </div>
            </div>
            <Link className="btn btn-secondary" to="/admin-home">Back</Link>
        </div>
    )
}