import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

/** All atom OBJ parts — loaded and merged into one model */
const MODEL_URLS = [
  '/models/model_0.obj',
  '/models/model_1.obj',
  '/models/model_2.obj',
  '/models/model_3.obj',
  '/models/model_4.obj',
  '/models/model_5.obj',
  '/models/model_6.obj',
  '/models/model_7.obj',
] as const;

const MODEL_COUNT = MODEL_URLS.length;

const material = () =>
  new THREE.MeshStandardMaterial({
    color: new THREE.Color('#22a35a'),
    metalness: 0.35,
    roughness: 0.28,
    emissive: new THREE.Color('#1a7a42'),
    emissiveIntensity: 0.35,
    transparent: true,
    opacity: 0.68,
    side: THREE.DoubleSide,
  });

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

/**
 * Load every OBJ and merge into a single centered Group.
 */
function useCombinedAtom() {
  const [combined, setCombined] = useState<THREE.Group | null>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new OBJLoader();
    const root = new THREE.Group();

    (async () => {
      for (let i = 0; i < MODEL_COUNT; i++) {
        if (cancelled) return;
        try {
          const raw = await loader.loadAsync(MODEL_URLS[i]);
          if (cancelled) return;

          raw.traverse((child) => {
            if (!(child as THREE.Mesh).isMesh) return;
            const mesh = child as THREE.Mesh;
            mesh.material = material();
            mesh.castShadow = false;
            mesh.receiveShadow = false;
          });

          // Keep each part as a child so all 8 models form one object
          root.add(raw);
          setLoadedCount(i + 1);
        } catch (e) {
          console.error(`Failed to load ${MODEL_URLS[i]}`, e);
          if (!cancelled) setError(`model_${i}.obj жүктелмеді`);
        }
      }

      if (cancelled) return;

      // Center + scale the whole combined model once
      root.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(root);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const scale = 3.2 / maxDim;

      // Pivot: center geometry at origin, then uniform scale
      const pivot = new THREE.Group();
      root.position.set(-center.x, -center.y, -center.z);
      pivot.add(root);
      pivot.scale.setScalar(scale);

      setCombined(pivot);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { combined, loadedCount, error };
}

function CombinedAtom({
  model,
  progress,
}: {
  model: THREE.Group;
  progress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
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
      0.25 + Math.sin(targetRotation) * 0.12,
      4,
      delta
    );
  });

  return (
    <group ref={groupRef}>
      <primitive object={model} />
    </group>
  );
}

function Scene({
  model,
  progress,
}: {
  model: THREE.Group;
  progress: number;
}) {
  return (
    <>
      <ambientLight intensity={0.95} />
      <hemisphereLight args={['#e8fff0', '#94a3b8', 0.55]} />
      <directionalLight position={[6, 8, 4]} intensity={1.55} color="#ffffff" />
      <directionalLight position={[-4, 3, -2]} intensity={0.7} color="#86efac" />
      <directionalLight position={[0, -2, 5]} intensity={0.45} color="#bbf7d0" />
      <pointLight position={[0, 0, 4]} intensity={0.85} color="#4ade80" />
      <pointLight position={[2, 2, 3]} intensity={0.5} color="#86efac" />
      <CombinedAtom model={model} progress={progress} />
    </>
  );
}

/**
 * Fixed background: all 8 OBJs merged into one atom, rotates on scroll.
 */
export const AtomScrollBackground: React.FC = () => {
  const progress = useScrollProgress();
  const { combined, loadedCount, error } = useCombinedAtom();

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-green-50/40 to-slate-50/90" />

      {combined && (
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
          <Scene model={combined} progress={progress} />
        </Canvas>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-white/35" />

      {loadedCount < MODEL_COUNT && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1] px-3 py-1.5 rounded-full bg-white/85 border border-[#166534]/20 text-[11px] font-semibold text-[#166534] shadow-sm">
          {error
            ? error
            : `Модельдер біріктірілуде… ${loadedCount}/${MODEL_COUNT}`}
        </div>
      )}
    </div>
  );
};
