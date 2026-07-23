import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
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

function AtomModel({ targetRotation }: { targetRotation: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const obj = useLoader(OBJLoader, '/models/atom.obj');

  const prepared = useMemo(() => {
    const clone = obj.clone(true);

    // Center geometry
    const box = new THREE.Box3().setFromObject(clone);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3.2 / maxDim;

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.geometry = mesh.geometry.clone();
        mesh.geometry.translate(-center.x, -center.y, -center.z);
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color('#166534'),
          metalness: 0.55,
          roughness: 0.28,
          emissive: new THREE.Color('#0a3d1f'),
          emissiveIntensity: 0.15,
          transparent: true,
          opacity: 0.72,
          side: THREE.DoubleSide,
        });
        mesh.castShadow = false;
        mesh.receiveShadow = false;
      }
    });

    clone.scale.setScalar(scale);
    return clone;
  }, [obj]);

  // Smoothly follow scroll-driven rotation
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const current = groupRef.current.rotation.y;
    const next = THREE.MathUtils.damp(current, targetRotation, 4, delta);
    groupRef.current.rotation.y = next;
    // Subtle tilt while scrolling
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      0.25 + Math.sin(targetRotation) * 0.12,
      4,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      <primitive object={prepared} />
    </group>
  );
}

function Scene({ progress }: { progress: number }) {
  // ~1.5 full turns across the whole page
  const targetRotation = progress * Math.PI * 3;

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 4]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={0.45} color="#86efac" />
      <pointLight position={[0, 0, 4]} intensity={0.35} color="#4ade80" />
      <AtomModel targetRotation={targetRotation} />
    </>
  );
}

/**
 * Fixed full-viewport atom model. Rotates as the user scrolls the page.
 */
export const AtomScrollBackground: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* Soft green wash so the model blends with the brand */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-green-50/40 to-slate-50/90" />

      <Canvas
        className="!absolute inset-0"
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 6.5], fov: 42, near: 0.1, far: 100 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene progress={progress} />
        </Suspense>
      </Canvas>

      {/* Soft vignette so text stays readable over the model */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/55" />
    </div>
  );
};
