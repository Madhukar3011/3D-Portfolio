

const About = () => {
  return (
    <div className='h-[90vh] flex flex-col justify-between px-[3vw] pt-[8vh] pb-[5vh] w-full'> 
    <div className="info">
      <div className="description pt-[2vw] w-[75%]">
        <h2 className="text-[1.6rem] font-[400] text-balance ">
          I'm Madhukar Yadav, a creative developer and designer focused on
          building immersive digital experiences. I blend design and code to 
          craft visually striking websites, interactive animations, and
          dynamic 3D environments. My work explores motion, WebGL, and 
          Three.js to push beyond traditional web boundaries, turning ideas
          into engaging, high-performance experiences that feel alive and intuitive. 
        </h2>
      </div>
      <div className="contacts mt-[1.45vw]">
            <h3 className="text-[1.2vw] uppercase font-[600]">Contacts</h3>
            <h3 className="text-[1.2vw]">astrodeepak@gmail.com</h3>
            <h3 className="text-[1.2vw]">91+ 8881089205</h3>
      </div>
    </div>
    <div className="image">
    <div className="imageDiv  h-[18vw] w-[13vw] ">
      <img className="h-full  w-full object-cover rounded-2xl" src="my photo 2.png" alt="" />
    </div>
    </div>
    </div>
  )
}

export default About