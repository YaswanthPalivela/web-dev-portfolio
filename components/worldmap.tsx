"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
}

export function WorldMap({
  dots = [],
  lineColor = "#2323FF", // cyan glow (better for dark UI)
}: MapProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  const map = new DottedMap({ height: 100, grid: "diagonal" });

  const svgMap = map.getSVG({
    radius: 0.25,
    color: "white", // softer dots
    shape: "circle",
    backgroundColor: "black", // 🔥 removed white bg
  });

  const projectPoint = (lat: number, lng: number) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  };

  const createCurvedPath = (
    start: { x: number; y: number },
    end: { x: number; y: number },
  ) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 60; // higher arc
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  };

  return (
    <div className="w-full aspect-[2/1] relative font-sans overflow-hidden">
      {/* 🌍 MAP BASE */}
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        className="h-full w-full opacity-80 
        [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] 
        pointer-events-none select-none"
        alt="world map"
        draggable={false}
      />

      {/* ✨ GLOW LAYER */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 blur-2xl pointer-events-none" />

      {/* 🚀 PATHS */}
      <svg
        ref={svgRef}
        viewBox="0 0 800 400"
        className="w-full h-full absolute inset-0 pointer-events-none"
      >
        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={`path-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.4,
                  ease: "easeOut",
                }}
              />
            </g>
          );
        })}

        {/* 🌈 GRADIENT */}
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor={lineColor} />
            <stop offset="80%" stopColor={lineColor} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* 📍 POINTS */}
        {dots.map((dot, i) => {
          const start = projectPoint(dot.start.lat, dot.start.lng);
          const end = projectPoint(dot.end.lat, dot.end.lng);

          return (
            <g key={`points-${i}`}>
              {/* START */}
              <circle cx={start.x} cy={start.y} r="2.5" fill={lineColor} />
              <circle
                cx={start.x}
                cy={start.y}
                r="2.5"
                fill={lineColor}
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  from="2.5"
                  to="10"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* END */}
              <circle cx={end.x} cy={end.y} r="2.5" fill={lineColor} />
              <circle
                cx={end.x}
                cy={end.y}
                r="2.5"
                fill={lineColor}
                opacity="0.6"
              >
                <animate
                  attributeName="r"
                  from="2.5"
                  to="10"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.6"
                  to="0"
                  dur="1.8s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
