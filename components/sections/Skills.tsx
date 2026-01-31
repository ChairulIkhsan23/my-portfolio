"use client";

import { motion, Variants } from "framer-motion";
import { skills } from "@/constants/skills";

export default function Skills() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 20,
      },
    },
  };

  const hoverVariants: Variants = {
    hover: {
      y: -8,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const iconVariants: Variants = {
    initial: { rotate: 0 },
    hover: {
      rotate: 12,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
  };

  return (
    <section id="skills" className="py-16 bg-white">
      {/* Menggunakan py-16 untuk padding atas dan bawah sama */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title with subtle animation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h1 className="text-5xl font-light text-gray-900 mb-3 tracking-tight">
            Skills & <span className="font-semibold">Expertise</span>
          </h1>
          <div className="w-20 h-0.5 bg-gray-200 mx-auto" />
          <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
            Tools dan teknologi yang digunakan dalam pengembangan
          </p>
        </motion.div>

        {/* Skills Grid with clean animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
        >
          {skills.map((skill) => {
            const Icon = skill.icon;

            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover="hover"
                className="group"
              >
                {/* Main card */}
                <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Icon with micro-rotation */}
                  <motion.div
                    variants={iconVariants}
                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center"
                  >
                    <Icon className="text-3xl text-gray-800" />
                  </motion.div>

                  {/* Skill name */}
                  <h3 className="text-center font-semibold text-gray-900 mb-1 text-lg">
                    {skill.name}
                  </h3>

                  {/* Category indicator */}
                  <div className="flex justify-center">
                    <span className="text-sm text-gray-500">
                      {skill.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
