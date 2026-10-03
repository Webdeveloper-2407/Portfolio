"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import styles from "./Contact.module.css";
import contactBackground from "../images/contact-background.png";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type FormStatus = {
  type: "idle" | "loading" | "success" | "error";
  message: string;
};

type ApiResponse = {
  success?: boolean;
  saved?: boolean;
  emailSent?: boolean;
  message?: string;
};

const initialForm: FormState = {
  name: "",
  email: "",
  message: "",
  website: "",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<FormStatus>({
    type: "idle",
    message: "",
  });

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    if (status.type !== "idle") {
      setStatus({
        type: "idle",
        message: "",
      });
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status.type === "loading") {
      return;
    }

    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();

    // -----------------------------
    // Frontend validation
    // -----------------------------
    if (name.length < 2 || name.length > 80) {
      setStatus({
        type: "error",
        message: "Please enter a name between 2 and 80 characters.",
      });
      return;
    }

    // Correct email validation pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email) || email.length > 254) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    if (message.length < 10 || message.length > 5000) {
      setStatus({
        type: "error",
        message: "Your message must be between 10 and 5000 characters.",
      });
      return;
    }

    // -----------------------------
    // Start loading
    // -----------------------------
    setStatus({
      type: "loading",
      message: "Sending your message...",
    });

    try {
      // Express backend URL from .env.local
      const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

      if (!apiUrl) {
        throw new Error("NEXT_PUBLIC_API_URL is not configured.");
      }

      // Remove a possible trailing slash so the endpoint is always correct.
      const cleanApiUrl = apiUrl.replace(/\/$/, "");

      // -----------------------------
      // Send form to Express backend
      // -----------------------------
      const response = await fetch(`${cleanApiUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          // Backend currently accepts subject, although the form has no
          // visible subject field.
          subject: "",
          // Honeypot value is still sent.
          website: form.website,
        }),
      });

      // Try to read a JSON response safely.
      const data = (await response.json().catch(() => null)) as
        | ApiResponse
        | null;

      // -----------------------------
      // IMPORTANT:
      // Some backend versions return HTTP 4xx/5xx together with:
      // saved: true + emailSent: false + success: false
      // when the database save succeeds but the notification email fails.
      // In that case the contact message was still received, so handle the
      // saved state BEFORE checking response.ok. This prevents the Next.js
      // error overlay from being triggered for a saved message.
      // -----------------------------
      if (data?.saved === true) {
        setForm(initialForm);

        if (data.emailSent === false) {
          setStatus({
            type: "success",
            message:
              "Thanks! Your message was received successfully. The email notification could not be sent.",
          });
        } else {
          setStatus({
            type: "success",
            message: "Thanks! Your message has been sent successfully.",
          });
        }

        return;
      }

      // A non-2xx response with no saved message is a real HTTP/backend error.
      if (!response.ok) {
        throw new Error(
          data?.message ||
            `Server error (${response.status}). Please try again.`
        );
      }

      // Normal successful backend response.
      if (data?.success === true) {
        setForm(initialForm);
        setStatus({
          type: "success",
          message: "Thanks! Your message has been sent successfully.",
        });
        return;
      }

      // Anything else is treated as an application-level error.
      throw new Error(
        data?.message || "Something went wrong. Please try again."
      );
    } catch (error) {
      console.error("Contact form error:", error);

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setStatus({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <section
      id="contact"
      className={styles.contact}
      style={{
        backgroundImage: `url(${contactBackground.src})`,
      }}
    >
      <div
        className={styles.backgroundOverlay}
        aria-hidden="true"
      />

      <div
        className={`${styles.orbit} ${styles.orbitOne}`}
        aria-hidden="true"
      />

      <div
        className={`${styles.orbit} ${styles.orbitTwo}`}
        aria-hidden="true"
      />

      <div
        className={`${styles.dotGrid} ${styles.dotGridLeft}`}
        aria-hidden="true"
      />

      <div
        className={`${styles.dotGrid} ${styles.dotGridRight}`}
        aria-hidden="true"
      />

      <div className={styles.contactCard}>
        <div
          className={styles.cardGlow}
          aria-hidden="true"
        />

        <div
          className={`${styles.cardShape} ${styles.cardShapeOne}`}
          aria-hidden="true"
        />

        <div
          className={`${styles.cardShape} ${styles.cardShapeTwo}`}
          aria-hidden="true"
        />

        <div className={styles.cardContent}>
          <div
            className={styles.emailBadge}
            aria-hidden="true"
          >
            <div className={styles.emailBadgeInner}>
              <i className="far fa-envelope" />
            </div>
          </div>

          <h1>
            Let&apos;s <span>Work Together</span>
          </h1>

          <div className={styles.sectionTitle}>
            <span aria-hidden="true" />
            <p>Get In Touch</p>
            <span aria-hidden="true" />
          </div>

          <p className={styles.intro}>
            Have a project in mind or just want to say hello?
            <br />
            I&apos;d love to hear from you. Let&apos;s create something amazing
            together.
          </p>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Honeypot field */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                margin: -1,
                padding: 0,
                overflow: "hidden",
                clip: "rect(0, 0, 0, 0)",
                whiteSpace: "nowrap",
                border: 0,
              }}
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={(event) =>
                  updateField("website", event.target.value)
                }
              />
            </div>

            <div className={styles.fieldRow}>
              <label
                className={styles.fieldGroup}
                htmlFor="contact-name"
              >
                <span className={styles.fieldLabel}>
                  <i
                    className="fas fa-user"
                    aria-hidden="true"
                  />
                  <span>Your Name</span>
                </span>

                <span className={styles.fieldShell}>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    autoComplete="name"
                    minLength={2}
                    maxLength={80}
                    required
                    value={form.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                    disabled={status.type === "loading"}
                  />

                  <i
                    className="far fa-user"
                    aria-hidden="true"
                  />
                </span>
              </label>

              <label
                className={styles.fieldGroup}
                htmlFor="contact-email"
              >
                <span className={styles.fieldLabel}>
                  <i
                    className="far fa-envelope"
                    aria-hidden="true"
                  />
                  <span>Your Email</span>
                </span>

                <span className={styles.fieldShell}>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    autoComplete="email"
                    maxLength={254}
                    required
                    value={form.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                    disabled={status.type === "loading"}
                  />

                  <i
                    className="far fa-envelope"
                    aria-hidden="true"
                  />
                </span>
              </label>
            </div>

            <label
              className={styles.fieldGroup}
              htmlFor="contact-message"
            >
              <span className={styles.fieldLabel}>
                <i
                  className="fas fa-message"
                  aria-hidden="true"
                />
                <span>Your Message</span>
              </span>

              <span className={styles.fieldShellText}>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Your Message"
                  minLength={10}
                  maxLength={5000}
                  required
                  value={form.message}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                  disabled={status.type === "loading"}
                />
              </span>
            </label>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={status.type === "loading"}
              aria-busy={status.type === "loading"}
              style={{
                opacity: status.type === "loading" ? 0.78 : 1,
                cursor:
                  status.type === "loading" ? "not-allowed" : "pointer",
              }}
            >
              <span
                className={styles.submitIcon}
                aria-hidden="true"
              >
                <i
                  className={
                    status.type === "loading"
                      ? "fas fa-spinner fa-spin"
                      : "fas fa-paper-plane"
                  }
                />
              </span>

              <span>
                {status.type === "loading" ? "Sending..." : "Send Message"}
              </span>

              <span
                className={styles.submitArrow}
                aria-hidden="true"
              >
                <i className="fas fa-arrow-right" />
              </span>
            </button>

            {status.message && (
              <p
                role="status"
                aria-live="polite"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 9,
                  maxWidth: 620,
                  minHeight: 22,
                  margin: "13px auto 0",
                  color:
                    status.type === "success"
                      ? "#89f6bf"
                      : "#ffb3c6",
                  textAlign: "center",
                  fontSize: "0.9rem",
                  lineHeight: 1.4,
                  fontWeight: 500,
                }}
              >
                <i
                  className={
                    status.type === "success"
                      ? "fas fa-circle-check"
                      : "fas fa-circle-exclamation"
                  }
                  aria-hidden="true"
                />
                <span>{status.message}</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
