import styles from "./Projects.module.css";

const projects = [
  {
    title: "Portfolio Website",
    description: "Responsive personal portfolio website.",
    icon: "fas fa-laptop",
    tone: "portfolio",
    link: "https://portfolio-damo.vercel.app/",
  },
  {
    title: "Business Website",
    description: "Modern business landing page design.",
    icon: "fas fa-building",
    tone: "business",
  },
  {
    title: "E-Commerce UI",
    description: "Online store interface with modern design.",
    icon: "fas fa-cart-shopping",
    tone: "commerce",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className={styles.projectsSection}
      aria-labelledby="projects-title"
    >
      <div className={styles.sectionHeading}>
        <h2 id="projects-title">
          Pro<span>jects</span>
        </h2>

        <div className={styles.headingDivider} aria-hidden="true">
          <span />
        </div>
      </div>

      <div className={styles.projectGrid}>
        {projects.map((project) => (
          <article
            className={`${styles.projectCard} ${styles[project.tone]}`}
            key={project.title}
          >
            <span className={styles.projectIcon} aria-hidden="true">
              <i className={project.icon} />
            </span>

            <span className={styles.projectCopy}>
              <strong>{project.title}</strong>
              <span>{project.description}</span>
              <i className={styles.projectAccent} aria-hidden="true" />
            </span>

            {project.link ? (
              <a
                href={project.link}
                className={styles.projectArrow}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title}`}
              >
                <i className="fas fa-arrow-right" />
              </a>
            ) : (
              <span className={styles.projectArrow} aria-hidden="true">
                <i className="fas fa-arrow-right" />
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}