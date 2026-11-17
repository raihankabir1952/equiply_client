
"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  BadgeCheck,
  ClipboardCheck,
  Headset,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const trustFeatures = [
  {
    id: 1,
    title: "Verified Owner Profiles",
    description:
      "Know who you are renting from with owner profile information and verification.",
    icon: BadgeCheck,
  },
  {
    id: 2,
    title: "Quality Equipment Listings",
    description:
      "Explore detailed equipment information, condition, pricing, and availability.",
    icon: ClipboardCheck,
  },
  {
    id: 3,
    title: "Reliable Rental Experience",
    description:
      "Enjoy a transparent booking process with clear rental terms and information.",
    icon: ShieldCheck,
  },
  {
    id: 4,
    title: "Dedicated Support",
    description:
      "Get help when you need it throughout your equipment rental journey.",
    icon: Headset,
  },
];

export default function TrustedOwners() {
  return (
    <section className="relative overflow-hidden bg-[#08a515] py-20 sm:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#35C77A]/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#35C77A]/30 bg-[#35C77A]/10 px-4 py-2 text-sm font-semibold text-[#6EE7A5]">
              <ShieldCheck size={16} />
              Trust & Reliability
            </span>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Rent with Confidence.
              <span className="mt-2 block text-[#35C77A]">
                Every Step of the Way.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-300">
              We believe every rental should be a smooth and reliable
              experience. Equiply brings renters and equipment owners
              together through transparency, quality listings, and
              dependable service.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/equipment"
                className="inline-flex items-center gap-2 rounded-xl bg-[#35C77A] px-6 py-3.5 text-sm font-bold text-[#142B45] transition-all duration-300 hover:-translate-y-1 hover:bg-[#42d98a] hover:shadow-lg hover:shadow-[#35C77A]/20"
              >
                Explore Equipment
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:border-[#35C77A] hover:text-[#35C77A]"
              >
                Become an Owner
              </Link>
            </div>

            {/* Trust Note */}
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 size={19} className="shrink-0 text-[#35C77A]" />
              <span>Built for a more transparent rental experience.</span>
            </div>
          </motion.div>

          {/* Right Features */}
          <div className="grid gap-4 sm:grid-cols-2">
            {trustFeatures.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.12,
                  }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#35C77A]/40 hover:bg-white/[0.10]"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#35C77A]/15 text-[#35C77A] transition-transform duration-300 group-hover:rotate-6">
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  <h3 className="mb-3 text-lg font-bold text-white">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-7 text-slate-300">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
