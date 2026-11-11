import Landing from './Landing.jsx'
import Three from './Three.jsx'

const Home = () => {
  return (
    <>
    <Three/>
    <Landing />
    <div className="footer relative z-[100] px-[3vh] flex items-center justify-between h-[10vh] w-full ">
              <div className="copyright text-[1.7rem] text-white uppercase font-[400]">&copy; 2026 Madhukar Yadav</div>
              <div className="contactInfo flex items-center justify-between w-[45%] h-full  ">
                <div className="socials">
                  <h3 className="text-[1.5rem] text-white leading-[1.17] font-[500]">Instagram</h3>
                  <h3 className="text-[1.5rem] text-white leading-[1.17] font-[500]">LinkedIn</h3>
                  <h3 className="text-[1.5rem] text-white leading-[1.17] font-[500]">GitHub</h3>
                  <h3 className="text-[1.5rem] text-white leading-[1.17] font-[500]">Awwwards</h3>
                </div>
                <div className="email">
                  <h3 className="text-[1.7rem] text-white font-[450]">Any Project ? or Collabration ?</h3> 
                  <h4  className="text-[1.8rem] text-white font-[600]">astrodeepak143@gmail.com</h4>
                </div>
              </div>
         </div>
    </>
  )
}

export default Home