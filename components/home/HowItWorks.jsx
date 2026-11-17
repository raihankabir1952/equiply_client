
"use client";

import { motion } from "framer-motion";
import {
  Search,
  CalendarCheck,
  Truck,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    id: 1,
    number: "01",
    title: "Find Your Equipment",
    description:
      "Browse through a wide range of equipment and find the perfect match for your project or needs.",
    icon: Search,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    number: "02",
    title: "Book Your Rental",
    description:
      "Select your rental dates, choose the quantity, and complete your booking with a secure payment.",
    icon: CalendarCheck,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    number: "03",
    title: "Get It & Get Started",
    description:
      "Receive your equipment and focus on getting your work done. It's that simple!",
    icon: Truck,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full bg-[#35C77A]/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center rounded-full border border-[#35C77A]/20 bg-[#35C77A]/10 px-4 py-2 text-sm font-semibold text-[#23995A]">
            Simple Process
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-[#142B45] sm:text-4xl lg:text-5xl">
            How <span className="text-[#35C77A]">Equiply</span> Works
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Getting the right equipment has never been easier.
            Just follow three simple steps and get started.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid gap-8 md:grid-cols-3">
          {/* Connecting Line */}
          <div className="pointer-events-none absolute left-[18%] right-[18%] top-12 hidden border-t-2 border-dashed border-[#35C77A]/30 md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                className="relative z-10 flex flex-col items-center text-center"
              >
                {/* Icon */}
                <div className="relative mb-8">
                  <div
                    className={`flex h-24 w-24 items-center justify-center rounded-3xl ${step.iconBg} shadow-sm transition-transform duration-300 hover:-translate-y-2`}
                  >
                    <Icon
                      size={38}
                      strokeWidth={1.7}
                      className={step.iconColor}
                    />
                  </div>

                  <span className="absolute -right-3 -top-3 flex h-9 w-9 items-center justify-center rounded-full border-4 border-white bg-[#35C77A] text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-[#142B45]">
                  {step.title}
                </h3>

                <p className="max-w-sm text-sm leading-7 text-slate-500">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-3 text-center"
        >
          <CheckCircle2 size={20} className="text-[#35C77A]" />
          <p className="text-sm font-medium text-[#142B45]">
            Simple booking. Flexible rentals. Smarter work.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
