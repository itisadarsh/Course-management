// import { NavLink } from "react-router-dom";
import {useNavigate} from "react-router-dom"

const NavBar=(props)=>{
    const navigate=useNavigate();

    return(
        <div className=" w-[85%] mx-auto  h-[10%] flex justify-between px-2 items-center">

        <div className="h-full flex flex-col items-baseline gap-2 text-left text-white">
            <p className="font-bold">Employees</p>
            <p className="text-sm">This is a list of all Courses. You can add new Courses, edit or delete existing ones. </p>
        </div>
            <button className=" bg-violet-400 rounded-lg font-bold text-sm text-white p-1 px-2" onClick={()=>{navigate("/addcourse")}}>Add Employee</button>
        </div>
    );

}

export default NavBar;