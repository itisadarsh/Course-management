import emp from "../Images/emp.jpg"
import { FaBackward } from "react-icons/fa6";
import {useNavigate} from "react-router-dom"
import {useState} from "react"
import axios from "axios"
import React from "react";

const StudDashboard=()=>{
    const navigate=useNavigate();

    const[formdata,setformdata]=useState({crsname:"",crscode:"",lechrs:"",tuthrs:"",prachrs:"",credits:""});

    function accumulate(event){
        const{name,value}=event.target;
        setformdata(prev=>{return{

           
               ...prev,[name]:name==="credits"?Number.parseInt(value):value
            
        
            }
            
         });
    }

   async function submitHandler(event){
        event.preventDefault();
        console.log(formdata);
        const response=await axios.post(
            `${process.env.REACT_APP_BASE_URL}/postcourses`,JSON.stringify(formdata)).then(()=>{

        }).catch((err)=>{
            console.log(err);
        })
    }

    return(
        <div className="flex ">
            <div className="w-[50%] relative">
                <div className="bg-gradient-to-t from-black  z-20 h-full absolute w-full text-white font-extrabold text-3xl flex align-bottom justify-end flex-col pb-9">Empower your Studies with our latest course creation</div>
                <img src={emp} alt="" className="relative z-10 h-[90%]"  />
            </div>
            <div className="w-[50%] ">
                <div className="flex flex-col text-white w-[40%] mx-auto text-left gap-5">
                <div>
                 <h1 className="text-2xl font-bold">Create a Course</h1>
                 <div className="text-violet-500 brightness-100 flex items-center relative cursor-pointer" onClick={()=>{navigate("/")}} ><FaBackward className="mr-2"/>   Go Back to Course List</div>
                 </div>

                 <form action="post" className="flex flex-col gap-2" onSubmit={submitHandler}>
                   <label htmlFor="crsname" className="font-bold">Course Name</label>
                   <input type="text" name="crsname" className=" bg-slate-700 p-1 rounded-lg w-full" placeholder="Enter Course Name" onChange={accumulate} value={formdata.crsname}/>
                  
                   <label htmlFor="crscode" className="font-bold">Course Code</label>
                   <input type="text" name="crscode" className=" bg-slate-700 p-1 rounded-lg" placeholder="Enter Course code" onChange={accumulate} value={formdata.crscode}/>
                   
                   <label htmlFor="lechrs" className="font-bold">Lecture Hours</label>
                   <input type="number" name="lechrs" className=" bg-slate-700 p-1 rounded-lg" placeholder="Enter hours" onChange={accumulate} value={formdata.lechrs}/>
                   
                   <label htmlFor="tuthrs" className="font-bold">Tutorial Hours</label>
                   <input type="number" name="tuthrs" className=" bg-slate-700 p-1 rounded-lg" placeholder="Enter hours" onChange={accumulate} value={formdata.tuthrs}/>
                   
                   <label htmlFor="prachrs" className="font-bold">Practical Hours</label>
                   <input type="number" name="prachrs" className=" bg-slate-700 p-1 rounded-lg" placeholder="Enter hours" onChange={accumulate} value={formdata.prachrs}/>
                   
                   <label htmlFor="credits" className="font-bold">Credits</label>
                   <input type="number" name="credits" className=" bg-slate-700 p-1 rounded-lg" placeholder="Enter Credits" onChange={accumulate} value={formdata.credits}/>
                
                    <button className="bg-violet-400 rounded-lg  p-1 mt-4">Create Course</button>
                 </form>
                </div>
            </div>
        </div>
    );
}

export default StudDashboard;