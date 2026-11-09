import {Canvas} from '@react-three/fiber'
import Experience from './Experience'
import { OrbitControls } from '@react-three/drei'
Experience

const Three = () => {
  return (
    <div className=' fixed pointer-events-none top-0 left-0 z-[60] h-screen w-full'>
        <Canvas >
          {/* <OrbitControls /> */}
            <Experience/>
        </Canvas>
    </div>
  )
}

export default Three