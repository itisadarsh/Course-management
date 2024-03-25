import emp from "../Images/emp.jpg"
import { FaBackward } from "react-icons/fa6";
import {useNavigate} from "react-router-dom"
import {useState} from "react"
import axios from "axios"
import React from "react";

const StudDashboard=()=>{
    const navigate=useNavigate();

    const[formdata,setformdata]=useState({name:"",email:"",title:"",dept:"",role:""});

    function accumulate(event){
        const{name,value}=event.target;
        setformdata(prev=>{return{
               ...prev,[name]:value
            }
            
         });
    }

   async function submitHandler(event){
        event.preventDefault();
            console.log(`${process.env.REACT_APP_BASE_URL}/list`)
        const response=await axios.get(
            `${process.env.REACT_APP_BASE_URL}/list`,formdata).then(()=>{

        }).catch((err)=>{
            console.log(err);
        })
        console.log(response);


    }

    return(
        <div className="flex ">
            <div className="w-[50%] relative">
                <div className="bg-gradient-to-t from-black  z-20 h-full absolute w-full text-white font-extrabold text-3xl flex align-bottom justify-end flex-col pb-9">Empower your business with our employee creation</div>
                <img src={emp} alt="" className="relative z-10 h-[90%]"  />
            </div>
            <div className="w-[50%] ">
                <div className="flex flex-col text-white w-[40%] mx-auto text-left gap-5">
                <div>
                 <h1 className="text-2xl font-bold">Create a Employee</h1>
                 <div className="text-violet-500 brightness-100 flex items-center relative cursor-pointer" onClick={()=>{navigate("/")}} ><FaBackward className="mr-2"/>   Go Back to Employee List</div>
                 </div>

                 <form action="post" className="flex flex-col gap-2" onSubmit={submitHandler}>
                   <label htmlFor="name" className="font-bold">Employee Name</label>
                   <input type="text" name="name" className=" bg-slate-700 p-1 rounded-lg w-full" placeholder="Enter Your Name" onChange={accumulate} value={formdata.name}/>
                  
                   <label htmlFor="email" className="font-bold">Employee Email Id</label>
                   <input type="email" name="email" className=" bg-slate-700 p-1 rounded-lg" placeholder="Enter Your Name" onChange={accumulate} value={formdata.email}/>
                   
                   <label htmlFor="title" className="font-bold">Employee Title</label>
                   <input type="text" name="title" className=" bg-slate-700 p-1 rounded-lg" placeholder="Enter Your Name" onChange={accumulate} value={formdata.title}/>
                   
                   <label htmlFor="dept" className="font-bold">Employee Department</label>
                   <input type="text" name="dept" className=" bg-slate-700 p-1 rounded-lg" placeholder="Enter Your Name" onChange={accumulate} value={formdata.dept}/>
                   
                   <label htmlFor="role" className="font-bold">Employee Role</label>
                   <input type="text" name="role" className=" bg-slate-700 p-1 rounded-lg" placeholder="Enter Your Name" onChange={accumulate} value={formdata.role}/>
                
                    <button className="bg-violet-400 rounded-lg  p-1 mt-4">Create Employee</button>
                 </form>
                </div>
            </div>
        </div>
    );
}

export default StudDashboard;