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
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      mesh.castShadow = false;
      mesh.receiveShadow = false;

      const name = (mesh.name || mesh.parent?.name || '').toLowerCase();
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];

      mats.forEach((mat) => {
        if (!mat) return;
        mat.side = THREE.DoubleSide;

        // Ensure orbit rings read as soft silver-grey (screenshot look)
        if (
          name.includes('bezier') ||
          name.includes('circle') ||
          (mat.name && mat.name.toLowerCase().includes('bezier'))
        ) {
          if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
            const m = mat as THREE.MeshStandardMaterial;
            m.color.set('#c8c8c8');
            m.metalness = 0.15;
            m.roughness = 0.35;
          }
        }

        // Slight polish on particles
        if ((mat as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
          const m = mat as THREE.MeshStandardMaterial;
          m.metalness = Math.min(m.metalness, 0.2);
          m.roughness = Math.max(m.roughness, 0.25);
          m.envMapIntensity = 0.8;
        }
      });
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
    // Gentle tilt like the screenshot framing
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      0.35 + Math.sin(targetRotation) * 0.06,
      4,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      <Center>
        {/* Compact size so it sits as background, not full-screen */}
        <primitive object={model} scale={0.28} />
      </Center>
    </group>
  );
}

function Scene({ progress }: { progress: number }) {
  return (
    <>
      {/* Neutral studio lighting — matches textbook atom screenshot */}
      <ambientLight intensity={0.75} />
      <hemisphereLight args={['#ffffff', '#a8a8a8', 0.55]} />
      <directionalLight position={[4, 6, 5]} intensity={1.25} color="#ffffff" />
      <directionalLight position={[-3, 2, -2]} intensity={0.45} color="#e8e8f0" />
      <pointLight position={[0, 0, 4]} intensity={0.35} color="#ffffff" />
      <Suspense fallback={null}>
        <AtomModel progress={progress} />
      </Suspense>
    </>
  );
}

/**
 * science_project_the_atom.glb — classic Bohr atom background, scroll spin.
 */
export const AtomScrollBackground: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      {/* Soft blurred backdrop like the reference screenshot */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#d4d4d8_0%,_#b0b0b8_45%,_#8a8a92_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/40" />

      <Canvas
        className="!absolute inset-0"
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        camera={{ position: [0, 0.3, 7.5], fov: 36, near: 0.1, far: 100 }}
        style={{ background: 'transparent' }}
      >
        <Scene progress={progress} />
      </Canvas>

      {/* Light wash so page text/cards stay readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/45 via-white/15 to-white/50" />
    </div>
  );
};

useGLTF.preload('/models/atom.glb');
