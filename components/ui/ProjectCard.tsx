"use client";

import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { useState, useRef } from "react";
import { motion, useSpring, useTransform } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  order: number;
}

export default function ProjectCard({ project, order }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isAlternate = order % 2 === 0;

  // Parallax effect untuk mouse movement
  const springConfig = { stiffness: 150, damping: 15 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    setMousePosition({ x: mouseX, y: mouseY });

    // Parallax values
    const parallaxX = mouseX / 40;
    const parallaxY = mouseY / 40;
    const rotateXValue = (mouseY / rect.height) * 10;
    const rotateYValue = (mouseX / rect.width) * -10;

    x.set(parallaxX);
    y.set(parallaxY);
    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex flex-col lg:flex-row gap-12 lg:gap-16 items-center ${
        isAlternate ? "lg:flex-row-reverse" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0.32, 1.15] }}
    >
      {/* Image Section dengan efek 3D */}
      <div className="w-full lg:w-6/12 xl:w-6/12 perspective-1000">
        <motion.div
          style={{
            x,
            y,
            rotateX,
            rotateY,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        >
          <div className="relative">
            {/* Floating Elements */}
            {isHovered && (
              <>
                <motion.div
                  className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.div
                  className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-500/3 rounded-full blur-2xl -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </>
            )}

            {/* Main Image Container */}
            <div className="relative rounded-2xl overflow-hidden">
              {/* Image Border Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl border border-transparent bg-linear-to-r from-blue-500/20 via-transparent to-purple-500/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Image dengan efek paralaks */}
              <div className="relative bg-linear-to-br from-gray-900/50 to-black/50 aspect-video w-full overflow-hidden">
                {project.imageUrl ? (
                  <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: isHovered ? 1 : 1.1 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.43, 0.13, 0.23, 0.96],
                    }}
                    className="w-full h-full"
                  >
                    <Image
                      src={project.imageUrl}
                      alt={project.title}
                      width={800}
                      height={450}
                      unoptimized
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900" />
                )}
              </div>

              {/* Dynamic linear Overlay */}
              <motion.div
                className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: isHovered ? 0.7 : 0.3 }}
                transition={{ duration: 0.5 }}
              />

              {/* Interactive Light Effect */}
              <motion.div
                className="absolute inset-0 opacity-0"
                animate={{
                  opacity: isHovered ? 0.15 : 0,
                  background: `radial-linear(circle at ${mousePosition.x + 50}px ${mousePosition.y + 50}px, rgba(59, 130, 246, 0.3), transparent 70%)`,
                }}
                transition={{ duration: 0.1 }}
              />

              {/* Floating Preview Button */}
              <motion.div
                className="absolute top-4 right-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-1 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-full">
                  <ArrowUpRight size={12} className="text-blue-400" />
                  <span className="text-xs font-medium text-white">
                    Preview
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Decorative Accents */}
            <motion.div
              className="absolute -bottom-3 -left-3 w-6 h-6 border-l-2 border-t-2 border-blue-500/50"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="absolute -top-3 -right-3 w-6 h-6 border-r-2 border-b-2 border-purple-500/50"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          </div>
        </motion.div>
      </div>

      {/* Content Section */}
      <motion.div
        className="w-full lg:w-6/12 xl:w-6/12"
        initial={{ opacity: 0, x: isAlternate ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Project Number dengan efek floating */}
        <motion.div
          className="mb-6"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg backdrop-blur-sm transition-all duration-500 ${
              isHovered
                ? "bg-white/10 border border-white/10 text-white shadow-lg shadow-blue-500/10"
                : "bg-gray-900/30 border border-gray-800/50 text-gray-400"
            }`}
          >
            <motion.span
              className="text-xs font-medium tracking-wider"
              animate={isHovered ? { x: [0, -2, 0] } : {}}
              transition={{
                duration: 0.5,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 2,
              }}
            >
              PROJECT
            </motion.span>
            <span className="text-sm font-bold tracking-tight bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {order.toString().padStart(2, "0")}
            </span>
          </div>
        </motion.div>

        {/* Title dengan efek linear */}
        <motion.h3
          className="text-3xl md:text-4xl font-bold mb-6 bg-linear-to-r from-white via-white to-gray-400 bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {project.title}
        </motion.h3>

        {/* Description dengan efek fade in */}
        <motion.p
          className="text-gray-400 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {project.description}
        </motion.p>

        {/* Tech Stack dengan efek stagger */}
        <div className="flex flex-wrap gap-2 mb-10">
          {project.techStack?.map((tech, index) => (
            <motion.span
              key={tech}
              className={`px-3 py-1.5 rounded-md text-xs font-medium backdrop-blur-sm border transition-all duration-300 ${
                isHovered
                  ? "bg-white/5 border-white/10 text-white"
                  : "bg-black/20 border-gray-800 text-gray-400"
              }`}
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.1,
                y: -2,
                borderColor: "rgba(59, 130, 246, 0.3)",
              }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* CTA Buttons dengan efek magnetic */}
        <div className="flex flex-wrap gap-3">
          {project.liveUrl && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={project.liveUrl}
                target="_blank"
                className={`group/btn relative flex items-center gap-2 px-5 py-2.5 rounded-lg border backdrop-blur-sm transition-all duration-300 overflow-hidden ${
                  isHovered
                    ? "border-blue-500/40 bg-blue-500/10 text-white"
                    : "border-gray-700 bg-gray-900/50 text-gray-300 hover:border-gray-600 hover:text-white"
                }`}
              >
                {/* Background shine effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-blue-500/10 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="text-sm font-medium relative z-10">
                  Live Demo
                </span>
                <motion.div
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ExternalLink size={14} />
                </motion.div>
              </Link>
            </motion.div>
          )}

          {project.repoUrl && (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={project.repoUrl}
                target="_blank"
                className={`group/btn relative flex items-center gap-2 px-4 py-2.5 rounded-lg border backdrop-blur-sm transition-all duration-300 overflow-hidden ${
                  isHovered
                    ? "border-gray-600 bg-black/40 text-white"
                    : "border-gray-800 bg-black/20 text-gray-400 hover:border-gray-700 hover:text-gray-300"
                }`}
              >
                {/* Background shine effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Github size={14} />
                </motion.div>
                <span className="text-sm font-medium relative z-10">Code</span>
              </Link>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
