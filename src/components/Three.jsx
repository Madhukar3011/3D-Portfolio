import {Canvas} from '@react-three/fiber'
import Experience from './Experience'
import { OrbitControls } from '@react-three/drei'
Experience

const Three = () => {
  return (
    <div className=' h-screen w-full'>
        <Canvas >
          {/* <OrbitControls /> */}
            <Experience/>
        </Canvas>
    </div>
  )
}

export default Three