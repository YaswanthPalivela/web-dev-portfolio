"use client";

import { SparklesCore } from "@/components/Sparkles";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@/components/movingborder";
import { Spotlight } from "@/components/spotlight";
import { ArrowDown, Download, PhoneCallIcon } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    // Animate H1 first
    tl.from(headingRef.current, {
      y: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    // Animate spans after
    tl.from(
      spanRefs.current,
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: "power3.out",
      },
      "-=0.3",
    );
  }, []);

  return (
<section id="home" className="relative bg-black text-white">
  <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
    
    {/* BACKGROUND */}
    <div className="absolute inset-0 z-0">
      <Spotlight />
    </div>

    {/* CONTENT */}
    <div className="relative z-10 text-center max-w-4xl mx-auto">
      
      {/* TECH STACK */}
      <h5 className="text-sm md:text-base mb-6 text-slate-100 font-semibold">
        <span
          className="text-blue-500 font-semibold"
          ref={(el) => { spanRefs.current[0] = el; }}
        >
          Next.js
        </span>{" "}
        + TypeScript +{" "}
        <span
          ref={(el) => { spanRefs.current[1] = el; }}
          className="text-blue-500 font-semibold"
        >
          Aceternity UI
        </span>
      </h5>

      {/* MAIN HEADING */}
      <h1
        ref={headingRef}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
      >
        Built From{" "}
        <span className="text-blue-500">Scratch</span>. Owned{" "}
        <span className="text-blue-500">End</span> to{" "}
        <span className="text-blue-500">End</span>. That's how I{" "}
        <span className="text-blue-500">Ship</span>.
      </h1>

      {/* SUBTEXT */}
      <h3
        className="mt-6 text-base sm:text-lg md:text-xl text-white font-semibold leading-relaxed"
        ref={(el) => { spanRefs.current[2] = el; }}
      >
        👋 Hi, I'm Yaswanth Palivela — a{" "}
        <span
          className="text-blue-500"
          ref={(el) => { spanRefs.current[3] = el; }}
        >
          Full-Stack
        </span>{" "}
        Developer who{" "}
        <span
          className="text-blue-500"
          ref={(el) => { spanRefs.current[4] = el; }}
        >
          builds
        </span>{" "}
        and{" "}
        <span
          className="text-blue-500"
          ref={(el) => { spanRefs.current[5] = el; }}
        >
          deploys
        </span>{" "}
        scalable products.
      </h3>

      {/* BUTTONS */}
      <div
        ref={(el) => { spanRefs.current[6] = el; }}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8"
      >
        <Link href="#projects"><Button className="w-full sm:w-auto px-6 py-3 hover:cursor-pointer hover:scale-105 transition">
          Projects
          <ArrowDown className="ml-2 animate-bounce" size={18} />
        </Button></Link>

<Link href="#contact">
        <button className="w-full flex items-center sm:w-auto px-6 py-3 hover:cursor-pointer hover:scale-105 bg-blue-500 rounded-4xl transition ">
          Contact Me
          <PhoneCallIcon className="ml-2" size={18} />
        </button>
</Link>
      </div>
    </div>
  </div>
</section>
  );
};

export default Hero;
