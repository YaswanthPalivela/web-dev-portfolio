"use client";

import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, Vector3, Group } from "three";
import ThreeGlobe from "three-globe";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "@/data/globe.json";

const cameraZ = 300;
const RING_PROPAGATION_SPEED = 3;

type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

export type GlobeConfig = {
  globeColor?: string;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  showAtmosphere?: boolean;
  polygonColor?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
};

interface WorldProps {
  globeConfig: GlobeConfig;
  data: Position[];
}

/* ---------------- GLOBE ---------------- */

function Globe({ globeConfig, data }: WorldProps) {
  const globeRef = useRef<ThreeGlobe | null>(null);
  const groupRef = useRef<Group | null>(null);
  const [ready, setReady] = useState(false);

  const config = {
    globeColor: "#1d072e",
    emissive: "#2563eb",
    emissiveIntensity: 0.3,
    shininess:3,
    atmosphereColor: "#3b82f6",
    atmosphereAltitude: 0.1,
    showAtmosphere: true,
    polygonColor: "rgba(255,255,255,0.7)",
    arcTime: 4000,
    arcLength: 2,
    rings: 2,
    maxRings: 4,
    ...globeConfig,
  };

  useEffect(() => {
    if (!groupRef.current) return;

    const globe = new ThreeGlobe();
    globeRef.current = globe;
    groupRef.current.add(globe);

    setReady(true);
  }, []);

  useEffect(() => {
    if (!globeRef.current || !ready) return;

    const material = globeRef.current.globeMaterial() as any;

    material.color = new Color(config.globeColor);
    material.emissive = new Color(config.emissive);
    material.emissiveIntensity = config.emissiveIntensity;
    material.shininess = config.shininess;
  }, [ready, config]);

  useEffect(() => {
    if (!globeRef.current || !ready) return;

    const globe = globeRef.current;

    globe
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(config.showAtmosphere)
      .atmosphereColor(config.atmosphereColor)
      .atmosphereAltitude(config.atmosphereAltitude)
      .hexPolygonColor(() => config.polygonColor);

    globe
      .arcsData(data)
      .arcStartLat((d: any) => d.startLat)
      .arcStartLng((d: any) => d.startLng)
      .arcEndLat((d: any) => d.endLat)
      .arcEndLng((d: any) => d.endLng)
      .arcColor((d: any) => d.color)
      .arcAltitude((d: any) => d.arcAlt)
      .arcStroke(() => 0.3)
      .arcDashLength(config.arcLength)
      .arcDashGap(15)
      .arcDashAnimateTime(config.arcTime);

    globe
      .ringsData([])
      .ringColor(() => config.polygonColor)
      .ringMaxRadius(config.maxRings)
      .ringPropagationSpeed(RING_PROPAGATION_SPEED);
  }, [ready, data, config]);

  useEffect(() => {
    if (!globeRef.current) return;

    const interval = setInterval(() => {
      if (!globeRef.current) return;

      const rings = data.slice(0, 5).map((d) => ({
        lat: d.startLat,
        lng: d.startLng,
        color: d.color,
      }));

      globeRef.current.ringsData(rings);
    }, 2000);

    return () => clearInterval(interval);
  }, [data]);

  return <group ref={groupRef} scale={[1.2, 1.2, 1.2]} />;
}

/* ---------------- WORLD ---------------- */

export function World(props: WorldProps) {
  const scene = new Scene();
  scene.fog = new Fog(0xffffff, 400, 2000);

  return (
    <div className="w-full h-full">
      <Canvas
        scene={scene}
        camera={{ fov: 50, position: [0, 0, cameraZ], near: 180, far: 1800 }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={5} />

        <directionalLight position={new Vector3(-400, 100, 400)} />
        <directionalLight position={new Vector3(-200, 500, 200)} />

        <pointLight position={new Vector3(-200, 500, 200)} intensity={2} />

        <Globe {...props} />

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={5}
          minDistance={cameraZ}
          maxDistance={cameraZ}
        />
      </Canvas>
    </div>
  );
}