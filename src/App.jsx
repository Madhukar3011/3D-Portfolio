import Home from "./components/Home"




const App = () => {
  return (
    <div>
        <div className="navbar fixed flex items-center justify-between z-[5] top-0 left-0 h-[8vh] w-full px-[3vw] ">
          <div className="name">
           <h1 className=" text-[2rem] uppercase"> Madhukar Yadav</h1>
          </div>
          <div className="aboutLink"></div>
        </div>
         <Home/> 
    </div>
  )
}

export default App