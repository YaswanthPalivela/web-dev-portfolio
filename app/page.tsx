import React from "react";
import Hero from "@/pages/Hero";
import Techstack from "@/pages/Techstack";
import Navbar from "@/pages/Navbar";
import BentoGridDemo from "@/pages/AboutMe";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact"
import Footer from "@/pages/Footer"

const Application = () => {
  return (
    <>
      <Navbar />
      <main className=" bg-pitch-black text-white">
        <Hero />
        <BentoGridDemo/>
        <Techstack />
        <Projects/>
        <Contact/>
        <Footer/>
      </main>
    </>
  );
};

export default Application;
