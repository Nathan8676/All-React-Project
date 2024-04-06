import React from "react";

export default function Services() {
  // In your CSS file or within your JSX
  const blueShadowHover = `
hover:filter-hover-blue:hover {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 255, 0.3));
}
`;

  const projects = [
    {
      title: "E-commerce Website",
      description:
        "Built a fully functional e-commerce website using React for the frontend and Node.js with Express for the backend. Implemented features such as user authentication, product search, and cart functionality.",
      githubLink: "https://github.com/username/e-commerce-website",
      liveDemoLink: "https://example.com",
    },
    {
      title: "Portfolio Website",
      description:
        "Designed and developed a personal portfolio website showcasing projects, skills, and contact information. Utilized HTML, CSS, and JavaScript for the frontend.",
      githubLink: "https://github.com/username/portfolio-website",
      liveDemoLink: "https://example.com",
    },
    {
      title: "E-commerce Website",
      description:
        "Built a fully functional e-commerce website using React for the frontend and Node.js with Express for the backend. Implemented features such as user authentication, product search, and cart functionality.",
      githubLink: "https://github.com/username/e-commerce-website",
      liveDemoLink: "https://example.com",
    },
    {
      title: "Portfolio Website",
      description:
        "Designed and developed a personal portfolio website showcasing projects, skills, and contact information. Utilized HTML, CSS, and JavaScript for the frontend.",
      githubLink: "https://github.com/username/portfolio-website",
      liveDemoLink: "https://example.com",
    },
    {
      title: "E-commerce Website",
      description:
        "Built a fully functional e-commerce website using React for the frontend and Node.js with Express for the backend. Implemented features such as user authentication, product search, and cart functionality.",
      githubLink: "https://github.com/username/e-commerce-website",
      liveDemoLink: "https://example.com",
    },
    {
      title: "Portfolio Website",
      description:
        "Designed and developed a personal portfolio website showcasing projects, skills, and contact information. Utilized HTML, CSS, and JavaScript for the frontend.",
      githubLink: "https://github.com/username/portfolio-website",
      liveDemoLink: "https://example.com",
    },
    // Add more projects here...
  ];

  return (
    <div className="services p-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <div
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl hover:filter-hover-blue transition duration-300"
            key={index}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {project.title}
            </h3>
            <p className="text-gray-700 mb-4">{project.description}</p>
            <div className="flex">
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mr-4"
              >
                GitHub
              </a>
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
