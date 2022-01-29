import React,{useEffect, useState} from 'react';
import "./Video.css"
import Videofile from "./road.mp4"
import Header from './Header';
import { useParams,Navigate } from 'react-router-dom';
import axios from 'axios';

const Indprofile = () => {
    const [admindata,setAdmindata] = useState(null);
    const {id} = useParams()

    const [data,setData] = useState({
        fullname : '',
        concern : '',
        Hperson : "",
        concerndepartment : ''
    })

    const {fullname,Hperson,concern} = data;

    const changeHandler = e =>{
        setData({...data,[e.target.name]:e.target.value,concerndepartment:id});  
    }

    const submitHandler = e =>{
        e.preventDefault();
        if(fullname && concern && Hperson ) {
                axios.post("http://localhost:5000/addconcern",data,{
                    headers : {
                        'x-token' : localStorage.getItem('token')
                    }
                    }).then(
                        res => alert(res.data)
                    )
                setData({...data,concerndepartment:'',concern:'',Hperson:''});

                axios.post("http://localhost:5000/sendmailadmin",{concern:concern,Hperson:Hperson,email:admindata[0].email},{
                    headers : {
                        'x-token' : localStorage.getItem('token')
                    }
                    }).then(
                        res => console.log(res.data)
                    )
        }
        else{
            alert("Invalid information ")
        }
    }


    useEffect(()=>{
        axios.get('http://localhost:5000/alladmins',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setAdmindata(res.data.filter(profile => profile.concerndepartment===id)))
    },[id])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

  return (
  <div className='con2'>
      <Header />
        
        <center>
            <br />
            <h1 style={{color:"yellowgreen"}}>COMPLAINT FORM</h1><br />
        <div className='container card profile' style={{width:"75%",fontFamily: "Teko",fontSize:"20px",background: "rgba(255,255,255,0.7)"}}>
                    
                        <center>
                            <br />
                        <img 
                            className="round-img"
                            src="https://www.vkeel.com/blog/wp-content/uploads/2020/10/private-complaint.jpg"
                            height="250" width="250"
                            alt="pix" style={{borderRadius:"10px"}} 
                        /><br /><br />
                        </center>
                    <form onSubmit={submitHandler} autoComplete='off'>
                        <h3>Your Name : </h3>
                        <input type="text" name="fullname" value={fullname} placeholder='Name' onChange={changeHandler}></input>
                        <h5 >complainee /organisation details : </h5>
                        <input type="text" name="Hperson" value={Hperson} placeholder='Details' onChange={changeHandler}></input>
                        <h3>Your Concern : </h3>
                        <input type="text" name="concern" value={concern} placeholder='concern' onChange={changeHandler}></input>
                        <br /><br />
                        <input type="submit" value="submit" className="btn btn-success" /><br /><br />
                    </form>
                    
                </div>
                <br /><br />
                </center>
  </div>
  )
};

export default Indprofile;
