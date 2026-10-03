import styles from "./Footer.module.css";

const socialLinks = [
  {
    label: "GitHub",
    icon: "fab fa-github",
    href: "https://github.com/Webdeveloper-2407",
  },
  {
    label: "Discord",
    icon: "fab fa-discord",
    href: "https://discord.com/users/1327249953285996705",
  },
  {
    label: "Instagram",
    icon: "fab fa-instagram",
    href: "https://www.instagram.com/developer.2407?stkn=Z3Z2MTR2eWhpa2Jn",
  },
  {
    label: "Email",
    icon: "far fa-envelope",
    href: "#contact",
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <p>© 2025 Ahmad Azeem. All Rights Reserved.</p>

        <span className={styles.divider} aria-hidden="true" />

        <div className={styles.socialLinks} aria-label="Footer social links">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel={
                social.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label={social.label}
              className={styles.socialLink}
            >
              <i className={social.icon} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}