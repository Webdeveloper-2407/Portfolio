import styles from "./Skills.module.css";
import Projects from "../Projects/Projects";

const skills = [
  { icon: "fab fa-html5", name: "HTML5", tone: "html" },
  { icon: "fab fa-css3-alt", name: "CSS3", tone: "css" },
  { icon: "fab fa-js", name: "JavaScript", tone: "javascript" },
  { icon: "fab fa-bootstrap", name: "Bootstrap", tone: "bootstrap" },
];

export default function Skills() {
  return (
    <section id="skills" className={styles.showcase}>
      <div className={styles.showcaseInner}>
        <div className={styles.sectionHeading}>
          <h2>
            My <span>Skills</span>
          </h2>

          <div className={styles.headingDivider} aria-hidden="true">
            <span />
          </div>
        </div>

        <div className={styles.skillGrid}>
          {skills.map((skill) => (
            <article
              className={`${styles.skillCard} ${styles[skill.tone]}`}
              key={skill.name}
            >
              <div className={styles.skillOrbit} aria-hidden="true">
                <span className={styles.orbitDot} />

                <span className={styles.skillIcon}>
                  <i className={skill.icon} />
                </span>
              </div>

              <h3>{skill.name}</h3>

              <span className={styles.cardAccent} aria-hidden="true" />
            </article>
          ))}
        </div>

        <Projects />
      </div>
    </section>
  );
}
