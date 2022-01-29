import React,{useEffect, useState} from 'react';
import "./Video.css"
import Videofile from "./road.mp4"
import Header from './Header';
import { useParams,Navigate } from 'react-router-dom';
import axios from 'axios';
import "./Myprofile.css"
import "./Ind.css"

const Indcompliment = () => {
    const [spconcern,setSpconcern] = useState(null)
    const {id} = useParams()

    useEffect(()=>{
        axios.get(`http://localhost:5000/getspecificconcern/${id}`,{
            headers : {
                'x-token' : localStorage.getItem('token')
            }
        }).then(res => setSpconcern(res.data)) 
    },[id])

    if(!localStorage.getItem('token')){
        return <Navigate to='/login' />
    }

  return (
  <div className='con2'>
        <Header />
        
        { spconcern &&
        <div>
        <center>
            <br /><br />
            <h2 style={{color:"yellowgreen",textAlign:"center"}}>My Concern : </h2>
        <div className='container card bg-light profile ' style={{marginTop:"20px"}}>         
            

            <div className="flex-container" >
                    <div className='flex-item-left2'>
                        <h4>Student Name :  </h4>
                        <h4>Date : </h4>
                        <h4>Concern Department : </h4>
                        <h4>Complainee Info : </h4>
                        <h4>My concern Info : </h4>      
                    </div>
                    <div className='flex-item-right2'>
                            <h4>{spconcern.fullname} </h4>
                            <h4>{spconcern.date.slice(0,10)} </h4>
                            <h4>{spconcern.concerndepartment} </h4>
                            <h4>{spconcern.HarassedPersonDetails}</h4>
                            <h4>{spconcern.concern}</h4>
                    </div>
            </div>
            <br />
            
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
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        </center>
        </div>
       }

  </div>
  )
}

export default Indcompliment;
