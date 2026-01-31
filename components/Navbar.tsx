"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, FileText, ChevronRight } from "lucide-react";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [previousActive, setPreviousActive] = useState<string>("");
  const [scrollPosition, setScrollPosition] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  // Smooth underline transition dengan debouncing
  useEffect(() => {
    if (activeItem && activeItem !== previousActive) {
      setPreviousActive(activeItem);
    }
  }, [activeItem, previousActive]);

  const logoVariants: Variants = {
    initial: { opacity: 1, scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1, ease: "easeInOut" },
    },
  };

  const mobileButtonVariants: Variants = {
    initial: { rotate: 0 },
    animate: { rotate: isOpen ? 180 : 0 },
  };

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: [0.32, 0.72, 0.32, 1.15],
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.32, 0.72, 0.32, 1.15],
        staggerChildren: 0.07,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    closed: {
      opacity: 0,
      x: -30,
      scale: 0.9,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.32, 0.72, 0.32, 1.15],
      },
    },
    hover: {
      x: 8,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle scroll untuk active section dan transparency effect
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollPos = window.scrollY;
          setScrollPosition(currentScrollPos);

          // Navbar menjadi solid saat di-scroll lebih dari 50px
          setIsScrolled(currentScrollPos > 50);

          const sections = navItems.map((item) =>
            document.getElementById(item.id)
          );
          const scrollPositionWithOffset = currentScrollPos + 100;

          for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            if (section) {
              const { offsetTop, offsetHeight } = section;
              if (
                scrollPositionWithOffset >= offsetTop &&
                scrollPositionWithOffset < offsetTop + offsetHeight
              ) {
                setActiveItem(navItems[i].id);
                break;
              }
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hitung opacity berdasarkan scroll position
  const calculateNavbarOpacity = () => {
    // Smooth transition: 0px = 0.2, 50px = 0.95
    const maxOpacity = 0.95;
    const minOpacity = 0.2;
    const threshold = 50;

    if (scrollPosition <= 0) return minOpacity;
    if (scrollPosition >= threshold) return maxOpacity;

    // Linear interpolation
    const progress = scrollPosition / threshold;
    return minOpacity + (maxOpacity - minOpacity) * progress;
  };

  // Hitung blur intensity berdasarkan scroll position
  const calculateBlurIntensity = () => {
    // Smooth blur: 0px = blur-sm, 50px = blur-xl
    const maxBlur = 12; // blur-xl
    const minBlur = 4; // blur-sm
    const threshold = 50;

    if (scrollPosition <= 0) return minBlur;
    if (scrollPosition >= threshold) return maxBlur;

    // Linear interpolation
    const progress = scrollPosition / threshold;
    return minBlur + (maxBlur - minBlur) * progress;
  };

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setActiveItem(id);
    setIsOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setActiveItem("");
  };

  // Config animasi yang lebih smooth untuk underline
  const underlineTransition = {
    type: "spring" as const,
    stiffness: 380,
    damping: 28,
    mass: 0.8,
    restDelta: 0.001,
    restSpeed: 0.01,
  };

  // Alternatif: Tween animation (lebih smooth untuk linear movement)
  const smoothTweenTransition = {
    duration: 0.35,
    ease: [0.25, 0.46, 0.45, 0.94] as const,
  };

  // Variant untuk underline yang lebih smooth
  const underlineVariants: Variants = {
    hidden: {
      scaleX: 0,
      opacity: 0,
      transition: { duration: 0.15 },
    },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: smoothTweenTransition,
    },
  };

  // Variant untuk hover underline
  const hoverUnderlineVariants: Variants = {
    hidden: {
      scaleX: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      scaleX: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  // Dynamic styles based on scroll
  const navbarOpacity = calculateNavbarOpacity();
  const blurIntensity = calculateBlurIntensity();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      ref={menuRef}
      style={{
        // Smooth transition untuk background dengan opacity yang dihitung
        backgroundColor: `rgba(255, 255, 255, ${navbarOpacity})`,
        // Dynamic blur effect
        backdropFilter: `blur(${blurIntensity}px)`,
        // Border dengan opacity yang sesuai
        borderBottom: `1px solid rgba(229, 231, 235, ${navbarOpacity * 0.5})`,
        // Shadow dengan opacity yang sesuai
        boxShadow:
          scrollPosition > 0
            ? `0 4px 6px -1px rgba(0, 0, 0, ${0.05 * navbarOpacity}), 0 2px 4px -1px rgba(0, 0, 0, ${0.03 * navbarOpacity})`
            : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              ease: [0.32, 0.72, 0.32, 1.15],
            }}
            className="flex items-center"
          >
            <motion.button
              onClick={scrollToTop}
              className="font-bold text-2xl tracking-tight hover:opacity-80 transition-all"
              style={{ fontFamily: "'Sora', sans-serif" }}
              variants={logoVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
            >
              <span
                className="bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
                style={{
                  // Text opacity juga menyesuaikan scroll untuk kontras yang lebih baik
                  opacity: 0.9 + (scrollPosition / 100) * 0.1,
                }}
              >
                Portfolio
              </span>
            </motion.button>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {/* Menu Items */}
            <div className="flex items-center space-x-12">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleClick(item.id)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative text-base font-medium py-1 group"
                  style={{
                    fontFamily: "'Sora', sans-serif",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span
                    className={`relative z-10 transition-colors duration-300 ${
                      activeItem === item.id
                        ? "text-gray-900 font-semibold"
                        : hoveredItem === item.id
                          ? "text-gray-800"
                          : "text-gray-600"
                    }`}
                    style={{
                      // Text color menyesuaikan opacity navbar
                      opacity:
                        activeItem === item.id
                          ? 1
                          : 0.7 + (scrollPosition / 100) * 0.3,
                    }}
                  >
                    {item.label}
                  </span>

                  {/* Active underline dengan animasi yang lebih smooth */}
                  {activeItem === item.id ? (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute left-0 right-0 h-3px bg-linear-to-r from-gray-900 to-gray-700 -bottom-1 rounded-full"
                      initial={false}
                      transition={underlineTransition}
                      style={{
                        originX:
                          previousActive === item.id
                            ? 0.5
                            : navItems.findIndex((i) => i.id === item.id) >
                                navItems.findIndex(
                                  (i) => i.id === previousActive
                                )
                              ? 0
                              : 1,
                        opacity: 0.9 + (scrollPosition / 100) * 0.1,
                      }}
                    />
                  ) : (
                    <div className="absolute left-0 right-0 h-3px -bottom-1" />
                  )}

                  {/* Hover underline - lebih smooth dengan keyframes */}
                  <motion.div
                    className="absolute left-0 right-0 h-2px bg-gray-400/40 -bottom-1 origin-left"
                    initial={{ scaleX: 0 }}
                    variants={hoverUnderlineVariants}
                    animate={
                      hoveredItem === item.id && activeItem !== item.id
                        ? "visible"
                        : "hidden"
                    }
                    style={{
                      opacity: 0.4 + (scrollPosition / 100) * 0.6,
                    }}
                  />

                  {/* Glow effect pada hover */}
                  {hoveredItem === item.id && activeItem !== item.id && (
                    <motion.div
                      className="absolute inset-0 -m-2 bg-linear-to-r from-gray-100/30 to-transparent rounded-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        opacity: 0.3 * navbarOpacity,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Resume Button */}
            <motion.a
              href="/resume-ikhsan.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center gap-3 px-7 py-3.5 bg-linear-to-r from-gray-900 to-gray-800 text-white rounded-full hover:shadow-xl transition-all"
              style={{
                fontFamily: "'Sora', sans-serif",
                // Button opacity juga menyesuaikan scroll
                opacity: 0.95 + (scrollPosition / 100) * 0.05,
              }}
              whileHover={{
                scale: 1.05,
                y: -2,
              }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.3,
                duration: 0.4,
                ease: [0.32, 0.72, 0.32, 1.15],
              }}
            >
              <FileText
                size={18}
                className="relative z-10 transition-transform duration-300 group-hover:rotate-12"
              />
              <span className="relative z-10 font-medium">Resume</span>
              <ChevronRight
                size={16}
                className="relative z-10 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
              />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-3 rounded-xl hover:bg-gray-100/50 transition-all relative group"
            whileTap={{ scale: 0.9 }}
            variants={mobileButtonVariants}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              // Button background opacity menyesuaikan navbar
              backgroundColor: `rgba(243, 244, 246, ${navbarOpacity * 0.5})`,
            }}
          >
            <div
              className="absolute inset-0 bg-gray-200/50 rounded-xl group-hover:bg-gray-200 transition-colors"
              style={{
                opacity: navbarOpacity,
              }}
            />
            <motion.div
              className="relative z-10"
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? (
                <X size={24} className="text-gray-800" />
              ) : (
                <Menu size={24} className="text-gray-700" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm md:hidden z-40"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-2xl border border-gray-100/50 shadow-2xl overflow-hidden z-50"
            >
              <div className="px-6 py-8 space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleClick(item.id)}
                    variants={itemVariants}
                    className={`relative group flex items-center justify-between w-full text-left py-4 px-4 rounded-xl transition-all ${
                      activeItem === item.id
                        ? "bg-gray-50 text-gray-900"
                        : "text-gray-700 hover:bg-gray-50/50"
                    }`}
                    style={{ fontFamily: "'Sora', sans-serif" }}
                    whileHover="hover"
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className={`w-2 h-2 rounded-full ${
                          activeItem === item.id
                            ? "bg-linear-to-r from-gray-900 to-gray-700"
                            : "bg-gray-300"
                        }`}
                        animate={{ scale: activeItem === item.id ? 1.2 : 1 }}
                        transition={{ duration: 0.2 }}
                      />
                      <span
                        className={`text-lg font-medium ${
                          activeItem === item.id ? "font-semibold" : ""
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    <ChevronRight
                      size={18}
                      className={`transition-all duration-300 ${
                        activeItem === item.id
                          ? "text-gray-900 opacity-100"
                          : "text-gray-400 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-gray-50/50 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
                  </motion.button>
                ))}
                <motion.div variants={itemVariants} className="pt-4">
                  <motion.a
                    href="/resume-ikhsan.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-center gap-3 w-full px-6 py-4 bg-linear-to-r from-gray-900 to-gray-800 text-white rounded-xl hover:shadow-lg transition-all"
                    style={{ fontFamily: "'Sora', sans-serif" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <FileText
                      size={20}
                      className="transition-transform duration-300 group-hover:rotate-12"
                    />
                    <span className="font-medium">View Resume</span>
                    <motion.div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ChevronRight size={16} />
                    </motion.div>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavigationBar;
