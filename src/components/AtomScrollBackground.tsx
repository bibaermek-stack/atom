import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

/** Full-page scroll progress 0 → 1 */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return progress;
}

function AtomModel({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/atom.glb');

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        // Keep original materials; slightly boost green if basic
        const mat = mesh.material;
        if (mat && !Array.isArray(mat)) {
          mat.side = THREE.DoubleSide;
          if ('transparent' in mat) {
            // leave as authored
          }
        }
      }
    });
    return clone;
  }, [scene]);

  const targetRotation = progress * Math.PI * 3;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetRotation,
      4,
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      0.2 + Math.sin(targetRotation) * 0.1,
      4,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={model} scale={1.4} />
      </Center>
    </group>
  );
}

function Scene({ progress }: { progress: number }) {
  return (
    <>
      <ambientLight intensity={0.85} />
      <hemisphereLight args={['#f0fdf4', '#cbd5e1', 0.5]} />
      <directionalLight position={[5, 8, 4]} intensity={1.3} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={0.45} color="#86efac" />
      <pointLight position={[0, 1, 4]} intensity={0.5} color="#4ade80" />
      <Suspense fallback={null}>
        <AtomModel progress={progress} />
      </Suspense>
    </>
  );
}

/**
 * Fixed background atom from Science.blend (GLB).
 * Rotates with page scroll. Light site style.
 */
export const AtomScrollBackground: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-green-50/40 to-slate-50/90" />

      <Canvas
        className="!absolute inset-0"
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 6], fov: 40, near: 0.1, far: 100 }}
        style={{ background: 'transparent' }}
      >
        <Scene progress={progress} />
      </Canvas>

      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/45" />
    </div>
  );
};

useGLTF.preload('/models/atom.glb');
