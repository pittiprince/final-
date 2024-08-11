import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const globeRef = useRef();

  // Rotate the globe
  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002; // Adjust the speed as needed
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        map={new THREE.TextureLoader().load('/path-to-your-earth-texture.jpg')}
        normalMap={new THREE.TextureLoader().load('/path-to-your-normal-map.jpg')}
      />
    </mesh>
  );
};

const RotatingGlobe = () => (
  <Canvas>
    <ambientLight intensity={0.5} />
    <pointLight position={[10, 10, 10]} />
    <Globe />
    <OrbitControls enableZoom={false} />
    <Stars />
  </Canvas>
);

export default RotatingGlobe;
