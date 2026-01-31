"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ChevronDown, Sparkles } from "lucide-react";

/* ======================
   Custom Hooks
====================== */

function useTypewriter(text: string, speed = 50, loop = false) {
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const typingSpeed = isDeleting ? speed / 2 : speed;

  useEffect(() => {
    const handleTyping = () => {
      const fullText = text;

      setDisplayText(
        isDeleting
          ? fullText.substring(0, displayText.length - 1)
          : fullText.substring(0, displayText.length + 1)
      );

      if (!isDeleting && displayText === fullText) {
        if (loop) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, text, typingSpeed, loop]);

  return displayText;
}

function useDecryptText(text: string, speed = 30) {
  const [output, setOutput] = useState("");
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      setOutput(
        text
          .split("")
          .map((char, i) => {
            if (i < frame) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      frame++;
      if (frame > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return output;
}

/* ======================
   Simple Code Component
====================== */

function SimpleCodeDisplay() {
  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800 bg-gray-900 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
          <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
        </div>
        <span className="text-xs text-gray-400 font-mono ml-2">
          portfolio.ts
        </span>
      </div>

      {/* Code Content */}
      <div className="p-6 font-mono text-sm">
        <div className="space-y-3 text-gray-300">
          <div>
            <span className="text-purple-400">interface</span>{" "}
            <span className="text-blue-400">Developer</span> {"{"}
          </div>
          <div className="ml-4">
            <span className="text-gray-400">name:</span>{" "}
            <span className="text-green-400">"Chairul Ikhsan"</span>,
          </div>
          <div className="ml-4">
            <span className="text-gray-400">role:</span>{" "}
            <span className="text-green-400">"Web Developer"</span>,
          </div>
          <div className="ml-4">
            <span className="text-gray-400">focus:</span>{" "}
            <span className="text-green-400">"Web Development"</span>,
          </div>
          <div className="ml-4">
            <span className="text-gray-400">technologies:</span> [
            <div className="ml-4 space-y-1">
              <div className="text-amber-300">"React & Next.js, Laravel"</div>
              <div className="text-amber-300">
                "Html, CSS, TypeScript, Javascript, PHP"
              </div>
              <div className="text-amber-300">"Tailwind CSS, Bootstrap 5"</div>
            </div>
            ]
          </div>
          <div>{"}"}</div>
        </div>

        {/* Animated Cursor */}
        <motion.div
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="mt-4 flex items-center gap-2 text-gray-500"
        >
          <span className="text-green-400">$</span>
          <span className="flex-1">npm run build</span>
          <span className="animate-pulse">▋</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ======================
   Hero Section - MODIFIED FOR ALIGNMENT
====================== */

export default function Hero() {
  const nameText = useTypewriter("Chairul Ikhsan", 100, true);
  const role = useDecryptText("Web Developer Enthusiast", 40);

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/ChairulIkhsan23",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/chairul-ikhsan-204b0927a",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:chairulikhsan23@student.polindra.ac.id",
      label: "Email",
    },
  ];

  return (
    <section
      className="relative bg-white"
      style={{
        height: "80vh",
        overflow: "hidden",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Name & Role */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-8 bg-gray-900" />
                <span className="text-sm font-medium text-gray-500 tracking-wider uppercase">
                  Hello, I'm
                </span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="ml-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-500" />
                </motion.div>
              </div>

              {/* NAMA UTAMA */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
                {nameText}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="ml-1"
                >
                  ▍
                </motion.span>
              </h1>

              {/* ROLE/TITLE */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-xl lg:text-2xl text-gray-600 font-medium"
              >
                {role}
              </motion.p>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 max-w-lg leading-relaxed text-base lg:text-lg"
            >
              Saya memiliki minat besar di bidang teknologi, khususnya dalam
              pengembangan solusi digital. Dengan semangat untuk terus
              berkembang, saya berfokus menciptakan solusi yang inovatif dan
              berkelanjutan.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="pt-4"
            >
              <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="group flex items-center gap-2 text-gray-700 hover:text-gray-900 
                               transition-all duration-300 hover:scale-105"
                    whileHover={{ x: 5 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.1 }}
                  >
                    <div
                      className="p-2.5 bg-gray-50 rounded-lg border border-gray-200 
                                    group-hover:bg-gray-100 transition-colors duration-300
                                    group-hover:shadow-md group-hover:border-gray-300"
                    >
                      <link.icon size={20} />
                    </div>
                    <span className="text-sm font-medium">{link.label}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT - Simple Code Display */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="hidden lg:block"
          >
            <SimpleCodeDisplay />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - MENYESUAIKAN POSISI */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex justify-center pb-8 pt-4"
      >
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-2 tracking-wider uppercase">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </motion.div>

      {/* Background Accent Lines - OPTIONAL */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
    </section>
  );
}
