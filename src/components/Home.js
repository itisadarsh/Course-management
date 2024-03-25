
import NavBar from "./NavBar"

import axios from "axios";
import {useEffect,useState} from "react";

const Home=()=>{

    const [studdetail,setstuddetail]=useState([]);
    const [detail,setdetail]=useState(false);

    async function fetchData(){
        console.log("hi");
        // console.log(`https://cors-anywhere.herokuapp.com/${process.env.REACT_APP_BASE_URL}/list`);
        // const data=await axios.get(`${process.env.REACT_APP_BASE_URL}/list`);
        // console.log(data);



       const d=await fetch(`${process.env.REACT_APP_BASE_URL}/list`, {
            // method: ['GET','POST'],
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': 'http://127.0.0.1:9796',
            },
            
          })
          .then(response => {
            console.log('Response:', response);
          })
          .catch(error => {
            console.error('Error:', error);
          });
          console.log(d);


       
        //  setstuddetail(data.data.data);
        // console.log(studdetail);
        // setdetail(true)
        
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
