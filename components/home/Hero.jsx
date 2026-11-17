
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#f7fbf8] to-[#eaf8ef]">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#35C77A]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:py-24 lg:grid-cols-2 lg:gap-10 lg:px-8">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          {/* Small Badge */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#35C77A]/30 bg-[#35C77A]/10 px-4 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#35C77A]" />
            <span className="text-sm font-semibold text-[#142B45]">
              Your Trusted Equipment Rental Partner
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-xl text-4xl font-extrabold leading-[1.15] tracking-tight text-[#142B45] sm:text-5xl lg:text-6xl">
            The Right Equipment.
            <span className="mt-2 block text-[#35C77A]">
              Right When You Need It.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
            From construction tools to photography gear, find and rent
            quality equipment with ease. Save money, work smarter,
            and get more done with Equiply.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/equipment"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#35C77A] px-7 py-4 text-sm font-bold text-[#142B45] shadow-lg shadow-[#35C77A]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#28b96c] hover:shadow-xl"
            >
              Explore Equipment
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl border border-[#142B45]/15 bg-white px-7 py-4 text-sm font-bold text-[#142B45] transition-all duration-300 hover:-translate-y-1 hover:border-[#35C77A] hover:text-[#229c5b]"
            >
              Get Started
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-4 border-t border-slate-200 pt-7">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={19} className="text-[#35C77A]" />
              <span className="text-sm font-medium text-slate-600">
                Easy Booking
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck size={19} className="text-[#35C77A]" />
              <span className="text-sm font-medium text-slate-600">
                Secure Rental
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Truck size={19} className="text-[#35C77A]" />
              <span className="text-sm font-medium text-slate-600">
                Flexible Pickup
              </span>
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto w-full max-w-xl"
        >
          {/* Image Background */}
          <div className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-3 shadow-2xl shadow-[#142B45]/10">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.5rem] bg-[#eaf8ef]">
              <Image
                src="/images/banner.png"
                alt="Equipment available for rent through Equiply"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Floating Trust Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-6 -left-3 flex items-center gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:-left-8"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#35C77A]/15">
              <ShieldCheck size={25} className="text-[#229c5b]" />
            </div>

            <div>
              <p className="text-sm font-bold text-[#142B45]">
                Reliable Rentals
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Rent with confidence
              </p>
            </div>
          </motion.div>

          {/* Decorative Circle */}
          <div className="pointer-events-none absolute -right-5 -top-5 -z-10 h-28 w-28 rounded-full border-[12px] border-[#35C77A]/20" />
        </motion.div>
      </div>
    </section>
  );
}
