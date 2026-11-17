
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  HardHat,
  Camera,
  Truck,
  Tractor,
  Cpu,
  PartyPopper,
  ArrowUpRight,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Construction Equipment",
    description: "Tools and machinery for every construction project.",
    icon: HardHat,
    color: "bg-orange-50 text-orange-600",
    hoverColor: "group-hover:bg-orange-500",
    borderColor: "group-hover:border-orange-200",
    category: "Construction",
  },
  {
    id: 2,
    name: "Photography Equipment",
    description: "Cameras, lenses and professional photography gear.",
    icon: Camera,
    color: "bg-purple-50 text-purple-600",
    hoverColor: "group-hover:bg-purple-500",
    borderColor: "group-hover:border-purple-200",
    category: "Photography",
  },
  {
    id: 3,
    name: "Vehicles & Transportation",
    description: "Find vehicles and transport equipment for your needs.",
    icon: Truck,
    color: "bg-blue-50 text-blue-600",
    hoverColor: "group-hover:bg-blue-500",
    borderColor: "group-hover:border-blue-200",
    category: "Vehicles & Transportation",
  },
  {
    id: 4,
    name: "Agriculture Equipment",
    description: "Modern farming tools and agricultural machinery.",
    icon: Tractor,
    color: "bg-green-50 text-green-600",
    hoverColor: "group-hover:bg-green-500",
    borderColor: "group-hover:border-green-200",
    category: "Agriculture",
  },
  {
    id: 5,
    name: "Electronics",
    description: "Generators, electrical tools and electronic devices.",
    icon: Cpu,
    color: "bg-cyan-50 text-cyan-600",
    hoverColor: "group-hover:bg-cyan-500",
    borderColor: "group-hover:border-cyan-200",
    category: "Electronics",
  },
  {
    id: 6,
    name: "Event Equipment",
    description: "Everything you need for memorable events.",
    icon: PartyPopper,
    color: "bg-pink-50 text-pink-600",
    hoverColor: "group-hover:bg-pink-500",
    borderColor: "group-hover:border-pink-200",
    category: "Event Equipment",
  },
];

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-[#f7fbf8] py-20 sm:py-24">
      {/* Background Decoration */}
      <div className="pointer-events-none absolute -right-32 top-20 h-72 w-72 rounded-full bg-[#35C77A]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#35C77A]/30 bg-[#35C77A]/10 px-4 py-2 text-sm font-semibold text-[#229c5b]">
            Browse by Category
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#142B45] sm:text-4xl lg:text-5xl">
            Find Equipment for
            <span className="block text-[#35C77A]">
              Every Need
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
            Explore our wide range of equipment categories and
            find the right tools to bring your next project to life.
          </p>
        </motion.div>

        {/* Category Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
              >
                <Link
                  href={`/equipment?category=${encodeURIComponent(category.category)}`}
                  className={`group flex h-full items-start gap-5 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#142B45]/5 ${category.borderColor}`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl transition-all duration-300 ${category.color} ${category.hoverColor} group-hover:text-white group-hover:rotate-3`}
                  >
                    <Icon size={30} strokeWidth={1.8} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold leading-6 text-[#142B45] transition-colors group-hover:text-[#229c5b]">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      {category.description}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#229c5b]">
                      Explore Category
                      <ArrowUpRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
