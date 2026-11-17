
"use client";

import { motion } from "framer-motion";
import {
  Wallet,
  ShieldCheck,
  CalendarDays,
  LockKeyhole,
  ArrowUpRight,
} from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Affordable Rental Prices",
    description:
      "Get the equipment you need without the high cost of ownership. Enjoy quality rentals at budget-friendly prices.",
    icon: Wallet,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    number: "01",
  },
  {
    id: 2,
    title: "Verified Equipment Owners",
    description:
      "Rent with confidence from trusted equipment owners. We focus on building a reliable rental community.",
    icon: ShieldCheck,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    number: "02",
  },
  {
    id: 3,
    title: "Flexible Rental Periods",
    description:
      "Choose a rental duration that works for you, whether you need equipment daily, weekly, or monthly.",
    icon: CalendarDays,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    number: "03",
  },
  {
    id: 4,
    title: "Secure Payments",
    description:
      "Enjoy a smooth and secure checkout experience with reliable online payment processing.",
    icon: LockKeyhole,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    number: "04",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#35C77A]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center rounded-full border border-[#35C77A]/20 bg-[#35C77A]/10 px-4 py-2 text-sm font-semibold text-[#23995A]">
            The Equiply Advantage
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-[#142B45] sm:text-4xl lg:text-5xl">
            Why Choose{" "}
            <span className="text-[#35C77A]">Equiply?</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            We make equipment rental simple, affordable, and reliable.
            Everything you need for a smarter rental experience.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#35C77A]/40 hover:shadow-xl hover:shadow-[#142B45]/5"
              >
                <div className="mb-7 flex items-center justify-between">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${benefit.iconBg} transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
                  >
                    <Icon
                      size={27}
                      strokeWidth={1.8}
                      className={benefit.iconColor}
                    />
                  </div>

                  <span className="text-sm font-bold tracking-widest text-slate-300">
                    {benefit.number}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold text-[#142B45]">
                  {benefit.title}
                </h3>

                <p className="text-sm leading-7 text-slate-500">
                  {benefit.description}
                </p>

                <div className="mt-6 flex items-center text-sm font-semibold text-[#23995A]">
                  <span>Equiply Benefits</span>
                  <ArrowUpRight
                    size={16}
                    className="ml-1 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
