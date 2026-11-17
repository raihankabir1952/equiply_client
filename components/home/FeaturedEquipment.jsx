
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  MapPin,
  ArrowRight,
  Clock,
  ArrowUpRight,
} from "lucide-react";

const equipmentData = [
  {
    id: 1,
    name: "Heavy Duty Excavator",
    category: "Construction",
    image: "/images/equipment/excavator.jpg",
    price: 8500,
    rentalType: "Day",
    location: "Dhaka, Bangladesh",
    availability: "Available",
  },
  {
    id: 2,
    name: "Professional DSLR Camera",
    category: "Photography",
    image: "/images/equipment/camera.jpg",
    price: 2500,
    rentalType: "Day",
    location: "Chattogram, Bangladesh",
    availability: "Available",
  },
  {
    id: 3,
    name: "Industrial Power Generator",
    category: "Electronics",
    image: "/images/equipment/generator.jpg",
    price: 1800,
    rentalType: "Day",
    location: "Dhaka, Bangladesh",
    availability: "Available",
  },
  {
    id: 4,
    name: "Agricultural Tractor",
    category: "Agriculture",
    image: "/images/equipment/tractor.jpg",
    price: 5000,
    rentalType: "Day",
    location: "Rajshahi, Bangladesh",
    availability: "Available",
  },
  {
    id: 5,
    name: "Professional Welding Machine",
    category: "Construction",
    image: "/images/equipment/welder.jpg",
    price: 1200,
    rentalType: "Day",
    location: "Khulna, Bangladesh",
    availability: "Available",
  },
  {
    id: 6,
    name: "Premium Sound System",
    category: "Event Equipment",
    image: "/images/equipment/sound-system.jpg",
    price: 3500,
    rentalType: "Day",
    location: "Dhaka, Bangladesh",
    availability: "Available",
  },
];

export default function FeaturedEquipment() {
  return (
    <section className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="inline-flex items-center rounded-full border border-[#35C77A]/30 bg-[#35C77A]/10 px-4 py-2 text-sm font-semibold text-[#229c5b]">
            Explore Our Collection
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#142B45] sm:text-4xl lg:text-5xl">
            Featured <span className="text-[#35C77A]">Equipment</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
            Discover quality equipment from trusted owners.
            Find what you need and get your work done without
            the cost of buying.
          </p>
        </motion.div>

        {/* Equipment Cards */}
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {equipmentData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#35C77A]/50 hover:shadow-xl hover:shadow-[#142B45]/10"
            >
              {/* Equipment Image */}
              <div className="relative h-56 overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-bold text-[#142B45] shadow-sm">
                  {item.category}
                </span>

                <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-[#35C77A] px-3 py-1.5 text-xs font-bold text-[#142B45] shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#142B45]" />
                  {item.availability}
                </span>

                <Link
                  href={`/equipment/${item.id}`}
                  aria-label={`View ${item.name}`}
                  className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-3 items-center justify-center rounded-full bg-white text-[#142B45] opacity-0 shadow-lg transition-all duration-300 hover:bg-[#35C77A] group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <ArrowUpRight size={20} />
                </Link>
              </div>

              {/* Card Content */}
              <div className="p-5">

                <div className="flex items-center gap-1.5 text-sm text-slate-500">
                  <MapPin size={15} className="text-[#35C77A]" />
                  {item.location}
                </div>

                <h3 className="mt-3 line-clamp-1 text-xl font-bold text-[#142B45] transition-colors group-hover:text-[#229c5b]">
                  {item.name}
                </h3>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Rental Price
                    </p>

                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-[#142B45]">
                        ৳{item.price.toLocaleString("en-BD")}
                      </span>
                      <span className="text-xs text-slate-500">
                        / {item.rentalType}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/equipment/${item.id}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#142B45] px-4 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#35C77A] hover:text-[#142B45]"
                  >
                    Details
                    <ArrowRight size={15} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            href="/equipment"
            className="group inline-flex items-center gap-3 rounded-xl border-2 border-[#142B45] px-8 py-4 text-sm font-bold text-[#142B45] transition-all duration-300 hover:border-[#35C77A] hover:bg-[#35C77A] hover:text-[#142B45]"
          >
            Explore All Equipment
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
