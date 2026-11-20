"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Send,
} from "lucide-react";

const initialForm = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

const contactDetails = [
  {
    icon: Mail,
    title: "Email",
    value: "support@equiply.com",
    href: "mailto:support@equiply.com",
    description: "Reach out by email",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+880 1700-000000",
    href: "tel:+8801700000000",
    description: "Call the Equiply team",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Dhaka, Bangladesh",
    description: "Based in Dhaka",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState(initialForm);
  const [feedback, setFeedback] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentForm) => ({ ...currentForm, [name]: value }));
    setFeedback(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const hasMissingField = Object.values(formData).some(
      (value) => !value.trim()
    );

    if (hasMissingField) {
      setFeedback({
        type: "error",
        message: "Please complete all fields before continuing.",
      });
      return;
    }

    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email.trim()
    );

    if (!emailIsValid) {
      setFeedback({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setFeedback({
      type: "success",
      message:
        "This is a demo form, so your message was not sent. For support, please email support@equiply.com.",
    });
  };

  return (
    <main>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#f7fbf8] to-[#eaf8ef]">
        <div className="pointer-events-none absolute -right-32 -top-24 h-96 w-96 rounded-full bg-[#35C77A]/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-16 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#35C77A]/25 bg-[#35C77A]/10 px-4 py-2 text-sm font-semibold text-[#142B45]">
              <MessageSquareText size={17} className="text-[#23995A]" />
              Contact Equiply
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[#142B45] sm:text-5xl lg:text-6xl">
              We&apos;re here to help you
              <span className="mt-2 block text-[#35C77A]">
                get things moving.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Have a question about finding or listing equipment? Get in touch
              using the contact details below. You can also use the demo form
              to review the contact experience.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#23995A]">
              Get in touch
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#142B45] sm:text-3xl">
              Contact information
            </h2>
            <p className="mt-3 max-w-md leading-7 text-slate-600">
              For inquiries, contact Equiply directly by email or phone.
            </p>

            <div className="mt-7 space-y-4">
              {contactDetails.map(({ icon: Icon, title, value, href, description }) => (
                <article
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#35C77A]/40 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#35C77A]/12 text-[#23995A]">
                    <Icon size={21} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-500">
                      {title}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="mt-1 inline-block break-words font-semibold text-[#142B45] transition hover:text-[#23995A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="mt-1 font-semibold text-[#142B45]">
                        {value}
                      </p>
                    )}
                    <p className="mt-1 text-sm text-slate-500">
                      {description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-6 rounded-2xl bg-[#f7fbf8] p-5">
              <p className="text-sm leading-6 text-slate-600">
                Looking for equipment? Browse current listings on Equiply.
              </p>
              <Link
                href="/equipment"
                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#23995A] transition hover:gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
              >
                Explore Equipment
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_20px_60px_rgba(20,43,69,0.08)] sm:p-8 lg:p-10">
            <div>
              <p className="text-sm font-semibold text-[#23995A]">
                Send us a note
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#142B45] sm:text-3xl">
                Contact form
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                This frontend demo validates your details locally and does not
                send or store a message.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-semibold text-[#142B45]"
                  >
                    Full Name
                  </label>
                  <input
                    id="contact-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#142B45] outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-semibold text-[#142B45]"
                  >
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#142B45] outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-sm font-semibold text-[#142B45]"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What would you like to discuss?"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#142B45] outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-semibold text-[#142B45]"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#142B45] outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#35C77A] focus:ring-4 focus:ring-[#35C77A]/10"
                />
              </div>

              {feedback && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`rounded-xl border px-4 py-3 text-sm leading-6 ${
                    feedback.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {feedback.message}
                </p>
              )}

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#142B45] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#1d3b5c] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
              >
                <Send size={17} />
                Submit Demo Form
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
