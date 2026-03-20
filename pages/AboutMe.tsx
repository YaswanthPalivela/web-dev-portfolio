"use client";

import React from "react";
import { BentoGrid, BentoGridItem } from "../components/Bento";
import {
  IconUser,
  IconCode,
  IconBulb,
  IconBrain,
  IconBook,
} from "@tabler/icons-react";
import dynamic from "next/dynamic";

const World = dynamic(() => import("../components/globe").then((mod) => mod.World), {
  ssr: false,
  loading: () => <div className="w-full h-full min-h-[250px]"><Skeleton /></div>,
});



/* -------- Globe Data -------- */

const items = [
  {
    title: "Who I Am",
    description:
      "I'm Yaswanth, a Full Stack Developer passionate about building modern web applications.",
    header: "/developer.png",
    icon: <IconUser className="h-4 w-4 text-neutral-500" />,
    className: "md:col-span-2",
  },
  {
    title: "Tech Stack",
    description: "React, Next.js, Node.js, MongoDB and Tailwind CSS.",
    header: "/tech.png",
    icon: <IconCode className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Clean Development",
    description: "Maintainable code, reusable components, scalable UI.",
    header: "/idea2.png",
    icon: <IconBulb className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Problem Solving",
    description: "Breaking complex problems into scalable solutions.",
    header: "/problemsolving.png",
    icon: <IconBrain className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Continuous Learning",
    description: "Exploring advanced frontend and backend architecture.",
    header: "/learning.png",
    icon: <IconBook className="h-4 w-4 text-neutral-500" />,
  },
];


const globeData = [
  {
    order: 1,
    startLat: 28.6139,
    startLng: 77.209,
    endLat: 37.7749,
    endLng: -122.4194,
    arcAlt: 0.3,
    color: "#ff00ff",
  },
  {
    order: 2,
    startLat: 51.5074,
    startLng: -0.1278,
    endLat: 20.5937,
    endLng: 78.9629,
    arcAlt: 0.4,
    color: "#00f5ff",
  },
  {
    order: 3,
      startLat: 48.8566,
      startLng: 2.3522,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.3,
      color: "#00ff00",
      },
      {
      order: 4,
      startLat: 35.6762,
      startLng: 139.6503,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.35,
      color: "#ffff00",
      },
      {
      order: 5,
      startLat: -33.8688,
      startLng: 151.2093,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.4,
      color: "#ff6600",
      },
      {
      order: 6,
      startLat: 40.7128,
      startLng: -74.006,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.2,
      color: "#ff0099",
      },
      {
      order: 7,
      startLat: 55.7558,
      startLng: 37.6173,
      endLat: 37.7749,
      endLng: -122.4194,
      arcAlt: 0.45,
      color: "#00ccff",
  }
];

/* -------- Components -------- */

const Skeleton = () => (
  <div className="flex w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800" />
);

const GlobeCard = () => (
  <div className="w-full h-full min-h-[250px]">
    <World
      globeConfig={{
        globeColor: "#1d072e",
        emissive: "#2563eb",
        atmosphereColor: "#3b82f6",
      }}
      data={globeData}
    />
  </div>
);

/* -------- Main Section -------- */

const BentoGridDemo = () => {
  return (
<section id="about" className="py-20 px-4">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
    About Me
  </h2>

  {/* BENTO GRID */}
  <BentoGrid className="max-w-6xl mx-auto hover:cursor-pointer">
    {items.map((item, i) => (
      <BentoGridItem key={i} {...item} />
    ))}
  </BentoGrid>

  {/* 🌍 WORKING WORLDWIDE CARD */}
  <div className="max-w-5xl mx-auto mt-6">
    <div className="flex flex-col md:flex-row items-center gap-6 border border-neutral-800 bg-neutral-900/40 backdrop-blur-md rounded-xl p-6 group hover:shadow-lg transition">
      
      {/* LEFT - TEXT */}
      <div className="w-full md:w-1/2 transition group-hover:translate-x-2">
        <h3 className="text-2xl md:text-3xl font-semibold text-white">
          Working Worldwide 🌍
        </h3>

        <p className="text-sm md:text-base mt-3 text-slate-300 leading-relaxed">
          I collaborate with teams across the globe and build scalable
          products that reach users worldwide. Open to remote opportunities
          and global teams.
        </p>
      </div>

      {/* RIGHT - GLOBE */}
      <div className="w-full md:w-1/2 h-[200px] md:h-[250px] hover:cursor-pointer">
        <World
          globeConfig={{
            globeColor: "#1d072e",
            emissive: "#2563eb",
            atmosphereColor: "#3b82f6",
          }}
          data={globeData}
        />
      </div>
    </div>
  </div>
</section>
  );
}

export default BentoGridDemo;
/* -------- Items -------- */

