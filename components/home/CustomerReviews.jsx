
"use client";

import { motion } from "framer-motion";
import { Star, Quote, MessageCircle } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Tanvir Ahmed",
    role: "Construction Manager",
    initials: "TA",
    rating: 5,
    comment:
      "Equiply made it so easy to find the construction equipment I needed. The rental process was smooth, and the pricing was very reasonable.",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Professional Photographer",
    initials: "NJ",
    rating: 5,
    comment:
      "I needed a professional camera for a special project. Equiply helped me find exactly what I was looking for without spending a fortune.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 3,
    name: "Arif Hossain",
    role: "Event Organizer",
    initials: "AH",
    rating: 4,
    comment:
      "Finding sound systems and event equipment is much easier now. I really appreciate the flexible rental options and simple booking experience.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 4,
    name: "Sadia Rahman",
    role: "Small Business Owner",
    initials: "SR",
    rating: 5,
    comment:
      "As a small business owner, buying expensive equipment is not always practical. Equiply gives me an affordable way to get the tools I need.",
    color: "bg-blue-100 text-blue-700",
  },
];

export default function CustomerReviews() {
  return (
    <section className="relative overflow-hidden bg-[#f7fbf8] py-20 sm:py-24">
      {/* Background Decorations */}
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#35C77A]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-blue-100/60 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#35C77A]/20 bg-[#35C77A]/10 px-4 py-2 text-sm font-semibold text-[#23995A]">
            <MessageCircle size={15} />
            Customer Stories
          </span>

          <h2 className="text-3xl font-bold tracking-tight text-[#142B45] sm:text-4xl lg:text-5xl">
            What Our Customers{" "}
            <span className="text-[#35C77A]">Say</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
            Real experiences that inspire us to make equipment rental
            easier, smarter, and more accessible.
          </p>
        </motion.div>

        {/* Review Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#35C77A]/40 hover:shadow-xl hover:shadow-[#142B45]/5 sm:p-8"
            >
              {/* Quote Icon */}
              <div className="absolute right-7 top-7 text-[#35C77A]/15 transition-colors duration-300 group-hover:text-[#35C77A]/30">
                <Quote size={42} fill="currentColor" />
              </div>

              {/* Rating */}
              <div className="mb-6 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={starIndex}
                    size={17}
                    className={
                      starIndex < review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-slate-200 text-slate-200"
                    }
                  />
                ))}

                <span className="ml-2 text-sm font-semibold text-[#142B45]">
                  {review.rating}.0
                </span>
              </div>

              {/* Review Comment */}
              <p className="mb-8 min-h-24 text-[15px] leading-7 text-slate-600">
                "{review.comment}"
              </p>

              {/* Customer Info */}
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-bold ${review.color}`}
                >
                  {review.initials}
                </div>

                <div>
                  <h3 className="font-bold text-[#142B45]">
                    {review.name}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {review.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-500">
            Your next successful rental experience starts with{" "}
            <span className="font-semibold text-[#23995A]">Equiply.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
