"use client";

import React, { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sparkles, useTexture } from "@react-three/drei";
import { WebGLBoundary, useInView, usePrefersReducedMotion } from "@/components/three/utils";

// Production-themed stock photos (Unsplash, stored locally in /public/hero), distinct from the portfolio images:
// clapperboard, film projector, camera and lenses, editing timeline, recording studio,
// cinema camera, cinema seats, cinema audience.
const PANEL_IMAGES = Array.from({ length: 8 }, (_, i) => `/hero/ring-${i + 1}.jpg`);

const RADIUS = 3.1;
const PANEL_HEIGHT = 1.35;
const GAP = 0.18; // fraction of each slot left empty between panels

/** One curved image panel: a slice of an open cylinder, so it bends around the ring. */
function Panel({ texture, index, count }: { texture: THREE.Texture; index: number; count: number }) {
  const slot = (Math.PI * 2) / count;
  const thetaLength = slot * (1 - GAP);
  const thetaStart = index * slot;

  const map = useMemo(() => {
    // Square source images on a wider panel: show full width, centre-crop the height.
    const t = texture.clone();
    const panelAspect = (RADIUS * thetaLength) / PANEL_HEIGHT;
    const img = texture.image as { width: number; height: number } | undefined;
    const imgAspect = img ? img.width / img.height : 1;
    t.repeat.set(1, imgAspect / panelAspect);
    t.offset.set(0, (1 - t.repeat.y) / 2);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 8;
    t.needsUpdate = true;
    return t;
  }, [texture, thetaLength]);

  return (
    <mesh>
      <cylinderGeometry args={[RADIUS, RADIUS, PANEL_HEIGHT, 32, 1, true, thetaStart, thetaLength]} />
      <meshBasicMaterial map={map} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

function Carousel({ reduced }: { reduced: boolean }) {
  const ring = useRef<THREE.Group>(null);
  const textures = useTexture(PANEL_IMAGES);
  const lastScroll = useRef(0);
  const boost = useRef(0);

  useEffect(() => {
    lastScroll.current = window.scrollY;
  }, []);

  useFrame((_, delta) => {
    if (!ring.current) return;
    // Scrolling the page spins the ring faster, then it eases back to its idle speed.
    const y = window.scrollY;
    boost.current += (y - lastScroll.current) * 0.0025;
    lastScroll.current = y;
    boost.current = THREE.MathUtils.damp(boost.current, 0, 3, delta);
    const idle = reduced ? 0 : 0.12;
    ring.current.rotation.y += delta * idle + boost.current * delta * 4;
  });

  return (
    <group ref={ring}>
      {textures.map((t, i) => (
        <Panel key={PANEL_IMAGES[i]} texture={t} index={i} count={PANEL_IMAGES.length} />
      ))}
    </group>
  );
}

/** Tilts the whole scene toward the pointer for a parallax feel. */
function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, 0.32 - pointer.y * 0.12, 3, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, 0.12 + pointer.x * 0.06, 3, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, pointer.x * 0.25, 3, delta);
  });

  return <group ref={group}>{children}</group>;
}

/** Pulls the camera back on narrow (portrait) canvases so the whole ring stays in frame. */
function ResponsiveCamera() {
  useFrame((state, delta) => {
    const w = state.size.width;
    const targetZ = w < 520 ? 15 : w < 760 ? 13 : 11.5;
    // Snap (no easing) so the ring never visibly changes size after load.
    const z = targetZ;
    state.camera.position.z = z;
    // Keep the fog band around the ring wherever the camera sits.
    if (state.scene.fog instanceof THREE.Fog) {
      state.scene.fog.near = z - 1.5;
      state.scene.fog.far = z + 4.5;
    }
  });
  return null;
}

export default function HeroScene() {
  const wrapper = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapper);
  const reduced = usePrefersReducedMotion();

  return (
    <div ref={wrapper} className="h-full w-full">
      <WebGLBoundary>
        <Canvas
          frameloop={inView ? "always" : "never"}
          dpr={[1, 1.75]}
          camera={{ position: [0, 1.4, 11.5], fov: 32 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ResponsiveCamera />
          <fog attach="fog" args={["#09090b", 10, 16]} />
          <ambientLight intensity={0.35} />
          <directionalLight position={[3, 5, 6]} intensity={2.2} />
          <pointLight position={[-4, -2, -3]} intensity={18} color="#e50914" />
          <pointLight position={[0, 0, 3]} intensity={6} color="#ffffff" />
          <Rig>
            <Suspense fallback={null}>
              <Carousel reduced={reduced} />
            </Suspense>
            <Sparkles count={40} scale={[9, 5, 9]} size={1.6} speed={reduced ? 0 : 0.25} color="#ffffff" opacity={0.35} />
          </Rig>
        </Canvas>
      </WebGLBoundary>
    </div>
  );
}
