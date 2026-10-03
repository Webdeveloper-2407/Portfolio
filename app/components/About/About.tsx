import Image from "next/image";
import Link from "next/link";
import profileImage from "../images/profile2.jpeg";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.aboutInner}>
        <div className={styles.visual} aria-hidden="true">
          <div className={styles.backPanel} />

          <div className={`${styles.orbit} ${styles.orbitOne}`} />
          <div className={`${styles.orbit} ${styles.orbitTwo}`} />

          <span className={`${styles.orbitDot} ${styles.orbitDotOne}`} />
          <span className={`${styles.orbitDot} ${styles.orbitDotTwo}`} />
          <span className={`${styles.orbitDot} ${styles.orbitDotThree}`} />

          <div className={styles.photoGlow} />

          <div className={styles.photoFrame}>
            <div className={styles.photoInner}>
              <Image
                src={profileImage}
                alt="Ahmad Azeem"
                fill
                priority
                sizes="(max-width: 820px) 76vw, 456px"
                className={styles.photo}
              />

              <div className={styles.photoShade} />
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.eyebrow}>
            <span>GET TO KNOW ME</span>
            <i aria-hidden="true" />
          </div>

          <h2>
            About <span>Me</span>
          </h2>

          <div className={styles.headingAccent} aria-hidden="true">
            <span />
          </div>

          <p className={styles.description}>
            My name is Ahmad Azeem. I&apos;m a passionate web developer who
            enjoys building responsive and attractive websites. I love learning
            new technologies and improving my skills every day.
          </p>

          <div className={styles.infoGrid}>
            <article className={styles.infoCard}>
              <div className={styles.iconCircle}>
                <i className="fa-regular fa-user" aria-hidden="true" />
              </div>

              <div>
                <span className={styles.cardLabel}>Name</span>
                <strong>Ahmad Azeem</strong>
              </div>
            </article>

            <article className={styles.infoCard}>
              <div className={styles.iconCircle}>
                <i
                  className="fa-solid fa-briefcase"
                  aria-hidden="true"
                />
              </div>

              <div>
                <span className={styles.cardLabel}>Profession</span>
                <strong>Web Developer</strong>
              </div>
            </article>
          </div>

          <div className={styles.featureGrid}>
            <article className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fa-solid fa-code" aria-hidden="true" />
              </div>

              <span>
                Responsive
                <br />
                Design
              </span>
            </article>

            <article className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i className="fa-solid fa-database" aria-hidden="true" />
              </div>

              <span>
                Clean
                <br />
                Code
              </span>
            </article>

            <article className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <i
                  className="fa-solid fa-chart-column"
                  aria-hidden="true"
                />
              </div>

              <span>
                Continuous
                <br />
                Learning
              </span>
            </article>
          </div>

          <Link href="#contact" className={styles.connectButton}>
            <span>Let&apos;s Connect</span>

            <span className={styles.connectArrow} aria-hidden="true">
              <i className="fa-solid fa-arrow-right" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}