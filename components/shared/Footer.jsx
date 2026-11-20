
import Link from "next/link";
import Image from "next/image";

import {
    Mail,
    MapPin,
    Phone,
    ArrowUpRight,
} from "lucide-react";

import {
    FaFacebookF,
    FaInstagram,
    FaLinkedinIn,
} from "react-icons/fa";

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "All Equipment", href: "/equipment" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
];

const categories = [
    "Construction",
    "Photography",
    "Vehicles & Transportation",
    "Agriculture",
    "Electronics",
    "Event Equipment",
];

const socialLinks = [
    { icon: FaFacebookF, href: "#", label: "Facebook" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-[#142B45] text-white">

            {/* Decorative Background */}
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#35C77A]/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-8 sm:pt-16 lg:px-10 lg:pt-20">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 gap-x-10 gap-y-12 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.8fr_1.15fr_1fr] lg:gap-x-12">

                    {/* Brand Section */}
                    <div>
                        <Link
                            href="/"
                            className="inline-flex rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#35C77A]"
                        >
                            <Image
                                src="/images/footerlogo.png"
                                alt="Equiply"
                                width={2350}
                                height={1150}
                                priority
                                className="h-14 w-auto object-contain transition-transform duration-300 hover:scale-[1.02] sm:h-16"
                            />
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-7 text-slate-300">
                            Rent the equipment you need, when you need it.
                            Equiply makes equipment rental simple, affordable,
                            and accessible for everyone.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-3">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;

                                return (
                                    <Link
                                        key={social.label}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-slate-300 transition duration-200 hover:-translate-y-0.5 hover:border-[#35C77A]/70 hover:bg-[#35C77A] hover:text-[#142B45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                                    >
                                        <Icon size={18} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-white">
                            Quick Links
                            <span className="mt-3 block h-0.5 w-10 rounded-full bg-[#35C77A]" />
                        </h3>

                        <ul className="space-y-3.5">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="inline-block text-sm text-slate-300 transition duration-200 hover:translate-x-1 hover:text-[#35C77A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-white">
                            Categories
                            <span className="mt-3 block h-0.5 w-10 rounded-full bg-[#35C77A]" />
                        </h3>

                        <ul className="space-y-3.5">
                            {categories.map((category) => (
                                <li key={category}>
                                    <Link
                                        href="/equipment"
                                        className="group inline-flex items-center gap-2.5 text-sm text-slate-300 transition duration-200 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                                    >
                                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#35C77A]/70 transition duration-200 group-hover:scale-125 group-hover:bg-[#35C77A]" />
                                        <span>{category}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold uppercase tracking-[0.14em] text-white">
                            Get In Touch
                            <span className="mt-3 block h-0.5 w-10 rounded-full bg-[#35C77A]" />
                        </h3>

                        <ul className="space-y-4">

                            {/* Address */}
                            <li className="flex items-start gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[#35C77A]">
                                    <MapPin size={17} />
                                </span>

                                <span className="pt-1.5 text-sm leading-6 text-slate-300">
                                    Dhaka, Bangladesh
                                </span>
                            </li>

                            {/* Email */}
                            <li className="flex items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[#35C77A]">
                                    <Mail size={17} />
                                </span>

                                <a
                                    href="mailto:support@equiply.com"
                                    className="break-all text-sm text-slate-300 transition duration-200 hover:text-[#35C77A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                                >
                                    support@equiply.com
                                </a>
                            </li>

                            {/* Phone */}
                            <li className="flex items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-[#35C77A]">
                                    <Phone size={17} />
                                </span>

                                <a
                                    href="tel:+8801700000000"
                                    className="text-sm text-slate-300 transition duration-200 hover:text-[#35C77A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                                >
                                    +880 1700-000000
                                </a>
                            </li>

                        </ul>

                        {/* CTA Button */}
                        <Link
                            href="/equipment"
                            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#35C77A] px-5 py-3 text-sm font-semibold text-[#142B45] shadow-sm transition duration-200 hover:-translate-y-0.5 hover:bg-[#28b96c] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            Explore Equipment
                            <ArrowUpRight size={17} />
                        </Link>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center sm:flex-row sm:text-left">

                    <p className="text-sm text-slate-400">
                        © 2026 Equiply. All rights reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-400 sm:justify-end">
                        <Link
                            href="/privacy"
                            className="transition duration-200 hover:text-[#35C77A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition duration-200 hover:text-[#35C77A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
                        >
                            Terms & Conditions
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}
