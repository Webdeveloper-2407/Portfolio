"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const initialHash = window.location.hash.replace("#", "");

    if (initialHash && links.some((link) => link.href === `#${initialHash}`)) {
      setActiveSection(initialHash);
    }

    const sections = links
      .map((link) => document.querySelector(link.href))
      .filter((section): section is Element => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        root: null,
        rootMargin: "-16% 0px -62% 0px",
        threshold: [0.15, 0.4, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    event.preventDefault();

    const target = document.querySelector(href);

    if (target) {
      window.history.replaceState(null, "", href);
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(href.slice(1));
    }

    setMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="Primary navigation">
        <Link
          href="#home"
          className={styles.logo}
          onClick={(event) => handleNavClick(event, "#home")}
        >
          <span>Ahmad</span> <strong>Azeem</strong>
        </Link>

        <ul className={`${styles.navLinks} ${menuOpen ? styles.active : ""}`}>
          {links.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = activeSection === sectionId;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive ? styles.activeLink : undefined}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(event) => handleNavClick(event, link.href)}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <i
            className={menuOpen ? "fas fa-xmark" : "fas fa-bars"}
            aria-hidden="true"
          />
        </button>
      </nav>
    </header>
  );
}
