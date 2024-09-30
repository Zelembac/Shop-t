'use client'
import { Canvas,useFrame } from "@react-three/fiber";
import { useState,useRef } from "react";


function Box(props) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (meshRef.current.rotation.y += delta))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
    
      ref={meshRef}
      scale={active ? 4 : 2}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
  }
  


export function ThreeCanvas() {
  
  
  return (
    <div className="flex  items-center justify-items-center h-full w-full self-center">
 
    <Canvas>
      <Box></Box>
      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="white" />
    </Canvas>
    </div>
  );
}
