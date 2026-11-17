
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

            <div className="relative mx-auto max-w-7xl px-5 pb-8 pt-16 lg:px-8">

                {/* Main Footer Content */}
                <div className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand Section */}
                    <div>
                        <Link href="/" className="inline-block">
                            <Image
                                src="/images/footerlogo.png"
                                alt="Equiply"
                                width={2350}
                                height={1150}
                                priority
                                className="h-20 w-auto object-contain"
                            />
                        </Link>

                        <p className="mt-4 max-w-xs text-sm leading-7 text-slate-300">
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
                                        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-all duration-300 hover:-translate-y-1 hover:border-[#35C77A] hover:bg-[#35C77A] hover:text-[#142B45]"
                                    >
                                        <Icon size={18} />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold">
                            Quick Links
                            <span className="mt-2 block h-1 w-9 rounded-full bg-[#35C77A]" />
                        </h3>

                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="inline-block text-sm text-slate-300 transition-all duration-300 hover:translate-x-1 hover:text-[#35C77A]"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold">
                            Categories
                            <span className="mt-2 block h-1 w-9 rounded-full bg-[#35C77A]" />
                        </h3>

                        <ul className="space-y-4">
                            {categories.map((category) => (
                                <li key={category}>
                                    <Link
                                        href="/equipment"
                                        className="inline-block text-sm text-slate-300 transition-all duration-300 hover:translate-x-1 hover:text-[#35C77A]"
                                    >
                                        {category}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="mb-6 text-lg font-semibold">
                            Get In Touch
                            <span className="mt-2 block h-1 w-9 rounded-full bg-[#35C77A]" />
                        </h3>

                        <ul className="space-y-5">

                            {/* Address */}
                            <li className="flex items-start gap-3">
                                <MapPin
                                    className="mt-1 shrink-0 text-[#35C77A]"
                                    size={19}
                                />

                                <span className="text-sm leading-6 text-slate-300">
                                    Dhaka, Bangladesh
                                </span>
                            </li>

                            {/* Email */}
                            <li className="flex items-center gap-3">
                                <Mail
                                    className="shrink-0 text-[#35C77A]"
                                    size={19}
                                />

                                <a
                                    href="mailto:support@equiply.com"
                                    className="text-sm text-slate-300 transition hover:text-[#35C77A]"
                                >
                                    support@equiply.com
                                </a>
                            </li>

                            {/* Phone */}
                            <li className="flex items-center gap-3">
                                <Phone
                                    className="shrink-0 text-[#35C77A]"
                                    size={19}
                                />

                                <a
                                    href="tel:+8801700000000"
                                    className="text-sm text-slate-300 transition hover:text-[#35C77A]"
                                >
                                    +880 1700-000000
                                </a>
                            </li>

                        </ul>

                        {/* CTA Button */}
                        <Link
                            href="/equipment"
                            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#35C77A] px-5 py-3 text-sm font-semibold text-[#142B45] transition-all duration-300 hover:-translate-y-1 hover:bg-[#28b96c]"
                        >
                            Explore Equipment
                            <ArrowUpRight size={17} />
                        </Link>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center md:flex-row md:text-left">

                    <p className="text-sm text-slate-400">
                        © 2026 Equiply. All rights reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
                        <Link
                            href="/privacy"
                            className="transition hover:text-[#35C77A]"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-[#35C77A]"
                        >
                            Terms & Conditions
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}
