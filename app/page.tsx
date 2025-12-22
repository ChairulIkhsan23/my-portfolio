/* Sections Import */
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

/* Data fetching */
import { fetchExperiences } from "@/lib/fetchExperiences";

/* =========================
   Home Page
========================= */
export default async function Home() {
  // Fetch experience data from API / CMS
  const experienceData = await fetchExperiences();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* About Section (with dynamic data) */}
      <About experienceData={experienceData} />

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />
    </main>
  );
}
