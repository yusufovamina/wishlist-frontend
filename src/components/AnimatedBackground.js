import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

const colors = ["#c572f2", "#cf84ca", "#9484cf", "#6986d6", "#a125fa"];

const Ball = ({ position, color, velocity }) => {
  const meshRef = useRef();
  const [direction, setDirection] = useState(velocity);

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.position.x += direction[0];
    meshRef.current.position.y += direction[1];
    meshRef.current.position.z += direction[2];

    const boundsX = 8;
    const boundsY = 5;
    const boundsZ = 4;

    if (meshRef.current.position.x > boundsX || meshRef.current.position.x < -boundsX)
      setDirection(([x, y, z]) => [-x, y, z]);
    if (meshRef.current.position.y > boundsY || meshRef.current.position.y < -boundsY)
      setDirection(([x, y, z]) => [x, -y, z]);
    if (meshRef.current.position.z > boundsZ || meshRef.current.position.z < -boundsZ)
      setDirection(([x, y, z]) => [x, y, -z]);
  });

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <Sphere args={[1.5, 32, 32]}>
        <meshStandardMaterial
          color={color}
          roughness={0.5}
          metalness={0.6}
          transparent
          opacity={0.9}
        />
      </Sphere>
    </mesh>
  );
};

const BlurOverlay = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        zIndex: 0,
      }}
    />
  );
};

const BackgroundGradient = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #e6d4ff, #f4c2ff, #d1a3ff)",
        zIndex: -2,
      }}
    />
  );
};

const AnimatedBackground = () => {
  const balls = new Array(12).fill().map(() => ({
    position: [
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 8,
    ],
    color: colors[Math.floor(Math.random() * colors.length)],
    velocity: [
      (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.05,
      (Math.random() - 0.5) * 0.05,
    ],
  }));

  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: -1 }}>
      <BackgroundGradient />
      <Canvas
        shadows
        camera={{ position: [0, 0, 12], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
        <pointLight position={[-5, -5, -5]} intensity={0.8} />

        <Environment preset="sunset" />

        {balls.map((ball, index) => (
          <Ball key={index} {...ball} />
        ))}

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
      <BlurOverlay />
    </div>
  );
};

export default AnimatedBackground;
