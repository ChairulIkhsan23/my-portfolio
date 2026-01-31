import { fetchProjects } from "@/lib/fetchProjects";
import ProjectCard from "@/components/ui/ProjectCard";

export default async function Projects() {
  const projects = await fetchProjects();

  if (projects.length === 0) {
    return (
      <section
        id="projects"
        className="w-full bg-black pt-24 pb-48 scroll-mt-24"
      >
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              My Projects
            </h2>
            <p className="text-gray-400 uppercase text-sm tracking-wider mb-12">
              Fullstack Web Applications
            </p>
            <p className="text-gray-500 text-lg">No projects available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="w-full bg-black pt-14 pb-48 scroll-mt-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Projects
          </h2>
          <p className="text-gray-400 text-md tracking-wider">
            Application Projects
          </p>
        </div>

        {/* Project List */}
        <div className="space-y-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} order={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
