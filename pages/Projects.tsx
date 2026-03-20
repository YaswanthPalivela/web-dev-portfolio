"use client";

import React from "react";
import Link from "next/link";
import { PinContainer } from "@/components/3d-pin";
import { AnimatedTooltip } from "@/components/animated-tooltip";
import { Github } from "lucide-react";

interface Tech {
  id: number;
  name: string;
  designation: string;
  image: string;
}

interface Project {
  id: number;
  title: string;
  demo: string;
  description: string;
  technologies: Tech[];
  liveLink?: string;
  githubLink?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: "Web Dev Portfolio",
      description: "Brief description of your first project.",
      demo: "/Project1.png",
      technologies: [
        {
          id: 1,
          name: "React",
          designation: "Frontend Library",
          image: "/tech/nextjs.svg",
        },
        {
          id: 2,
          name: "TypeScript",
          designation: "Typed JavaScript",
          image: "/tech/typescript.svg",
        },
        {
          id: 3,
          name: "Tailwind",
          designation: "CSS Framework",
          image: "/tech/tailwindcss.svg",
        },
      ],
      liveLink: "#",
      githubLink: "#",
    },
    {
      id: 2,
      title: "Project Two",
      description: "Brief description of your second project.",
      demo: "",
      technologies: [
        {
          id: 1,
          name: "Next.js",
          designation: "React Framework",
          image: "/tech/nextjs.svg",
        },
        {
          id: 2,
          name: "Node.js",
          designation: "Backend Runtime",
          image: "/tech/nodejs.svg",
        },
        {
          id: 3,
          name: "MongoDB",
          designation: "Database",
          image: "/tech/mongodb.svg",
        },
      ],
      liveLink: "#",
      githubLink: "#",
    },
    {
      id: 3,
      title: "Project Three",
      description: "Brief description of your third project.",
      demo: "",
      technologies: [
        {
          id: 1,
          name: "Next.js",
          designation: "React Framework",
          image: "/tech/nextjs.svg",
        },
        {
          id: 2,
          name: "Node.js",
          designation: "Backend Runtime",
          image: "/tech/nodejs.svg",
        },
        {
          id: 3,
          name: "MongoDB",
          designation: "Database",
          image: "/tech/mongodb.svg",
        },
      ],
      liveLink: "#",
      githubLink: "#",
    },
  ];

  return (
    <section id="projects" className="py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-14 justify-items-center">
          {projects.map((project) => (
            <div
              key={project.id}
              className="h-112 w-full flex items-center justify-center"
            >
              <PinContainer
                title={project.title}
                href={project.liveLink}
                containerClassName="w-full h-full"
              >
                <div className="flex flex-col h-full w-[20rem] p-6 bg-black rounded-2xl">

                  <img
                src={project.demo}
                alt={project.title}
                className="rounded-lg mb-4 object-cotain h-36 w-full"
              />


                  {/* Title */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {project.title}
                  </h3>
                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>
                  {/* 🔥 Tech Icons with Tooltip */}
                  <div className="flex items-center mb-6">
                    <AnimatedTooltip items={project.technologies} />
                  </div>
                  {/* Links */}
                  <div className="mt-auto flex gap-4">
                    {project.liveLink && (
                      <Link
                        href={project.liveLink}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2 border-2 border-slate-300 hover:to-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                      >
                        Live Demo
                      </Link>
                    )}
                    {project.githubLink && (
                      <Link
                        href={project.githubLink}
                        target="_blank"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50"
                      >
                        <Github className="w-4 h-4" /> GitHub
                      </Link>
                    )}
                  </div>
                </div>
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
