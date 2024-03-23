
import NavBar from "./NavBar"

import axios from "axios";
import {useEffect,useState} from "react";

const Home=()=>{

    const [studdetail,setstuddetail]=useState([]);
    const [detail,setdetail]=useState(false);

    async function fetchData(){
        const data=await axios.get(`${process.env.REACT_APP_BASE_URL}/getemp`);
        console.log(data.data.data);
         setstuddetail(data.data.data);
        console.log(studdetail);
        setdetail(true)
        
    }

    useEffect(() => {
        fetchData();
     
    }, [])
    

    return(
        <div>
    <NavBar/>
    <table className="text-white border text-left  rounded-md overflow-hidden w-[80%] mx-auto mt-8">
    <thead>
        <tr className=" bg-slate-800 space-y-3 border-separate py-4 ">
            <th>Course</th>
            <th>Title</th>
            <th>TaughtBy</th>

        </tr>
        </thead>
        {detail &&
            <tbody>{
                studdetail.map((data)=>(
                    <tr className=" border-b-[1px] border-slate-600">
                        <td><div>{data.name}</div><div>{data.email}</div></td>
                        <td>{data.title}</td>
                        <td>{data.role}</td>
                    </tr>
                    
                ))
             } </tbody>
            
    
           }
    </table>
    </div>);
}

export default Home;
