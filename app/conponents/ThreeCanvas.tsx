"use client";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useRef, Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const Model = (params: { id: number }) => {
  const gltf = useLoader(GLTFLoader, "/" + params.id + ".glb");

  const meshRef = useRef<any>();
  // Set up state for the hovered and active state
  // const [hover, setHover] = useState(false);

  useFrame((state, delta) => {
    // if (!hover) {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta / 10;
    }
    // }
  });

  return (
    <>
      <primitive
        ref={meshRef}
        object={gltf.scene}
        scale={2}
        position={[0, -2, 0]}
        // onPointerOver={() => setHover(true)}
        // onPointerOut={() => setHover(false)}
      />
    </>
  );
};

export function ThreeCanvas({ id }: any) {
  return (
    <Canvas className="rounded-lg">
      {/* <Box></Box> */}
      <Model id={id} />
      <OrbitControls />
      {/* <OrbitControls minDistance={3} maxDistance={4} /> */}
      {/* <Environment preset="sunset" background /> */}
      <Suspense fallback={null}>
        <Environment path="cube" />
      </Suspense>
      <color args={["#e2e8f0"]} attach="background" />

      <ambientLight intensity={0.1} />
      <directionalLight position={[0, 0, 5]} color="white" />
    </Canvas>
  );
}
