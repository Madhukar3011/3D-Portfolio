
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// -------------------------------------
// PROJECT DATA
// -------------------------------------

const projects = [
  {
    id: 1,
    number: "01",
    title: "Solitude in Light",
    category: "Portrait Photography",
    year: "2025",
    location: "Varanasi, India",
    client: "Personal Collection",
    description:
      "An exploration of human presence, emotion, and the quiet beauty of natural light. This portrait series captures intimate moments where light becomes a language of its own, revealing stories hidden within ordinary expressions.",
    tags: ["Portrait", "Natural Light", "Human Emotion", "Editorial"],
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=2000&q=90",
    color: "#d9bba2",
  },
  {
    id: 2,
    number: "02",
    title: "Urban Cartography",
    category: "Architecture & Space",
    year: "2024",
    location: "New Delhi, India",
    client: "Architecture Study",
    description:
      "A visual study of the geometry and rhythm of modern urban environments. Through carefully composed frames, this series discovers the relationship between structure, symmetry, scale, and the people who inhabit these spaces.",
    tags: ["Architecture", "Geometry", "Urban", "Minimalism"],
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=2000&q=90",
    color: "#b5c4ce",
  },
  {
    id: 3,
    number: "03",
    title: "Chromatic Fields",
    category: "Abstract Color Study",
    year: "2025",
    location: "Creative Studio",
    client: "Experimental Series",
    description:
      "An experimental investigation into color, movement, and visual perception. Vibrant tones and fluid compositions interact to create abstract visual landscapes that challenge the boundaries between photography and fine art.",
    tags: ["Abstract", "Color Theory", "Experimental", "Visual Art"],
    image:
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=2000&q=90",
    color: "#bb8bcb",
  },
  {
    id: 4,
    number: "04",
    title: "Temporal Drift",
    category: "Long Exposure Series",
    year: "2024",
    location: "Night Photography",
    client: "Personal Collection",
    description:
      "A photographic journey through time and motion. Using long exposure techniques, fleeting moments become lasting visual experiences, transforming moving lights, passing landscapes, and the passage of time into expressive compositions.",
    tags: ["Long Exposure", "Motion", "Night", "Time"],
    image:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2000&q=90",
    color: "#8799c4",
  },
  {
    id: 5,
    number: "05",
    title: "Verdant Systems",
    category: "Nature & Botany",
    year: "2026",
    location: "Natural Landscapes",
    client: "Nature Collection",
    description:
      "A celebration of the intricate patterns and quiet complexity of the natural world. From delicate botanical details to expansive green landscapes, this collection observes the balance, texture, and interconnected systems of nature.",
    tags: ["Nature", "Botanical", "Organic", "Environment"],
    image:
      "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=2000&q=90",
    color: "#91aa83",
  },
  {
    id: 6,
    number: "06",
    title: "Still Life, Moving",
    category: "Object & Materiality",
    year: "2025",
    location: "Studio Photography",
    client: "Material Study",
    description:
      "An investigation into the relationship between everyday objects, material surfaces, and visual storytelling. Through controlled lighting and thoughtful arrangements, ordinary objects become expressive subjects with their own character.",
    tags: ["Still Life", "Texture", "Objects", "Composition"],
    image:
      "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=2000&q=90",
    color: "#c6a78a",
  },
];

// -------------------------------------
// THREE JS IMAGE COMPONENT
// -------------------------------------

function PhotoScene({ image }) {
  const texture = useTexture(image);
  const meshRef = useRef();

  useEffect(() => {
    texture.colorSpace = SRGBColorSpace;
    texture.needsUpdate = true;
  }, [texture]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y +=
      (state.pointer.x * 0.08 - meshRef.current.rotation.y) *
      delta *
      2;

    meshRef.current.rotation.x +=
      (-state.pointer.y * 0.05 - meshRef.current.rotation.x) *
      delta *
      2;
  });

  return (
    <Float speed={1} rotationIntensity={0.04} floatIntensity={0.12}>
      <mesh ref={meshRef}>
        <planeGeometry args={[7, 4.5, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.75}
          metalness={0}
        />
      </mesh>
    </Float>
  );
}

// -------------------------------------
// MAIN PROJECT DETAIL PAGE
// -------------------------------------

export default function ProjectDetail() {
  const [activeIndex, setActiveIndex] = useState(0);

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  const activeProject = projects[activeIndex];

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const previousProject = () => {
    setActiveIndex(
      (prev) => (prev - 1 + projects.length) % projects.length
    );
  };

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        ".project-info",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          delay: 0.2,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        "[data-reveal]",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#111110] text-[#e9e7e1]"
    >
      {/* TOP INTRO - NO NAVBAR */}

      <section className="px-5 pt-12 md:px-12 lg:px-20">
        <div className="flex items-center justify-between border-b border-white/15 pb-5">
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">
            Independent Photography Portfolio
          </p>

          <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">
            Selected Works — 2024 / 2026
          </p>
        </div>

        <div className="flex flex-col justify-between gap-8 py-12 md:flex-row md:items-end md:py-20">
          <div>
            <p className="project-info mb-5 text-xs uppercase tracking-[0.3em] text-[#b6a48a]">
              Photography / Visual Stories
            </p>

            <h1 className="project-info max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.06em] md:text-7xl lg:text-8xl">
              Selected
              <br />
              <span className="font-serif italic text-[#b6a48a]">
                Perspectives.
              </span>
            </h1>
          </div>

          <p className="project-info max-w-xs text-sm leading-7 text-white/45">
            A collection of visual experiments exploring light,
            architecture, color, nature, and the poetry of everyday life.
          </p>
        </div>
      </section>

      {/* HERO PROJECT */}

      <section className="px-5 md:px-12 lg:px-20">
        <div
          ref={heroRef}
          className="relative overflow-hidden bg-[#20201e]"
        >
          <div className="relative aspect-[4/3] w-full md:aspect-[16/8]">
            <Canvas
              camera={{ position: [0, 0, 9], fov: 35 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={2} />
              <directionalLight
                position={[3, 4, 5]}
                intensity={1.5}
              />

              <Suspense fallback={null}>
                <PhotoScene
                  key={activeProject.id}
                  image={activeProject.image}
                />
              </Suspense>
            </Canvas>

            {/* IMAGE OVERLAY */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

            <div className="absolute left-5 top-5 md:left-10 md:top-10">
              <span className="border border-white/30 bg-black/20 px-4 py-2 text-[9px] uppercase tracking-[0.25em] backdrop-blur-md">
                Project / {activeProject.number}
              </span>
            </div>

            <div className="absolute bottom-6 left-5 right-5 flex items-end justify-between md:bottom-10 md:left-10 md:right-10">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/70">
                  {activeProject.category}
                </p>

                <h2 className="max-w-3xl text-4xl font-light tracking-[-0.05em] md:text-6xl lg:text-7xl">
                  {activeProject.title}
                </h2>
              </div>

              <span className="hidden text-sm tracking-widest text-white/80 md:block">
                {activeProject.year}
              </span>
            </div>
          </div>
        </div>

        {/* PROJECT NAVIGATION */}

        <div className="flex items-center justify-between border-b border-white/15 py-6">
          <div className="flex gap-2">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${project.title}`}
                aria-pressed={activeIndex === index}
                className={`h-[3px] w-7 transition-all duration-500 md:w-12 ${
                  activeIndex === index
                    ? "bg-[#c4a98a]"
                    : "bg-white/20 hover:bg-white/60"
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-5">
            <span className="text-[10px] tracking-[0.2em] text-white/40">
              {activeProject.number} / 06
            </span>

            <button
              onClick={previousProject}
              aria-label="Previous project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-black"
            >
              ←
            </button>

            <button
              onClick={nextProject}
              aria-label="Next project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition hover:bg-white hover:text-black"
            >
              →
            </button>
          </div>
        </div>
      </section>

      {/* PROJECT INFORMATION */}

      <section
        ref={contentRef}
        className="px-5 py-20 md:px-12 md:py-28 lg:px-20"
      >
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">

          {/* LEFT CONTENT */}

          <div className="lg:col-span-7">
            <p
              data-reveal
              className="mb-8 text-[10px] uppercase tracking-[0.35em] text-[#b6a48a]"
            >
              / About the project
            </p>

            <h3
              data-reveal
              className="mb-8 max-w-3xl text-3xl font-light leading-tight tracking-[-0.04em] md:text-5xl"
            >
              Every frame tells a story.
              <span className="font-serif italic text-[#b6a48a]">
                {" "}Every detail creates meaning.
              </span>
            </h3>

            <p
              data-reveal
              className="max-w-2xl text-base leading-8 text-white/50 md:text-lg md:leading-9"
            >
              {activeProject.description}
            </p>

            {/* TAGS */}

            <div data-reveal className="mt-12">
              <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/40">
                Creative Direction / Tags
              </p>

              <div className="flex flex-wrap gap-3">
                {activeProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-5 py-3 text-xs text-white/70 transition duration-300 hover:border-[#b6a48a] hover:text-[#b6a48a]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PROJECT DETAILS */}

          <div className="lg:col-span-4 lg:col-start-9">
            <p
              data-reveal
              className="mb-8 text-[10px] uppercase tracking-[0.35em] text-[#b6a48a]"
            >
              / Project Details
            </p>

            <div className="border-t border-white/20">
              {[
                ["Project", activeProject.number],
                ["Category", activeProject.category],
                ["Year", activeProject.year],
                ["Location", activeProject.location],
                ["Client", activeProject.client],
              ].map(([label, value]) => (
                <div
                  key={label}
                  data-reveal
                  className="flex justify-between gap-4 border-b border-white/15 py-5"
                >
                  <span className="text-xs text-white/40">
                    {label}
                  </span>

                  <span className="max-w-[60%] text-right text-xs text-white/80">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div data-reveal className="mt-10">
              <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
                Collection Progress
              </p>

              <div className="h-[2px] w-full bg-white/10">
                <div
                  className="h-full bg-[#b6a48a] transition-all duration-700"
                  style={{
                    width: `${((activeIndex + 1) / projects.length) * 100}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-right text-xs text-white/50">
                {activeIndex + 1} of {projects.length} Projects
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ALL PROJECTS */}

      <section className="border-t border-white/15 px-5 py-20 md:px-12 md:py-28 lg:px-20">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-[10px] uppercase tracking-[0.35em] text-[#b6a48a]">
              / The complete collection
            </p>

            <h3 className="text-4xl font-light tracking-[-0.05em] md:text-6xl">
              Explore other
              <span className="font-serif italic text-[#b6a48a]">
                {" "}stories.
              </span>
            </h3>
          </div>

          <p className="max-w-xs text-sm leading-7 text-white/40">
            Six perspectives. Six different ways of seeing the world.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => {
                setActiveIndex(index);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="group text-left"
            >
              <div className="relative mb-5 aspect-[4/5] overflow-hidden bg-[#20201e]">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/0" />

                <span className="absolute left-5 top-5 text-xs tracking-widest text-white">
                  {project.number}
                </span>

                {activeIndex === index && (
                  <span className="absolute bottom-5 right-5 bg-[#b6a48a] px-4 py-2 text-[9px] uppercase tracking-widest text-black">
                    Currently viewing
                  </span>
                )}
              </div>

              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-xl font-light tracking-tight transition group-hover:text-[#b6a48a]">
                    {project.title}
                  </h4>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {project.category}
                  </p>
                </div>

                <span className="text-xs text-white/40">
                  {project.year}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/15 px-5 py-10 md:px-12 lg:px-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            © 2026 — Photography & Visual Experiments
          </p>

          <p className="font-serif text-xl italic text-[#b6a48a]">
            See the world differently.
          </p>
        </div>
      </footer>
    </main>
  );
}
