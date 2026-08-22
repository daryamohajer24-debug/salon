import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  MeshTransmissionMaterial,
  Float,
  ContactShadows,
  Sparkles,
} from "@react-three/drei";
import * as THREE from "three";

/* ---------- Realistic perfume bottle ---------- */
function PerfumeBottle({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.25) * 0.3;
    ref.current.rotation.x = Math.cos(t * 0.2) * 0.04;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.04;
  });
  return (
    <group ref={ref} position={position}>
      {/* Bottle body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.6, 0.6]} />
        <MeshTransmissionMaterial
          thickness={0.55}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06}
          backside
          backsideThickness={0.4}
          color="#f4ecd8"
          attenuationDistance={2}
          attenuationColor="#d6b78a"
        />
      </mesh>
      {/* Liquid */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[1.05, 1.0, 0.5]} />
        <meshPhysicalMaterial
          color="#e8c98b"
          transmission={0.95}
          thickness={0.5}
          roughness={0.05}
          ior={1.4}
          attenuationColor="#b8924d"
          attenuationDistance={0.6}
        />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 1.0, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.25, 32]} />
        <meshStandardMaterial color="#1a1814" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 1.22, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.22, 32]} />
        <meshStandardMaterial color="#0b0a08" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Gold ring */}
      <mesh position={[0, 0.92, 0]}>
        <torusGeometry args={[0.22, 0.02, 16, 64]} />
        <meshStandardMaterial color="#b8924d" metalness={1} roughness={0.2} />
      </mesh>
    </group>
  );
}

/* ---------- Scissors ---------- */
function Scissors({ position = [0, 0, 0] as [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.z = Math.sin(t * 0.3) * 0.18;
    ref.current.rotation.x = Math.cos(t * 0.2) * 0.1;
  });
  const silver = (
    <meshStandardMaterial color="#e8e6e0" metalness={0.9} roughness={0.18} />
  );
  return (
    <group ref={ref} position={position} rotation={[0, 0, -0.3]}>
      {/* Blade 1 */}
      <mesh position={[0.6, 0, 0]} rotation={[0, 0, 0.05]} castShadow>
        <coneGeometry args={[0.18, 1.6, 4, 1]} />
        {silver as any}
      </mesh>
      {/* Blade 2 */}
      <mesh position={[0.6, 0, 0]} rotation={[0, 0, -0.05]} castShadow>
        <coneGeometry args={[0.18, 1.6, 4, 1]} />
        {silver as any}
      </mesh>
      {/* Pivot */}
      <mesh>
        <sphereGeometry args={[0.1, 24, 24]} />
        <meshStandardMaterial color="#b8924d" metalness={1} roughness={0.2} />
      </mesh>
      {/* Handles */}
      <mesh position={[-0.55, 0.35, 0]} rotation={[0, 0, 0.4]} castShadow>
        <torusGeometry args={[0.32, 0.04, 12, 48, Math.PI * 1.4]} />
        <meshStandardMaterial color="#0b0a08" metalness={0.4} roughness={0.45} />
      </mesh>
      <mesh position={[-0.55, -0.35, 0]} rotation={[0, 0, -0.4]} castShadow>
        <torusGeometry args={[0.32, 0.04, 12, 48, Math.PI * 1.4]} />
        <meshStandardMaterial color="#0b0a08" metalness={0.4} roughness={0.45} />
      </mesh>
    </group>
  );
}

/* ---------- Hair strand (curved tube) ---------- */
function HairStrand({
  position = [0, 0, 0] as [number, number, number],
  color = "#1a1814",
  scale = 1,
}) {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 1.2, 0),
      new THREE.Vector3(0.15, 0.6, 0.1),
      new THREE.Vector3(-0.1, 0, 0.05),
      new THREE.Vector3(0.2, -0.6, -0.05),
      new THREE.Vector3(-0.05, -1.2, 0),
    ]);
  }, []);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.4 + position[0]) * 0.2;
    ref.current.rotation.z = Math.cos(t * 0.3 + position[1]) * 0.15;
  });
  return (
    <mesh ref={ref} position={position} scale={scale}>
      <tubeGeometry args={[curve, 64, 0.025, 12, false]} />
      <meshStandardMaterial color={color} metalness={0.4} roughness={0.35} />
    </mesh>
  );
}

/* ---------- Floating sphere with subtle iridescence ---------- */
function IridescentOrb({
  position = [0, 0, 0] as [number, number, number],
  color = "#d9c7a5",
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.15;
    ref.current.rotation.y = t * 0.2;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref} position={position} castShadow>
        <icosahedronGeometry args={[0.7, 4]} />
        <meshPhysicalMaterial
          color={color}
          metalness={0.3}
          roughness={0.15}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={0.7}
          iridescenceIOR={1.3}
          sheen={0.5}
          sheenColor="#c8a96a"
        />
      </mesh>
    </Float>
  );
}

/* ---------- Camera rig that follows mouse ---------- */
function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    const tx = mouse.x * 0.35;
    const ty = mouse.y * 0.25;
    camera.position.x += (tx - camera.position.x) * 0.04;
    camera.position.y += (ty - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

interface Props {
  variant?: "hero" | "service" | "experience" | "cta";
  className?: string;
}

export default function Scene3D({ variant = "hero", className }: Props) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const dpr: [number, number] = isMobile ? [1, 1.4] : [1, 1.8];

  return (
    <Canvas
      className={className}
      shadows={!isMobile}
      dpr={dpr}
      gl={{
        antialias: !isMobile,
        powerPreference: "high-performance",
        alpha: true,
      }}
      camera={{ position: [0, 0, 4.5], fov: 35 }}
    >
      <color attach="background" args={["#00000000"]} />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[3, 4, 2]}
        intensity={1.1}
        color="#fff6e2"
        castShadow={!isMobile}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 2, -1]} intensity={0.4} color="#c8a96a" />
      <pointLight position={[0, 2, 2]} intensity={0.6} color="#f6f1e7" />

      <Suspense fallback={null}>
        <Environment preset="studio" />

        {variant === "hero" && (
          <>
            <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
              <PerfumeBottle position={[0, 0, 0]} />
            </Float>
            <Sparkles
              count={isMobile ? 18 : 40}
              scale={6}
              size={2}
              speed={0.25}
              color="#c8a96a"
              opacity={0.6}
            />
          </>
        )}

        {variant === "service" && (
          <>
            <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
              <Scissors position={[0, 0, 0]} />
            </Float>
            <IridescentOrb position={[-2.2, 0.6, -0.5]} color="#d9c7a5" />
            <IridescentOrb position={[2.1, -0.6, -0.8]} color="#efe7d6" />
          </>
        )}

        {variant === "experience" && (
          <>
            <HairStrand position={[0, 0, 0]} color="#1a1814" scale={1.1} />
            <HairStrand
              position={[-0.4, 0.2, 0.1]}
              color="#3a2a18"
              scale={0.9}
            />
            <HairStrand
              position={[0.4, -0.2, -0.1]}
              color="#b8924d"
              scale={0.9}
            />
            <Float speed={1.5} floatIntensity={0.5}>
              <IridescentOrb position={[1.8, 0.8, 0]} color="#f6f1e7" />
            </Float>
          </>
        )}

        {variant === "cta" && (
          <Float speed={1} floatIntensity={0.5}>
            <IridescentOrb position={[0, 0, 0]} color="#c8a96a" />
          </Float>
        )}

        {!isMobile && (
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.35}
            scale={6}
            blur={2.4}
            far={2.5}
            color="#1a1814"
          />
        )}
      </Suspense>

      {!isMobile && <CameraRig />}
    </Canvas>
  );
}
