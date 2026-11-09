import { Routes, Route ,Link} from "react-router-dom"
import Home from "./components/Home.jsx"
import About from './components/About.jsx'
import ProjectDetail from './components/ProjectDetail.jsx'



const App = () => {
  return (
    <>
        <div className="navbar fixed flex items-center justify-between z-[100] top-0 left-0 h-[8vh] w-full px-[3vw] ">
          <div className="name">
            <Link to='/'>
            <h3 className=" text-[2.1rem] font-[500] uppercase "> Madhukar Yadav</h3>
            </Link>
           
          </div>
          <div className="aboutLink">
            <Link to='about'>
            <h3 className=" text-[2.1rem] font-[600] cursor-pointer uppercase "> About</h3>
            </Link>
            
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home/> }/>
          <Route path="/about" element={<About/> }/>
          <Route path="/Project/:id" element={<ProjectDetail/> }/>
        </Routes>
         <div className="footer relative z-[100] px-[3vh] flex items-center justify-between h-[10vh] w-full ">
              <div className="copyright text-[1.7rem] uppercase font-[400]">&copy; 2026 Madhukar Yadav</div>
              <div className="contactInfo flex items-center justify-between w-[45%] h-full  ">
                <div className="socials">
                  <h3 className="text-[1.5rem] leading-[1.17] font-[500]">Instagram</h3>
                  <h3 className="text-[1.5rem] leading-[1.17] font-[500]">LinkedIn</h3>
                  <h3 className="text-[1.5rem] leading-[1.17] font-[500]">GitHub</h3>
                  <h3 className="text-[1.5rem] leading-[1.17] font-[500]">Awwwards</h3>
                </div>
                <div className="email">
                  <h3 className="text-[1.7rem] font-[450]">Any Project ? or Collabration ?</h3> 
                  <h4  className="text-[1.8rem] font-[600]">astrodeepak143@gmail.com</h4>
                </div>
              </div>
         </div>
    </>
  )
}

export default App