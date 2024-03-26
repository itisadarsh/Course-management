
import NavBar from "./NavBar"

import axios from "axios";
import {useEffect,useState} from "react";

const Home=()=>{

    const [studdetail,setstuddetail]=useState([]);
    const [detail,setdetail]=useState(false);

    const [credit,setCredit]=useState(0);
    const [isSearched,setSearched]=useState(false);
    const [credited,setcredited]=useState(false);

    async function fetchData(){
      
        const data=await axios.get(`${process.env.REACT_APP_BASE_URL}/list`);

         setstuddetail(data.data);
        console.log(studdetail);
        setdetail(true)
        
    }

    useEffect(() => {
        fetchData();
     
    },[], [isSearched])
    

    return(
        <div>
    <NavBar/>
    <table className="text-white border text-left  rounded-md overflow-hidden w-[80%] mx-auto mt-8">
    <thead>
        <tr className=" bg-slate-800 space-y-3 border-separate py-4 ">
            <th>Course</th>
            <th>TutorialHours</th>
            <th>LectureHours</th>
            <th>PracticalHours</th>
            <th>Credit</th>

        </tr>
        </thead>
        {detail &&
            <tbody>{
              credited?
           
               studdetail.filter((data)=> data.credits===Number.parseInt(credit) ).map((data)=>(
                    <tr className=" border-b-[1px] border-slate-600">
                   { console.log(credit)}
                        <td><div>{data.crsname}</div></td>
                        <td>{data.tuthrs}</td>
                        <td>{data.lechrs}</td>
                        <td>{data.prachrs}</td>
                        <td>{data.credits}</td>
                    </tr>
                    
                ))
                
                : studdetail.map((data)=>(
                    <tr className=" border-b-[1px] border-slate-600">
                        <td><div>{data.crsname}</div></td>
                        <td>{data.tuthrs}</td>
                        <td>{data.lechrs}</td>
                        <td>{data.prachrs}</td>
                        <td>{data.credits}</td>
                    </tr>
                    
                ))
             } </tbody>
            
    
           }
    </table>
           <br />

        {isSearched && <div  className="absolute h-40 w-40 right-[50%] top-[30%]  bg-violet-500 rounded-md overflow-hidden  transition antialiased" >
                  <div className=" relative w-full h-full ">
                    <button className="font-bold bg-red-400  pl-2 absolute top-0 right-0 p-1" onClick={()=>{setSearched(false)}}>X</button>
          <br /> <label htmlFor="">Enter the credits</label>
          <input type="number" name="credit" className="  " value={credit} onChange={(event)=>{setCredit(event.target.value); console.log(event.target.value)}} /><br /><br />
          <button className="font-bold bg-green-300 text-white px-5 rounded-md" onClick={()=>{setcredited(true);setSearched(false); }}>Ok</button>

       </div> 
       </div>
        }


    
        
    <button className=" bg-violet-400 rounded-lg font-bold text-sm text-white p-1 px-2" 
    onClick={()=>{setSearched(true)}}>Search By Credits</button>
    <button className=" bg-violet-400 rounded-lg font-bold text-sm text-white p-1 px-2 ml-5" 
    onClick={()=>{setcredited(false)}}>Clear Filters</button>
    </div>);
}

export default Home;
