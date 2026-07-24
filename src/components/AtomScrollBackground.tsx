import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/** All atom OBJ parts — merged into one glowing model */
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

/** Reference screenshot palette: cyan-green glow on black */
const GLOW = {
  shell: '#2ee6a0',
  mid: '#5fffc8',
  core: '#c8ffe8',
  soft: '#14b87a',
};

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

function mergePositions(geos: THREE.BufferGeometry[]): THREE.BufferGeometry {
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
 * Build the reference look: dense glowing points + faint wireframe shell.
 * Matches Screenshot 2026-07-23 164939 (black void, neon green atom).
 */
function buildGlowAtom(source: THREE.Object3D): THREE.Group {
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

  const merged = geometries.length === 1 ? geometries[0] : mergePositions(geometries);

  merged.computeBoundingBox();
  const box = merged.boundingBox!;
  const center = box.getCenter(new THREE.Vector3());
  merged.translate(-center.x, -center.y, -center.z);

  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z) || 1;
  group.scale.setScalar(3.8 / maxDim);

  // Main orbital shell — dense particles (reference look, toned down)
  group.add(
    new THREE.Points(
      merged,
      new THREE.PointsMaterial({
        color: new THREE.Color(GLOW.shell),
        size: 0.016,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
    )
  );

  // Finer core dust — softer sparkle
  group.add(
    new THREE.Points(
      merged,
      new THREE.PointsMaterial({
        color: new THREE.Color(GLOW.core),
        size: 0.008,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
    )
  );

  // Soft mid glow layer
  group.add(
    new THREE.Points(
      merged,
      new THREE.PointsMaterial({
        color: new THREE.Color(GLOW.mid),
        size: 0.028,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
    )
  );

  // Subtle wireframe mesh for shell structure
  group.add(
    new THREE.Mesh(
      merged,
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(GLOW.soft),
        wireframe: true,
        transparent: true,
        opacity: 0.04,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        toneMapped: false,
      })
    )
  );

  return group;
}

/** Load all 8 OBJs, merge into one glowing atom */
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
          root.add(raw);
          setLoadedCount(i + 1);
        } catch (e) {
          console.error(`Failed to load ${MODEL_URLS[i]}`, e);
          if (!cancelled) setError(`model_${i}.obj жүктелмеді`);
        }
      }

      if (cancelled) return;
      setCombined(buildGlowAtom(root));
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
      0.12 + Math.sin(targetRotation) * 0.08,
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
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 2.5]} intensity={0.7} color="#5fffc8" />
      <pointLight position={[3, 2, 2]} intensity={0.35} color="#2ee6a0" />
      <CombinedAtom model={model} progress={progress} />
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          luminanceThreshold={0.25}
          luminanceSmoothing={0.45}
          intensity={0.85}
          mipmapBlur
          radius={0.55}
        />
      </EffectComposer>
    </>
  );
}

/**
 * Fixed full-viewport atom matching the reference screenshot:
 * black space + neon green particle atom, all 8 OBJs combined, scroll spin.
 */
export const AtomScrollBackground: React.FC = () => {
  const progress = useScrollProgress();
  const { combined, loadedCount, error } = useCombinedAtom();

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-black" />

      {combined && (
        <Canvas
          className="!absolute inset-0"
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
            toneMapping: THREE.NoToneMapping,
          }}
          camera={{ position: [0, 0, 7], fov: 38, near: 0.1, far: 100 }}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000', 1);
          }}
        >
          <Scene model={combined} progress={progress} />
        </Canvas>
      )}

      {/* Soft edge vignette — keep atom bright in center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_40%,rgba(0,0,0,0.45)_75%,rgba(0,0,0,0.75)_100%)]" />

      {loadedCount < MODEL_COUNT && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1] px-3 py-1.5 rounded-full bg-black/70 border border-emerald-400/35 text-[11px] font-semibold text-emerald-300 shadow-sm backdrop-blur-sm">
          {error
            ? error
            : `Атом моделі жүктелуде… ${loadedCount}/${MODEL_COUNT}`}
        </div>
      )}
    </div>
  );
};
