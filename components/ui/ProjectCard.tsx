"use client";

import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  Zap,
} from "lucide-react";
import { useState, useRef } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";

interface ProjectCardProps {
  project: Project;
  order: number;
}

export default function ProjectCard({ project, order }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isAlternate = order % 2 === 0;

  // Mouse position tracking untuk efek spotlight
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics untuk smooth animation
  const springConfig = { stiffness: 300, damping: 25 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  const scale = useSpring(1, { stiffness: 200, damping: 20 });
  const imageScale = useSpring(1, { stiffness: 150, damping: 15 });

  // Transform untuk efek parallax
  const translateX = useTransform(mouseX, [-200, 200], [-12, 12]);
  const translateY = useTransform(mouseY, [-200, 200], [-12, 12]);

  // Gradient mask berdasarkan mouse position
  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.4), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({ x, y });

    // Calculate 3D rotation
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateYValue = ((x - centerX) / centerX) * 4;
    const rotateXValue = ((centerY - y) / centerY) * 4;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
    scale.set(1.02);
    imageScale.set(1.04);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
    imageScale.set(1);
  };

  // Particle effects data
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 0.4,
  }));

  return (
    <motion.div
      ref={cardRef}
      className={`relative flex flex-col lg:flex-row gap-6 lg:gap-8 items-center mb-16 ${
        isAlternate ? "lg:flex-row-reverse" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale,
      }}
      initial={{ opacity: 0, y: 60, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        opacity: { duration: 0.5 },
      }}
      whileHover={{
        transition: { type: "spring", stiffness: 300, damping: 25 },
      }}
    >
      {/* Glow effect background */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 -z-10"
        animate={{
          opacity: isHovered ? 0.12 : 0,
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.18), transparent 45%)`,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Floating particles */}
      {isHovered &&
        particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-0.5 h-0.5 bg-blue-400/25 rounded-full -z-10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.7, 0],
              y: [0, -15],
            }}
            transition={{
              duration: 1.8,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: Math.random() * 1.5,
            }}
          />
        ))}

      {/* Image Section dengan efek glass morphism */}
      <motion.div
        className="w-full lg:w-6/12 relative"
        style={{
          translateX: isAlternate ? translateX : translateX,
          translateY,
        }}
      >
        {/* Glowing border effect */}
        <motion.div
          className="absolute -inset-0.5 rounded-2xl opacity-0"
          animate={{
            opacity: isHovered ? 0.9 : 0,
            background: "linear-linear(45deg, #3b82f6, #8b5cf6, #ec4899)",
          }}
          transition={{ duration: 0.3 }}
          style={{ filter: "blur(10px)" }}
        />

        <div className="relative rounded-xl overflow-hidden border border-gray-800/50 bg-gray-900/20 backdrop-blur-sm">
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 opacity-0"
            animate={{ opacity: isHovered ? 0.25 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background: maskImage,
              mixBlendMode: "overlay",
            }}
          />

          {/* Main image container dengan shine effect */}
          <div className="relative aspect-video overflow-hidden">
            {project.imageUrl ? (
              <motion.div
                ref={imageRef}
                className="relative w-full h-full"
                style={{ scale: imageScale }}
              >
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  width={1000}
                  height={562}
                  unoptimized
                  className="w-full h-full object-cover"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-linear-linear(to-b, transparent 60%, rgba(0,0,0,0.75))" />
              </motion.div>
            ) : (
              <div className="w-full h-full bg-linear-linear(135deg, #1f2937, #111827)" />
            )}
          </div>

          {/* Interactive floating elements */}
          <motion.div
            className="absolute top-3 left-3"
            initial={{ opacity: 0, y: -8, scale: 0.8 }}
            animate={{
              opacity: isHovered ? 1 : 0.7,
              y: isHovered ? 0 : -4,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/75 backdrop-blur-sm rounded-lg border border-white/10">
              <Sparkles size={10} className="text-yellow-400" />
              <span className="text-xs font-semibold bg-linear-linear(to-r, #fbbf24, #f59e0b) bg-clip-text text-transparent">
                FEATURED
              </span>
            </div>
          </motion.div>

          {/* Live preview badge */}
          <motion.div
            className="absolute bottom-3 right-3"
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: isHovered ? 1 : 0.7, x: isHovered ? 0 : 8 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-linear-linear(to-r, rgba(59, 130, 246, 0.18), rgba(139, 92, 246, 0.18)) backdrop-blur-sm rounded-lg border border-blue-500/25">
              <ArrowUpRight size={11} className="text-blue-400" />
              <span className="text-xs font-semibold text-white">Preview</span>
              <Zap size={9} className="text-yellow-400 animate-pulse" />
            </div>
          </motion.div>

          {/* Corner accents */}
          <motion.div
            className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-500/35"
            initial={{ opacity: 0, width: 0, height: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.25, width: 24, height: 24 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-500/35"
            initial={{ opacity: 0, width: 0, height: 0 }}
            animate={{ opacity: isHovered ? 1 : 0.25, width: 24, height: 24 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        </div>

        {/* Floating tech stack preview */}
        <motion.div
          className="absolute -bottom-5 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 15 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex gap-1.5 px-3 py-1.5 bg-gray-900/85 backdrop-blur-sm rounded-lg border border-gray-700/45 shadow-md">
            {project.techStack?.slice(0, 3).map((tech, idx) => (
              <motion.div
                key={tech}
                className="text-xs font-medium text-gray-300"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
              >
                {tech}
              </motion.div>
            ))}
            {project.techStack && project.techStack.length > 3 && (
              <div className="text-xs text-gray-500 ml-1">
                +{project.techStack.length - 3}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Content Section */}
      <motion.div
        className="w-full lg:w-6/12 relative"
        initial={{ opacity: 0, x: isAlternate ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      >
        {/* Project indicator dengan animasi */}
        <motion.div
          className="mb-6"
          whileHover={{ scale: 1.03, rotate: isHovered ? 0.5 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="inline-flex items-center gap-2">
            <motion.div
              className="w-8 h-0.5 bg-linear-linear(to-r, #3b82f6, #8b5cf6)"
              animate={isHovered ? { width: ["2rem", "2.5rem", "2rem"] } : {}}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/35 backdrop-blur-sm border border-gray-800/50">
              <span className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                Project
              </span>
              <motion.span
                className="text-sm font-black bg-linear-linear(to-r, #60a5fa, #a78bfa) bg-clip-text text-transparent"
                animate={isHovered ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                {order.toString().padStart(2, "0")}
              </motion.span>
            </div>
            <motion.div
              className="w-8 h-0.5 bg-linear-linear(to-r, #8b5cf6, #3b82f6)"
              animate={isHovered ? { width: ["2rem", "2.5rem", "2rem"] } : {}}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.15 }}
            />
          </div>
        </motion.div>

        {/* Title dengan efek typography */}
        <motion.h3
          className="text-2xl md:text-3xl font-bold mb-4 tracking-tight"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <span className="bg-linear-linear(to-r, #ffffff, #e5e7eb) bg-clip-text text-transparent">
            {project.title}
          </span>
          <motion.div
            className="h-0.5 w-0 mt-2 bg-linear-linear(to-r, #3b82f6, #ec4899)"
            animate={isHovered ? { width: "100%" } : { width: "35%" }}
            transition={{ duration: 0.4 }}
          />
        </motion.h3>

        {/* Description dengan efek reveal */}
        <motion.p
          className="text-gray-400 mb-6 leading-relaxed text-sm"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          {project.description}
        </motion.p>

        {/* Tech Stack dengan efek hover cascade */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">
            TECH STACK
          </div>
          <div className="flex flex-wrap gap-2">
            {project.techStack?.map((tech, index) => (
              <motion.span
                key={tech}
                className={`px-3 py-1.5 rounded-md text-xs font-medium border backdrop-blur-sm cursor-pointer ${
                  isHovered
                    ? "bg-white/5 border-white/20 text-white"
                    : "bg-black/25 border-gray-800/50 text-gray-400"
                }`}
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.25,
                  delay: index * 0.04,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -2,
                  backgroundColor: "rgba(59, 130, 246, 0.1)",
                  borderColor: "rgba(59, 130, 246, 0.25)",
                  color: "#ffffff",
                  transition: { duration: 0.15 },
                }}
                animate={
                  isHovered
                    ? {
                        y: [0, -1.5, 0],
                        transition: {
                          duration: 0.8,
                          delay: index * 0.08,
                          repeat: Infinity,
                          repeatType: "reverse",
                        },
                      }
                    : {}
                }
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* CTA Buttons dengan efek glass morphism */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          {project.liveUrl && (
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={project.liveUrl}
                target="_blank"
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-lg border backdrop-blur-sm overflow-hidden"
              >
                {/* Animated background */}
                <motion.div
                  className="absolute inset-0 bg-linear-linear(45deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))"
                  animate={
                    isHovered
                      ? {
                          background: [
                            "linear-linear(45deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))",
                            "linear-linear(45deg, rgba(59, 130, 246, 0.25), rgba(139, 92, 246, 0.25))",
                            "linear-linear(45deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.15))",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Border glow */}
                <motion.div
                  className="absolute inset-0 rounded-lg border border-transparent"
                  animate={{
                    borderColor: isHovered
                      ? "rgba(59, 130, 246, 0.4)"
                      : "rgba(255, 255, 255, 0.08)",
                  }}
                  transition={{ duration: 0.2 }}
                />

                <span className="text-sm font-medium text-white relative z-10">
                  Live Demo
                </span>
                <motion.div
                  animate={{
                    x: isHovered ? 3 : 0,
                    rotate: isHovered ? 45 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ExternalLink size={14} className="text-blue-400" />
                </motion.div>

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-linear(90deg, transparent, rgba(255,255,255,0.08), transparent)"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Link>
            </motion.div>
          )}

          {project.repoUrl && (
            <motion.div
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link
                href={project.repoUrl}
                target="_blank"
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-700/50 backdrop-blur-sm bg-black/30 overflow-hidden"
              >
                {/* Animated icon */}
                <motion.div
                  animate={{
                    rotate: isHovered ? [0, 12, -12, 0] : 0,
                    scale: isHovered ? 1.08 : 1,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  <Github size={14} className="text-gray-300" />
                </motion.div>

                <span className="text-sm font-medium text-gray-300">
                  Source Code
                </span>

                {/* Particle effect */}
                {isHovered && (
                  <motion.div
                    className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400/80 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1, 0] }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </Link>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
