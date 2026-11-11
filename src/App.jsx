import { Routes, Route ,Link} from "react-router-dom"
import Home from "./components/Home.jsx"
import About from './components/About.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'
import NotFound from "./components/NotFound.jsx";


const App = () => {
  return (
    <>
        <div className="navbar fixed flex items-center bg-[#111110] justify-between z-[100] top-0 left-0 h-[8vh] w-full px-[3vw] ">
          <div className="name">
            <Link to='/'>
            <h3 className=" text-[2.1rem] text-red-600 font-[500] uppercase "> Madhukar Yadav</h3>
            </Link>
           
          </div>
          <div className="aboutLink">
            <Link to='about'>
            <h3 className=" text-[2.1rem] text-red-600 font-[600] cursor-pointer uppercase "> About</h3>
            </Link>
            
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home/> }/>
          <Route path="/about" element={<About/> }/>
          <Route path="/Project/:id" element={<ProjectDetail/> }/>
           <Route path="*" element={<NotFound />} />
        </Routes>
         
    </>
  )
}

export default App