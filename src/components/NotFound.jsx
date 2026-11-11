
import { Link } from "react-router-dom";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function NotFound() {
  const pageRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.from(".error-number", {
      y: 100,
      opacity: 0,
      duration: 1,
    })
      .from(
        ".error-content",
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      );
  }, { scope: pageRef });

  return (
    <main
      ref={pageRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#111110] px-6 text-[#e9e7e1]"
    >
      {/* Background decoration */}
      <div className="absolute h-[400px] w-[400px] rounded-full bg-[#b6a48a]/10 blur-[120px]" />

      {/* Top label */}
      <div className="absolute left-6 right-6 top-8 flex justify-between border-b border-white/15 pb-5 md:left-12 md:right-12">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
          MY / Portfolio
        </span>

        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Error / 404
        </span>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">

        <h1 className="error-number text-[clamp(9rem,25vw,20rem)] font-light leading-none tracking-[-0.1em]">
          4<span className="font-serif italic text-[#b6a48a]">0</span>4
        </h1>

        <div className="error-content mt-5">
          <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-[#b6a48a]">
            Lost in the digital dimension
          </p>

          <h2 className="text-3xl font-light tracking-tight md:text-5xl">
            Page not found<span className="text-[#b6a48a]">.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-white/45">
            The page you're looking for doesn't exist,
            has been moved, or the project URL is incorrect.
          </p>

          <Link
            to="/"
            className="group mt-10 inline-flex items-center gap-4 border border-white/20 px-7 py-4 text-[10px] uppercase tracking-[0.25em] transition-all duration-300 hover:border-[#b6a48a] hover:bg-[#b6a48a] hover:text-black"
          >
            <span>Back to homepage</span>

            <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
              ↗
            </span>
          </Link>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="absolute bottom-8 flex w-full justify-between border-t border-white/15 px-6 pt-5 md:px-12">
        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
          Madhukar Yadav
        </span>

        <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
          © {new Date().getFullYear()}
        </span>
      </div>
    </main>
  );
}
