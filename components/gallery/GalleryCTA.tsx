import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GalleryCTA() {
  return (
    <section className="bg-[#071224] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
            Start Your Project
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-white sm:text-5xl">
            Your project could be our next transformation.
          </h2>

          <p className="mt-5 max-w-2xl leading-8 text-slate-400">
            Connect with our team to discuss your requirements and discover how
            Simmply Perfect Group can bring your ideas to life.
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-bold text-[#071224] transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50"
        >
          Discuss Your Project

          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}