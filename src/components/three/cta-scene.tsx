"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { WebGLBoundary, useInView, usePrefersReducedMotion } from "@/components/three/utils";

function Gem({ reduced }: { reduced: boolean }) {
  const outer = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    const speed = reduced ? 0 : 1;
    if (outer.current) {
      outer.current.rotation.y += delta * 0.25 * speed;
      outer.current.rotation.x = THREE.MathUtils.damp(outer.current.rotation.x, pointer.y * 0.5, 3, delta);
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.4 * speed;
      inner.current.rotation.z += delta * 0.2 * speed;
    }
  });

  return (
    <Float speed={reduced ? 0 : 2} floatIntensity={1.2} rotationIntensity={0.3}>
      <mesh ref={outer}>
        <icosahedronGeometry args={[1.6, 1]} />
        <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.95, 0]} />
        <meshStandardMaterial color="#ffffff" roughness={0.25} metalness={0.1} flatShading />
      </mesh>
    </Float>
  );
}

export default function CtaScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapper);
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={wrapper} className="h-full w-full">
      <WebGLBoundary>
        <Canvas frameloop={inView ? "always" : "never"} dpr={[1, 1.75]} camera={{ position: [0, 0, 5.5], fov: 40 }} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[2, 3, 4]} intensity={2.5} />
          <pointLight position={[-3, -2, 2]} intensity={12} color="#ff9a9a" />
          <Gem reduced={reduced} />
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}
