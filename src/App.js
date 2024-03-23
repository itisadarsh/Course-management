import './App.css';

import {Routes,Route} from "react-router-dom";
import StudDashboard from "./components/StudDashBoard";

import Main from "./components/Main";
import Home from "./components/Home";

function App() {


  return (
    <div className="App bg-black w-screen min-h-screen max-h-* pt-5">


      <Routes>
      <Route path='/' element={<Main/>}>
      <Route path='/addcourse' element={<StudDashboard/>} ></Route>
      <Route index element={<Home/>} ></Route>
      </Route>
       </Routes>
      
   
    </div>
  );
}

export default App;
