"use client";

import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  order: number;
}

export default function ProjectCard({ project, order }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isAlternate = order % 2 === 0;

  return (
    <div
      className={`flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${
        isAlternate ? "lg:flex-row-reverse" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section - Tidak terpengaruh CTA */}
      <div className="w-full lg:w-6/12 xl:w-6/12">
        <div className="relative">
          <div
            className={`relative rounded-2xl overflow-hidden transition-all duration-700 ease-out ${
              isHovered ? "shadow-2xl -translate-y-2" : "shadow-xl"
            }`}
          >
            {/* Image dengan rotasi minimal */}
            <div className="relative bg-linear-to-br from-gray-900/50 to-black/50 aspect-video w-full overflow-hidden">
              {project.imageUrl ? (
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={1200}
                  height={675}
                  unoptimized
                  className={`w-full h-full object-cover transition-all duration-800 ease-out ${
                    isHovered ? "scale-[1.02] -rotate-1" : "scale-100 rotate-0"
                  }`}
                />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900" />
              )}
            </div>

            {/* Overlay linear */}
            <div
              className={`absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="w-full lg:w-6/12 xl:w-6/12">
        {/* Project Number - Modern Minimalis */}
        <div className="mb-6">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-500 ${
              isHovered
                ? "bg-white/5 text-white"
                : "bg-gray-900/30 text-gray-400"
            }`}
          >
            <span className="text-xs font-medium tracking-wider">PROJECT</span>
            <span className="text-sm font-bold tracking-tight">
              {order.toString().padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack - Modern Minimalis */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack?.map((tech, index) => (
            <span
              key={tech}
              className={`px-3 py-1.5 rounded-md text-xs font-medium backdrop-blur-sm transition-all duration-300 ${
                isHovered
                  ? "bg-white/5 border border-white/10 text-white"
                  : "bg-black/20 border border-gray-800 text-gray-400"
              }`}
              style={{
                transitionDelay: `${index * 30}ms`,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* CTA Buttons - Independent dari Image Hover */}
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              className={`group/btn relative flex items-center gap-2 px-5 py-2.5 rounded-lg border transition-all duration-300 ${
                isHovered
                  ? "border-blue-500/40 bg-blue-500/10 text-white"
                  : "border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-600 hover:text-white"
              }`}
            >
              <span className="text-sm font-medium">Live Demo</span>
              <ExternalLink
                size={14}
                className={`transition-transform duration-300 ${
                  isHovered ? "translate-x-0.5" : ""
                }`}
              />
            </Link>
          )}

          {project.repoUrl && (
            <Link
              href={project.repoUrl}
              target="_blank"
              className={`group/btn relative flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-300 ${
                isHovered
                  ? "border-gray-600 bg-black/30 text-white"
                  : "border-gray-800 bg-black/20 text-gray-400 hover:border-gray-700 hover:text-gray-300"
              }`}
            >
              <Github
                size={14}
                className={`transition-transform duration-300 ${
                  isHovered ? "scale-105" : ""
                }`}
              />
              <span className="text-sm font-medium">Code</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
