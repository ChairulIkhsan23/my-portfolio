"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Sparkles,
  Zap,
  Clock,
  Target,
  TrendingUp,
  Users,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

/* ======================
   Types
====================== */

type ExperienceItem = {
  period: string;
  title?: string;
  role?: string;
  institution?: string;
  organization?: string;
  description: string;
  highlights: string[];
};

type AboutProps = {
  experienceData: {
    academic: ExperienceItem[];
    organization: ExperienceItem[];
  };
};

/* ======================
   Motion Variants
====================== */

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideIn: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    transition: { duration: 0.3 },
  }),
};

const scaleUp: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ======================
   Experience Card Component
====================== */

function ExperienceCard({
  item,
  type,
  direction,
}: {
  item: ExperienceItem;
  type: "academic" | "organization";
  direction: number;
}) {
  const Icon = type === "academic" ? GraduationCap : Briefcase;
  const title = type === "academic" ? item.title : item.role;
  const subtitle = type === "academic" ? item.institution : item.organization;

  return (
    <motion.div
      custom={direction}
      variants={slideIn}
      initial="enter"
      animate="center"
      exit="exit"
      className="relative group h-full"
    >
      <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden h-full flex flex-col hover:border-gray-700 transition-all duration-300">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Header */}
        <div className="p-6 border-b border-gray-800 relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-800 rounded-lg group-hover:bg-gray-700 transition-colors duration-300">
                <Icon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <span className="text-sm text-gray-400">
                  {type === "academic" ? "Academic" : "Organizational"}
                </span>
                <h3 className="font-semibold text-xl text-white mt-1">
                  {title}
                </h3>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{item.period}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 relative z-10">
          {/* Institution/Organization */}
          <div>
            <h4 className="font-medium text-lg text-white mb-2">{subtitle}</h4>
            <p className="text-gray-400 leading-relaxed">{item.description}</p>
          </div>

          {/* Highlights */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <p className="text-lg font-medium text-white">Key Highlights</p>
            </div>
            <ul className="space-y-3">
              {item.highlights.map((highlight, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-3 text-gray-300 group/item"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 shrink-0" />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ======================
   Carousel Component
====================== */

function ExperienceCarousel({
  items,
  type,
}: {
  items: ExperienceItem[];
  type: "academic" | "organization";
}) {
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const [isHovered, setIsHovered] = useState(false);
  const total = items.length;

  const paginate = (dir: number) => {
    setPage([page + dir, dir]);
  };

  const index = ((page % total) + total) % total;

  return (
    <div
      className="relative h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-full mb-4">
        <AnimatePresence mode="wait" custom={direction}>
          <ExperienceCard
            key={page}
            item={items[index]}
            type={type}
            direction={direction}
          />
        </AnimatePresence>
      </div>

      {/* Navigation */}
      {total > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const dir = i > index ? 1 : -1;
                  setPage([i, dir]);
                }}
                className="relative"
              >
                <motion.div
                  animate={{
                    scale: i === index ? 1.2 : 1,
                    backgroundColor: i === index ? "#3b82f6" : "#374151",
                  }}
                  className="w-3 h-3 rounded-full transition-colors"
                />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(-1)}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => paginate(1)}
              className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ======================
   Approach Item Component
====================== */

function ApproachItem({
  title,
  description,
  icon: Icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  index: number;
}) {
  return (
    <motion.div
      variants={scaleUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className="group relative p-6 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300"
        >
          <Icon className="w-8 h-8 text-blue-400" />
        </motion.div>
        <h4 className="text-xl font-semibold text-white mb-3">{title}</h4>
        <p className="text-gray-400">{description}</p>
      </div>
    </motion.div>
  );
}

/* ======================
   Main About Section
====================== */

export default function About({ experienceData }: AboutProps) {
  const approachItems = [
    {
      title: "User-Centered Design",
      description: "Fokus membuat pengalaman yang nyaman dan mudah dipahami.",
      icon: Target,
    },
    {
      title: "Scalable Systems",
      description:
        "Membangun sistem yang berkelanjutan dan bisa dikembangkan ke depannya.",
      icon: TrendingUp,
    },
    {
      title: "Team Collaboration",
      description: "Bekerja secara efektif dengan tim.",
      icon: Users,
    },
    {
      title: "Continuous Innovation",
      description: "Selalu mengeksplorasi teknologi dan metode baru.",
      icon: Zap,
    },
  ];

  return (
    <section id="about" className="relative py-20 bg-black overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16 relative z-10
"
      >
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/50 backdrop-blur-sm rounded-full border border-gray-800 mb-8"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-300 uppercase tracking-wider">
              Experience & Expertise
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Crafting{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
              Digital Excellence
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Memadukan kemampuan teknis dan pengalaman praktis dalam setiap
            pengembangan solusi digital.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Experience */}
          <div className="space-y-12">
            {/* Academic Experience */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Academic Journey
                </h3>
              </div>
              <ExperienceCarousel
                items={experienceData.academic}
                type="academic"
              />
            </motion.div>

            {/* Organizational Experience */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
                  <Briefcase className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Organizational Experience
                </h3>
              </div>
              <ExperienceCarousel
                items={experienceData.organization}
                type="organization"
              />
            </motion.div>
          </div>

          {/* Right Column - Approach */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="space-y-12"
          >
            {/* Development Approach */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800">
                  <Zap className="w-8 h-8 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">
                  Development Approach
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {approachItems.map((item, index) => (
                  <ApproachItem key={index} {...item} index={index} />
                ))}
              </div>
            </div>

            {/* Stats */}
            <motion.div
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="p-8 bg-linear-to-br from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl border border-gray-800"
            >
              <h4 className="text-2xl font-bold text-white text-center mb-8">
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">
                  By the Numbers
                </span>
              </h4>
              <div className="grid grid-cols-3 gap-6">
                {[
                  {
                    label: "Projects",
                    value: "3+",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    label: "Years",
                    value: "1+",
                    color: "from-purple-500 to-pink-500",
                  },
                  {
                    label: "Technologies",
                    value: "5+",
                    color: "from-amber-500 to-orange-500",
                  },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div
                      className={`text-4xl font-bold bg-linear-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
