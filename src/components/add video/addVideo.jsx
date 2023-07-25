import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';

export const AddVideo=()=>{
    const [categories, setCategories] = useState([]);
    const [cookies] = useCookies();

    function LoadVideos(){
        axios({
            method:'get',
            url: 'http://127.0.0.1:5000/categories'
        }).then((response)=>{
            response.data.unshift({CategoryId:-1, CategoryName:'Choose Category'});
            setCategories(response.data);
        })
    }
    useEffect(()=>{
        if(cookies['admin-id']===undefined){
            navigate("/admin-login");
        }else{
            LoadVideos();
        }
    })
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            VideoId:0,
            Title:'',
            Url:'',
            Likes:0,
            Dislikes:0,
            Views:0,
            CategoryId:0
        },
        onSubmit : (values)=>{
            axios({
                method: 'post',
                url:'http://127.0.0.1:5000/addvideo',
                data: values
            })
                alert("Video added successfully!");
                navigate("/admin-home");
        }
    })
    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:"80vh"}}>
            <div style={{borderRadius: '20px', boxShadow: '0px 15px 15px black', padding: '20px 40px', border: '1px solid lightgrey', background: 'white'}}>
                <form onSubmit={formik.handleSubmit}>
                    <dl>
                        <dt>VideoId</dt>
                        <dd><input type="number" onChange={formik.handleChange} className="form-control" name="VideoId" /></dd>
                        <dt>Title</dt>
                        <dd><input type="text" onChange={formik.handleChange} className="form-control" name="Title" /></dd>
                        <dt>Url</dt>
                        <dd><input type="text" onChange={formik.handleChange} className="form-control" name="Url" /></dd>
                        <dt>Likes</dt>
                        <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Likes" /></dd>
                        <dt>Dislikes</dt>
                        <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Dislikes" /></dd>
                        <dt>Views</dt>
                        <dd><input type="number" onChange={formik.handleChange} className="form-control" name="Views" /></dd>
                        <dt>CategoryId</dt>
                        <dd><select className="form-control" onChange={formik.handleChange} name="CategoryId">
                                {
                                    categories.map(category=>
                                        <option value={category.CategoryId} key={category.CategoryId}>
                                            {category.CategoryName.toUpperCase()}
                                        </option>
                                    )
                                }
                            </select>
                        </dd>
                    </dl>
                    <button className="btn btn-success">Add</button>
                </form>
            </div>
        </div>
    )
}