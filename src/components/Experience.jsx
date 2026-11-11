import * as THREE from 'three'
import {useScroll, useTexture} from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import fragmentShader from '../shaders/fragment.glsl';
import vertexShader from '../shaders/vertex.glsl';
import { useGSAP} from '@gsap/react'
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';

import  {projects}  from "./Project.jsx";

const IMAGE_URL = projects.map((project) => project.image);

// const IMAGE_URL = [
//   "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=90",
//   "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=90",
//   "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=2000&q=90",
//   "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2000&q=90",
//   "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2000&q=90",
//   "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=2000&q=90",
// ];

const CARD_H = 1.1;
const CARD_W = 2;
const RADIUS = 3;
const TOTAL_CARD = IMAGE_URL.length;
const LERP_RATIO = 0.05;

const Card = ({index,texture,scrollSpeedRef }) => {

      const angle = (index / TOTAL_CARD) * 2 * Math.PI;

      const position = useMemo(() => {
        const x = RADIUS * Math.sin(angle);
        const z = RADIUS * Math.cos(angle);

        return [x, 0, z];
      });

      const uniforms = {
        uTexture: { value: texture },
        uScrollSpeed: { value: 0 }, 
      };

      const materialRef = useRef(null);
      
      useFrame(()=> {
          if(!materialRef.current) return;

          materialRef.current.uniforms.uScrollSpeed.value = scrollSpeedRef.current;
      })

    const navigate =  useNavigate();

      const handleClick = () =>{
        navigate(`/project/${index}`)
      }

  return (
    < mesh 
      onPointerEnter={()=> (document.body.style.cursor = "pointer")}
      onPointerLeave={()=> (document.body.style.cursor = "default")}
      onClick={() => handleClick(index)} 
      position={position} 
      rotation = {[0, angle, 0]} >
      <planeGeometry args={[CARD_W, CARD_H, 32, 32]}/>
      <shaderMaterial 
      ref={materialRef}
      side={THREE.DoubleSide} 
      uniforms={uniforms}
      vertexShader={vertexShader} 
      fragmentShader={fragmentShader} />
    </mesh>
  )
}


const Experience = () => {
    
    const textures = useTexture(IMAGE_URL);

    const groupRef = useRef(null);

    const currentRotationRef = useRef(0);
    const targetRotationRef = useRef(0);

    const scrollSpeedRef = useRef(0);
    const targetScrollSpeedRef = useRef(0);

    const mouseMouseRef = useRef({x: 0, y: 0});
    const targetMouseRef = useRef({x: 0, y: 0});

    const {gl} = useThree();
    
    useEffect(() => {
      const canvas = gl.domElement;

      const handleScroll = (e) => {
        e.preventDefault();
        targetRotationRef.current += e.deltaY * 0.003;
        targetScrollSpeedRef.current += e.deltaY * 0.003;
      }
      canvas.addEventListener('wheel', handleScroll, {passive: false});

      return () => {
        canvas.removeEventListener('wheel', handleScroll)
      }
    },[gl]);

    useEffect(()=> {
      window.addEventListener('mousemove', (e)=> {
        targetMouseRef.current.x = (e.clientX / window.innerWidth -0.5) * 2;
        targetMouseRef.current.y = (e.clientY / window.innerHeight -0.5) * 2;
      })
    });

    useGSAP(()=> {
      gsap.to(mouseMouseRef.current,{
        x: targetMouseRef.current.x * 0.05,
        y: targetMouseRef.current.y * 0.05,
        duration: 0.6,
        ease: 'power2.out'
      })
    })

    useFrame(()=> {
      if(!groupRef.current) return;

      currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * LERP_RATIO;
      scrollSpeedRef.current += (targetScrollSpeedRef.current - scrollSpeedRef.current) * LERP_RATIO;

      groupRef.current.rotation.y = currentRotationRef.current;

    groupRef.current.rotation.x += (-targetMouseRef.current.x * 0.3 - groupRef.current.rotation.x) * 0.5;
    groupRef.current.rotation.z += (targetMouseRef.current.y * 0.3 - groupRef.current.rotation.z) * 0.3;

      targetScrollSpeedRef.current *= 0.8;
    })

    useMemo(() => {
        textures.forEach((tex) => {
            tex.minFilter = THREE.LinearFilter;
            tex.magFilter = THREE.LinearFilter;
            tex.colorSpace = THREE.SRGBColorSpace;
        })
    },[textures])

  return (
    <>
    <group ref={groupRef}>
      {textures.map((texture, key) => {
          return <Card scrollSpeedRef={scrollSpeedRef} index={key} texture = {texture} /> ;
      })}
    </group>
    </>
  )
}

export default Experience