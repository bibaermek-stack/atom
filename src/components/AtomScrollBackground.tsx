import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
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

/** Glow palette matching the reference atom render */
const GLOW = {
  core: '#9affd6',
  mid: '#3dffb0',
  outer: '#12c97a',
  deep: '#0a8f55',
};

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
 * Convert solid OBJ meshes into the glowing point + wireframe look
 * from the reference screenshot (additive green particle cloud).
 */
function prepareObject(source: THREE.Object3D): THREE.Group {
  const group = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [];

  source.updateMatrixWorld(true);
  source.traverse((child) => {
    if (!(child as THREE.Mesh).isMesh) return;
    const mesh = child as THREE.Mesh;
    const geo = mesh.geometry.clone();
    geo.applyMatrix4(mesh.matrixWorld);
    geometries.push(geo);
  });

  if (geometries.length === 0) return group;

  // Merge all parts into one geometry for a single particle system
  const merged =
    geometries.length === 1
      ? geometries[0]
      : mergeBufferGeometries(geometries);

  // Center
  merged.computeBoundingBox();
  const box = merged.boundingBox!;
  const center = box.getCenter(new THREE.Vector3());
  merged.translate(-center.x, -center.y, -center.z);

  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  const scale = 3.6 / maxDim;
  group.scale.setScalar(scale);

  // Layer 1 — dense glowing points (main look of reference image)
  const pointsMat = new THREE.PointsMaterial({
    color: new THREE.Color(GLOW.mid),
    size: 0.028,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  group.add(new THREE.Points(merged, pointsMat));

  // Layer 2 — finer bright core sparkle (nucleus density)
  const coreMat = new THREE.PointsMaterial({
    color: new THREE.Color(GLOW.core),
    size: 0.012,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.55,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  group.add(new THREE.Points(merged, coreMat));

  // Layer 3 — subtle wireframe shell
  const wireMat = new THREE.MeshBasicMaterial({
    color: new THREE.Color(GLOW.outer),
    wireframe: true,
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    toneMapped: false,
  });
  group.add(new THREE.Mesh(merged, wireMat));

  return group;
}

/** Lightweight merge without extra deps */
function mergeBufferGeometries(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
  const positions: number[] = [];
  for (const g of geos) {
    const pos = g.getAttribute('position');
    if (!pos) continue;
    for (let i = 0; i < pos.count; i++) {
      positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
    }
  }
  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  return merged;
}

/**
 * Sequentially loads all 8 OBJ frames so the first model appears quickly.
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
          const raw = await loader.loadAsync(MODEL_URLS[i]);
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
          if (!cancelled) setError(`model_${i}.obj жүктелмеді`);
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

  // Scroll drives frame index (all 8 OBJs) + continuous spin
  const frameFloat = progress * FRAME_COUNT * 2;
  const frameIndex = Math.floor(frameFloat) % FRAME_COUNT;
  const targetRotation = progress * Math.PI * 3;

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
      0.15 + Math.sin(targetRotation) * 0.08,
      4,
      delta
    );
    // Slow idle spin so it feels alive even without scrolling
    groupRef.current.rotation.z = THREE.MathUtils.damp(
      groupRef.current.rotation.z,
      Math.sin(targetRotation * 0.5) * 0.1,
      3,
      delta
    );
  });

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
      {/* Dark void — matches reference black background around the atom */}
      <color attach="background" args={['#020806']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 3]} intensity={1.2} color="#5fffc8" />
      <pointLight position={[4, 2, 2]} intensity={0.5} color="#a7f3d0" />
      <AtomFrames frames={frames} progress={progress} />
      <EffectComposer multisampling={0}>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.4}
          intensity={1.85}
          mipmapBlur
          radius={0.7}
        />
      </EffectComposer>
    </>
  );
}

/**
 * Fixed full-viewport atom: glowing particle look + all 8 frames + scroll spin.
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
      {/* Full dark space behind content so the glow looks like the reference */}
      <div className="absolute inset-0 bg-[#020806]" />

      {hasAnyFrame && (
        <Canvas
          className="!absolute inset-0"
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
          }}
          camera={{ position: [0, 0, 7.2], fov: 40, near: 0.1, far: 100 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#020806', 1);
          }}
        >
          <Scene frames={frames} progress={progress} />
        </Canvas>
      )}

      {/* Soft vignette edges so UI cards stay readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_35%,rgba(2,8,6,0.35)_70%,rgba(2,8,6,0.65)_100%)]" />

      {loadedCount < FRAME_COUNT && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1] px-3 py-1.5 rounded-full bg-black/60 border border-emerald-400/30 text-[11px] font-semibold text-emerald-300 shadow-sm backdrop-blur-sm">
          {error
            ? error
            : `Атом моделі жүктелуде… ${loadedCount}/${FRAME_COUNT}`}
        </div>
      )}
    </div>
  );
};
