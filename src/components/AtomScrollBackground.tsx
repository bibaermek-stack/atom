import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import * as THREE from 'three';

/** All exported atom frames from Downloads/Atom */
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

const FRAME_COUNT = MODEL_URLS.length;

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

function prepareObject(source: THREE.Group): THREE.Group {
  const clone = source.clone(true);

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
}

/**
 * Sequentially loads all 8 OBJ frames so the first model appears quickly
 * and the rest fill in without a 120MB parallel spike.
 */
function useAtomFrames() {
  const [frames, setFrames] = useState<(THREE.Group | null)[]>(() =>
    Array.from({ length: FRAME_COUNT }, () => null)
  );
  const [loadedCount, setLoadedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loader = new OBJLoader();

    (async () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        if (cancelled) return;
        try {
          const raw = (await loader.loadAsync(MODEL_URLS[i])) as THREE.Group;
          if (cancelled) return;
          const prepared = prepareObject(raw);
          setFrames((prev) => {
            const next = [...prev];
            next[i] = prepared;
            return next;
          });
          setLoadedCount(i + 1);
        } catch (e) {
          console.error(`Failed to load ${MODEL_URLS[i]}`, e);
          if (!cancelled) {
            setError(`model_${i}.obj жүктелмеді`);
          }
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return { frames, loadedCount, error };
}

function AtomFrames({
  frames,
  progress,
}: {
  frames: (THREE.Group | null)[];
  progress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshGroupRef = useRef<THREE.Group>(null);

  // Scroll drives both frame index (all 8 OBJs) and continuous spin
  const frameFloat = progress * FRAME_COUNT * 2; // 2 full cycles across the page
  const frameIndex = Math.floor(frameFloat) % FRAME_COUNT;
  const targetRotation = progress * Math.PI * 3;

  // Prefer requested frame; fall back to nearest already-loaded one
  const activeObject = useMemo(() => {
    if (frames[frameIndex]) return frames[frameIndex];
    for (let d = 1; d < FRAME_COUNT; d++) {
      const prev = frames[(frameIndex - d + FRAME_COUNT) % FRAME_COUNT];
      if (prev) return prev;
      const next = frames[(frameIndex + d) % FRAME_COUNT];
      if (next) return next;
    }
    return null;
  }, [frames, frameIndex]);

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

  // Swap visible mesh when active frame changes
  useEffect(() => {
    const parent = meshGroupRef.current;
    if (!parent || !activeObject) return;

    while (parent.children.length > 0) {
      parent.remove(parent.children[0]);
    }
    parent.add(activeObject);
  }, [activeObject]);

  if (!activeObject) return null;

  return (
    <group ref={groupRef}>
      <group ref={meshGroupRef} />
    </group>
  );
}

function Scene({
  frames,
  progress,
}: {
  frames: (THREE.Group | null)[];
  progress: number;
}) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[6, 8, 4]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, 2, -3]} intensity={0.45} color="#86efac" />
      <pointLight position={[0, 0, 4]} intensity={0.35} color="#4ade80" />
      <AtomFrames frames={frames} progress={progress} />
    </>
  );
}

/**
 * Fixed full-viewport atom: all 8 OBJ frames scrub with scroll + rotate.
 */
export const AtomScrollBackground: React.FC = () => {
  const progress = useScrollProgress();
  const { frames, loadedCount, error } = useAtomFrames();
  const hasAnyFrame = loadedCount > 0;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-green-50/40 to-slate-50/90" />

      {hasAnyFrame && (
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
          <Scene frames={frames} progress={progress} />
        </Canvas>
      )}

      {/* Loading indicator while frames stream in */}
      {loadedCount < FRAME_COUNT && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1] px-3 py-1.5 rounded-full bg-white/80 border border-[#166534]/20 text-[11px] font-semibold text-[#166534] shadow-sm">
          {error
            ? error
            : `Атом моделі жүктелуде… ${loadedCount}/${FRAME_COUNT}`}
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/55" />
    </div>
  );
};
