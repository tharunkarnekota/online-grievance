import React,{useEffect, useState} from 'react';
import "./Video.css"

import Header2 from './Header2';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Indcompliment2 = () => {
    const [selectedFiles,setSelectedfiles] = useState([])
    const [y,setY] = useState(0);
    const [report,setReport] = useState("")
    
    const [spconcern,setSpconcern] = useState(null)
    const {id} = useParams()

    const verifyingHandler = id =>{
        axios.get(`http://localhost:5000/updateverifying/${id}`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => alert(res.data)) 
        console.log(id)
        
    }

    const fileHandler = (e) =>{
        // console.log(e);
        console.log(e.target.files);
        // this.setState({selectedFiles:e.target.files})
        setSelectedfiles(e.target.files)
       }

    const submitHandler = e=>{
        e.preventDefault();
        if(report){

            if(selectedFiles.length>=1)
            {
                for(let i=0;i<selectedFiles.length;i++){
                    let formData = new FormData()
                    formData.append('file',selectedFiles[i]);
                    formData.append('upload_preset','bvfppdbk');
                    axios.post('https://api.cloudinary.com/v1_1/drnndbow7/image/upload',formData).then(res =>{
                      
                      axios.put(`http://localhost:5000/updateverified/${id}`,{report:report,pic:res.data.url},{
                        headers : {
                            'x-token' : localStorage.getItem('token')
                        }
                        }).then(res =>{ console.log(res.data) ;
                                        alert("Successfully response submitted");
                      
                    })
                })    
                }
            }
            else{
                axios.put(`http://localhost:5000/updateverified2/${id}`,{report:report},{
                    headers : {
                        'x-token' : localStorage.getItem('token')
                    }
                    }).then(res => alert(res.data)) 
            }
            
        }
        else{
            alert("Please Enter some report info");
        }
        setReport('')
        
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/getspecificconcern/${id}`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setSpconcern(res.data)) 

        axios.get('http://localhost:5000/adminprofile',{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => {
            if(res.data.concerndepartment === "higher authority" | res.data.concerndepartment === "Re-contacted"){
                setY("1")
            }
        })
    },[id])
  return (
  <div className='con2'>
        <Header2 />
        
        { spconcern &&
        <div>
        <center>
            <br /><br />
        <h1 style={{color:"yellowgreen",textAlign:"center"}}>STUDENT CONCERN</h1>     
                    
                    

        <div className='container card profile ' style={{marginTop:"20px",background: "rgba(255,255,255,0.9)"}}>         
            

            <div className="flex-container" >
                    <div className='flex-item-left2'>
                        <h4>Student Name :  </h4>
                        <h4>CollegeId :  </h4>
                        <h4>Branch :  </h4>
                        <h4>Mobile :  </h4>
                        <h4>Date : </h4>
                        <h4>Concern Department : </h4>
                        <h4>Complainee Info : </h4>
                        <h4>My concern Info : </h4>      
                    </div>
                    <div className='flex-item-right2'>
                            <h4>{spconcern.fullname} </h4>
                            <h4>{spconcern.collegeId} </h4>
                            <h4>{spconcern.branch} </h4>
                            <h4>{spconcern.mobile} </h4>
                            <h4>{spconcern.date.slice(0,10)} </h4>
                            <h4>{spconcern.concerndepartment} </h4>
                            <h4>{spconcern.HarassedPersonDetails}</h4>
                            <h4>{spconcern.concern}</h4>
                    </div>
            </div>


        { y === "1" ?
            
            <div>
                <p><b>Status : </b></p>
                    {spconcern.verifying ? (spconcern.verified ? <div>
                                                                    
                                                                    <h4 className='three'>Verified</h4>
                                                                    {spconcern.report && <div><h4 ><b style={{color:"red"}}>Report : </b>{spconcern.report}</h4></div>}
                                                                    {spconcern.pic ? <div><img 
                                                                        className="round-img"
                                                                        src={spconcern.pic}
                                                                        height="50%" width="50%"
                                                                        alt="user photo"
                                                                    /><br /><br /></div>:<h5 style={{color:"red"}}>No Pic uploaded</h5>}
                                                                </div> 
                                                                : 
                                                                <div>
                                                                    
                                                                    <h4 className='three'>verifying</h4>
                                                                </div>
                                            ) 
                                            :  
                                            <div>
                                                
                                                <h4 className='three'>Under processing</h4>
                                            </div>
                    }
            </div>
            :
            <div>
                <p><b>Status : </b></p>
            {spconcern.verifying ? 
                                                (spconcern.verified ? 
                                                                    <div>
                                                                    <h4 style={{color:"green"}}>Verified</h4>
                                                                    {spconcern.report && <h4><b style={{color:"red"}}>Report : </b>{spconcern.report}</h4>}
                                                                    {spconcern.pic ? <div><img 
                                                                        className="round-img"
                                                                        src={spconcern.pic}
                                                                        height="60%" width="90%"
                                                                        alt="user photo"
                                                                    /><br /><br /></div>:<h5 style={{color:"red"}}>No Pic uploaded</h5>}
                                                                    </div>
                                                                    : 
                                                                    <div>
                                                                        <h4 style={{color:"#48CAE4"}}>verifying</h4> <br /><br /> 
                                                                        <h4><b style={{color:"red"}}>Report : </b></h4>
                                                                        <form onSubmit={submitHandler} autoComplete="off">
                                                                            <input type="text" name="report" value={report} placeholder='Report' onChange={e => setReport(e.target.value)} /><br /><br />
                                                                            <input type="file"  className="inputfile" onChange={fileHandler} /><br />
                                                                            <input type="submit" className='btn btn-success' value="Verified" />
                                                                        </form>
                                                                        <br />
                                                                        </div>)
                                                  : 
                                                <div>
                                                      <h4 style={{color:"#48CAE4"}}>under processing</h4> &nbsp;&nbsp;&nbsp; 
                                                      <button className='btn btn-success' onClick={() => verifyingHandler(spconcern._id)}>verifying</button>
                                                </div>
                            }
            </div>
        }
            
               
        </div>
        <br /><br /><br /><br /><br /><br /><br /><br />
        </center>
        </div>
       }

  </div>
  )
}

export default Indcompliment2;
