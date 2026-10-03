import Image from "next/image";
import Link from "next/link";
import profileImage from "../images/profile1.jpeg";
import heroBackground from "../images/hero-background.png";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section
      id="home"
      className={styles.hero}
      style={{ backgroundImage: `url(${heroBackground.src})` }}
    >
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.dotGrid} aria-hidden="true" />

      <aside className={styles.socialBar} aria-label="Social links">
        {/* Discord - replaced LinkedIn */}
        <a
          href="https://discord.com/users/1327249953285996705"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
        >
          <i className="fab fa-discord" aria-hidden="true" />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/Webdeveloper-2407"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <i className="fab fa-github" aria-hidden="true" />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/developer.2407?stkn=Z3Z2MTR2eWhpa2Jn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <i className="fab fa-instagram" aria-hidden="true" />
        </a>

        {/* Email - unchanged */}
        <a href="#contact" aria-label="Email">
          <i className="far fa-envelope" aria-hidden="true" />
        </a>

        <span className={styles.socialLine} aria-hidden="true" />
      </aside>

      <div className={styles.heroInner}>
        <div className={styles.heroContent}>
          <div className={styles.eyebrow}>
            <span>WELCOME TO</span>
            <span className={styles.eyebrowGradient}>MY PORTFOLIO</span>
            <i aria-hidden="true" />
          </div>

          <h1>
            Hello, I&apos;m
            <span>Ahmad Azeem</span>
          </h1>

          <h2>
            Web Developer &amp; <span>Creative Designer</span>
          </h2>

          <p>
            Passionate about creating modern websites and user-friendly digital
            experiences. I turn ideas into clean, responsive and impactful
            designs.
          </p>

          <div className={styles.buttonRow}>
            <Link
              href="#contact"
              className={`${styles.primaryButton} ${styles.button}`}
            >
              <span>Hire Me</span>
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>

            <Link
              href="#projects"
              className={`${styles.secondaryButton} ${styles.button}`}
            >
              <span>View Projects</span>
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <i className="fas fa-code" aria-hidden="true" />
              <strong>20+</strong>
              <span>Projects Completed</span>
            </div>

            <div className={styles.statItem}>
              <i className="fas fa-users" aria-hidden="true" />
              <strong>15+</strong>
              <span>Happy Clients</span>
            </div>

            <div className={styles.statItem}>
              <i className="fas fa-trophy" aria-hidden="true" />
              <strong>2+</strong>
              <span>Years Experience</span>
            </div>
          </div>
        </div>

        <div className={styles.visual}>
          <div
            className={`${styles.orbit} ${styles.orbitOne}`}
            aria-hidden="true"
          />

          <div
            className={`${styles.orbit} ${styles.orbitTwo}`}
            aria-hidden="true"
          />

          <div className={styles.backCardOne} aria-hidden="true" />
          <div className={styles.backCardTwo} aria-hidden="true" />

          <div className={styles.portraitFrame}>
            <div
              className={styles.portraitBlur}
              style={{ backgroundImage: `url(${profileImage.src})` }}
              aria-hidden="true"
            />

            <div className={styles.portraitBorder}>
              <Image
                src={profileImage}
                alt="Ahmad Azeem"
                fill
                priority
                sizes="(max-width: 820px) 75vw, 40vw"
                className={styles.portrait}
              />

              <div className={styles.portraitShade} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.signature} aria-hidden="true">
            <span>Ahmad</span>
            <span>Azeem</span>
          </div>

          <span className={styles.orbitDot} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}