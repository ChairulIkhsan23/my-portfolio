"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, FileText } from "lucide-react";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // Handle scroll untuk active section dan navbar background
  useEffect(() => {
    const handleScroll = () => {
      // Ubah background navbar saat scroll
      setIsScrolled(window.scrollY > 20);

      // Deteksi section yang sedang aktif
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100; // Offset untuk navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveItem(navItems[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveItem(id);
    setIsOpen(false);
  };

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0, 0, 0.2, 1],
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    closed: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0, 0, 0.2, 1],
      },
    },
  };

  const transitionConfig = {
    type: "spring" as const,
    stiffness: 500,
    damping: 30,
  };

  const hoverTransition = {
    duration: 0.3,
    ease: "easeInOut" as const,
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex items-center"
          >
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                setActiveItem("");
              }}
              className="font-bold text-2xl tracking-tight hover:opacity-80 transition-opacity"
              style={{ fontFamily: "'Sora', sans-serif" }}
            >
              Portfolio
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            {/* Menu Items */}
            <div className="flex items-center space-x-10">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  className="relative text-base font-medium transition-colors"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    color: activeItem === item.id ? "#000000" : "#374151", // black for active, gray-700 for inactive
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeItem === item.id && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 h-0.5 bg-black -bottom-1"
                      initial={false}
                      transition={transitionConfig}
                    />
                  )}
                  {/* Hover underline */}
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-black -bottom-1 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={hoverTransition}
                  />
                </motion.button>
              ))}
            </div>

            {/* Resume Button */}
            <motion.a
              href="/resume-ikhsan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors"
              style={{ fontFamily: "'Sora', sans-serif" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.3,
                ease: "easeOut",
              }}
            >
              <FileText
                size={18}
                className="transition-transform group-hover:rotate-12"
              />
              <span className="font-medium">Resume</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-6 py-8 space-y-6">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  variants={itemVariants}
                  className={`block w-full text-left text-lg font-medium py-3 transition-colors ${
                    activeItem === item.id
                      ? "text-black font-semibold"
                      : "text-gray-700"
                  }`}
                  style={{ fontFamily: "'Sora', sans-serif" }}
                  whileHover={{ x: 10 }}
                >
                  {item.label}
                  {activeItem === item.id && (
                    <div className="w-2 h-2 bg-black rounded-full mt-1" />
                  )}
                </motion.button>
              ))}
              <motion.a
                href="/resume-ikhsan.pdf"
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-colors"
                style={{ fontFamily: "'Sora', sans-serif" }}
              >
                <FileText size={18} />
                <span className="font-medium">Resume</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;
