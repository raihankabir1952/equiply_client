import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  Package,
  Search,
  Target,
  UsersRound,
} from "lucide-react";

const benefits = [
  {
    icon: Search,
    title: "Find what you need",
    description:
      "Explore equipment listings by category and review the details before choosing what fits your project.",
  },
  {
    icon: Package,
    title: "Make more of what you own",
    description:
      "Owners can list available equipment and manage rental activity from their Equiply account.",
  },
  {
    icon: UsersRound,
    title: "One place for both sides",
    description:
      "Equiply brings equipment owners and people who need temporary access together in one marketplace.",
  },
];

const steps = [
  {
    number: "01",
    title: "Browse equipment",
    description:
      "Customers explore listings and compare equipment details for the task at hand.",
  },
  {
    number: "02",
    title: "Choose a rental",
    description:
      "Select a suitable listing and follow its booking flow with the rental dates and information required.",
  },
  {
    number: "03",
    title: "List and manage",
    description:
      "Owners can add equipment, keep listing information up to date, and manage rental requests.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#f7fbf8] to-[#eaf8ef]">
        <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full bg-[#35C77A]/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-blue-100/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative z-10">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#35C77A]/25 bg-[#35C77A]/10 px-4 py-2 text-sm font-semibold text-[#142B45]">
              <span className="h-2 w-2 rounded-full bg-[#35C77A]" />
              About Equiply
            </p>

            <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight text-[#142B45] sm:text-5xl lg:text-6xl">
              The right equipment,
              <span className="mt-2 block text-[#35C77A]">
                for the time you need it.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Equiply connects equipment owners with customers who need
              equipment temporarily. Find useful gear for your next project,
              or make your own equipment available to someone who needs it.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/equipment"
                className="group inline-flex items-center gap-3 rounded-xl bg-[#35C77A] px-6 py-3.5 text-sm font-bold text-[#142B45] shadow-lg shadow-[#35C77A]/15 transition duration-200 hover:-translate-y-0.5 hover:bg-[#28b96c] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#142B45]"
              >
                Explore Equipment
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-[#142B45]/15 bg-white/80 px-6 py-3.5 text-sm font-semibold text-[#142B45] transition duration-200 hover:border-[#35C77A] hover:text-[#23995A] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#35C77A]"
              >
                How it works
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="rounded-[2rem] border border-white bg-white/80 p-5 shadow-2xl shadow-[#142B45]/10 backdrop-blur sm:p-7">
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <p className="text-sm font-semibold text-[#23995A]">
                    A shared marketplace
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#142B45] sm:text-2xl">
                    Access goes both ways
                  </h2>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#35C77A]/12 text-[#23995A]">
                  <Package size={23} />
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#35C77A]/30 hover:bg-[#f7fbf8]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#23995A] shadow-sm">
                    <Search size={20} />
                  </div>
                  <h3 className="mt-4 font-bold text-[#142B45]">
                    For customers
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Discover equipment for a project without needing to own
                    every item yourself.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-5 transition duration-200 hover:-translate-y-0.5 hover:border-[#35C77A]/30 hover:bg-[#f7fbf8]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#23995A] shadow-sm">
                    <UsersRound size={20} />
                  </div>
                  <h3 className="mt-4 font-bold text-[#142B45]">
                    For owners
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Share equipment you make available and manage its rental
                    activity through your account.
                  </p>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-4 -top-5 -z-10 h-24 w-24 rounded-full border-[10px] border-[#35C77A]/20 sm:-right-7" />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#23995A]">
              What is Equiply?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#142B45] sm:text-4xl">
              A practical way to share access to equipment.
            </h2>
          </div>

          <div className="space-y-5 text-base leading-8 text-slate-600">
            <p>
              Equiply is an equipment rental marketplace built around a simple
              idea: people often need tools and equipment for a limited time,
              while owners may have equipment they can make available.
            </p>
            <p>
              The platform gives customers a place to explore listings and
              begin a rental, while owners can publish equipment and manage
              bookings. Equiply helps both sides find a more useful way to put
              equipment to work.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f7fbf8] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#23995A]">
              What guides us
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#142B45] sm:text-4xl">
              Our mission and vision
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#35C77A]/12 text-[#23995A]">
                <Target size={23} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#142B45]">
                Our Mission
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Make temporary access to useful equipment easier by giving
                owners and customers one clear place to connect.
              </p>
            </article>

            <article className="rounded-2xl border border-slate-200/80 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg sm:p-9">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#142B45]/[0.06] text-[#142B45]">
                <Compass size={23} />
              </div>
              <h3 className="mt-5 text-xl font-bold text-[#142B45]">
                Our Vision
              </h3>
              <p className="mt-3 leading-7 text-slate-600">
                Encourage a more resourceful rental culture where existing
                equipment can help someone else get a job done.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#23995A]">
              The Equiply difference
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#142B45] sm:text-4xl">
              Why choose Equiply?
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              A focused marketplace can make finding, listing, and managing
              equipment rentals more straightforward.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#35C77A]/40 hover:shadow-lg sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#35C77A]/12 text-[#23995A]">
                  <Icon size={21} />
                </div>
                <h3 className="mt-5 text-lg font-bold text-[#142B45]">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#f7fbf8] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#23995A]">
              Simple steps
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#142B45] sm:text-4xl">
              How Equiply works
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7"
              >
                <p className="text-sm font-bold tracking-[0.12em] text-[#23995A]">
                  STEP {step.number}
                </p>
                <h3 className="mt-4 text-lg font-bold text-[#142B45]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#142B45] px-5 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 sm:flex-row sm:items-center lg:px-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-200">
              <CheckCircle2 size={18} />
              Ready to find your equipment?
            </div>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Get started with Equiply.
            </h2>
            <p className="mt-3 leading-7 text-slate-300">
              Explore available listings and find equipment for the work ahead.
            </p>
          </div>

          <Link
            href="/equipment"
            className="group inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#35C77A] px-6 py-3.5 text-sm font-bold text-[#142B45] transition duration-200 hover:-translate-y-0.5 hover:bg-[#28b96c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Browse Equipment
            <ArrowRight
              size={18}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}
