
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

const About = () => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    container.appendChild(renderer.domElement);

    // Main 3D object
    const geometry = new THREE.TorusKnotGeometry(
      1,
      0.28,
      180,
      24,
      2,
      5
    );

    const material = new THREE.MeshStandardMaterial({
      color: "#c5ff42",
      metalness: 0.85,
      roughness: 0.2,
      wireframe: true,
    });

    const knot = new THREE.Mesh(geometry, material);
    scene.add(knot);

    // Inner object
    const innerGeometry = new THREE.IcosahedronGeometry(
      0.65,
      2
    );

    const innerMaterial = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      metalness: 0.9,
      roughness: 0.15,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });

    const inner = new THREE.Mesh(
      innerGeometry,
      innerMaterial
    );

    scene.add(inner);

    // Particles
    const particleGeometry = new THREE.BufferGeometry();
    const positions = [];

    for (let i = 0; i < 500; i++) {
      positions.push(
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 5
      );
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: "#c5ff42",
      size: 0.012,
      transparent: true,
      opacity: 0.7,
    });

    const particles = new THREE.Points(
      particleGeometry,
      particleMaterial
    );

    scene.add(particles);

    // Lighting
    scene.add(
      new THREE.AmbientLight("#ffffff", 1.5)
    );

    const light = new THREE.PointLight("#c5ff42", 35);
    light.position.set(3, 3, 4);
    scene.add(light);

    const blueLight = new THREE.PointLight("#5865f2", 20);
    blueLight.position.set(-3, -2, 2);
    scene.add(blueLight);

    // Mouse movement
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();

      mouseX =
        ((event.clientX - rect.left) / rect.width - 0.5) * 2;

      mouseY =
        ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    container.addEventListener("pointermove", handleMouseMove);

    // Resize
    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    });

    resizeObserver.observe(container);

    // Animation
    let animationId;

    const clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      knot.rotation.x += 0.002;
      knot.rotation.y += 0.003;

      knot.rotation.x +=
        (mouseY * 0.2 - knot.rotation.x * 0.1) * 0.02;

      knot.rotation.y +=
        (mouseX * 0.2 - knot.rotation.y * 0.1) * 0.02;

      inner.rotation.x -= 0.003;
      inner.rotation.y += 0.004;

      particles.rotation.y = elapsed * 0.025;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);

      resizeObserver.disconnect();

      container.removeEventListener(
        "pointermove",
        handleMouseMove
      );

      geometry.dispose();
      material.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.from(".about-top", {
        y: 30,
        opacity: 0,
        duration: 0.8,
      })
        .from(
          ".about-heading span",
          {
            y: 100,
            opacity: 0,
            stagger: 0.12,
            duration: 1,
          },
          "-=0.4"
        )
        .from(
          ".about-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".about-card",
          {
            y: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
          },
          "-=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    "React.js",
    "JavaScript",
    "Three.js",
    "GSAP",
    "WebGL",
    "Redux Toolkit",
    "Tailwind CSS",
    "Creative Coding",
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen overflow-hidden bg-[#10110e] px-[6vw] py-[5vh] text-[#f2f1eb]"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c5ff42]/[0.04] blur-[150px]" />

      {/* Header */}
      <header className="about-top relative z-10 flex items-center justify-between border-b border-white/15 pb-5">
        <span className="text-xs uppercase tracking-[0.3em]">
          About / 01
        </span>

        <span className="text-xs uppercase tracking-[0.2em] text-white/50">
          Independent Creative Developer
        </span>

        <span className="hidden text-xs text-[#c5ff42] sm:block">
          ● Available for work
        </span>
      </header>

      {/* Main section */}
      <div className="relative z-10 grid min-h-[78vh] items-center gap-8 py-16 lg:grid-cols-[1.1fr_0.9fr]">

        {/* Left content */}
        <div className="relative z-20">

          <div className="mb-8 flex items-center gap-3">
            <span className="h-[1px] w-10 bg-[#c5ff42]" />

            <p className="text-xs uppercase tracking-[0.3em] text-[#c5ff42]">
              Beyond the ordinary web
            </p>
          </div>

          {/* Heading */}
          <h1 className="about-heading overflow-hidden text-[clamp(3.8rem,8vw,8rem)] font-medium leading-[0.88] tracking-[-0.08em]">
            <span className="block">Building</span>

            <span className="block font-light italic text-[#c5ff42]">
              digital
            </span>

            <span className="block">worlds<span className="text-[#c5ff42]">.</span></span>
          </h1>

          {/* Description */}
          <div className="about-description mt-10 max-w-[580px]">
            <p className="text-base leading-[1.9] text-white/55 md:text-lg">
              I'm Madhukar Yadav, a creative developer
              passionate about the intersection of design,
              technology and imagination.

              I build interactive digital experiences using
              React, JavaScript, GSAP and Three.js.
              My focus is transforming complex ideas into
              engaging, meaningful and memorable web
              experiences.
            </p>
          </div>

          {/* Skills */}
          <div className="mt-10">
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-white/40">
              My creative toolkit
            </p>

            <div className="flex max-w-[550px] flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/70 transition-all duration-300 hover:border-[#c5ff42] hover:bg-[#c5ff42] hover:text-black"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <a
              href="mailto:astrodeepak@gmail.com"
              className="group flex items-center gap-3 text-sm"
            >
              Let's talk

              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#c5ff42] text-black transition-transform duration-300 group-hover:rotate-45">
                ↗
              </span>
            </a>

            <span className="text-xs text-white/40">
              Based in India
            </span>
          </div>
        </div>

        {/* Right 3D dimension */}
        <div className="relative mx-auto flex h-[450px] w-full max-w-[580px] items-center justify-center lg:h-[620px]">

          {/* 3D canvas */}
          <div
            ref={canvasRef}
            className="absolute inset-0 z-10 h-full w-full"
          />

          {/* Floating label */}
          <div className="about-card absolute right-0 top-[12%] z-20 rounded-xl border border-white/10 bg-[#191b16]/80 px-5 py-4 backdrop-blur-xl">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
              Current dimension
            </p>

            <p className="mt-2 text-sm text-[#c5ff42]">
              Creative / 3D
            </p>
          </div>

          {/* Floating bottom label */}
          <div className="about-card absolute bottom-[12%] left-0 z-20 rounded-xl border border-white/10 bg-[#191b16]/80 px-5 py-4 backdrop-blur-xl">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">
              Exploring
            </p>

            <p className="mt-2 text-sm">
              New possibilities ↗
            </p>
          </div>

          {/* Center label */}
          <div className="pointer-events-none absolute z-0 text-center">
            <span className="text-[10px] uppercase tracking-[0.5em] text-white/20">
              M / Y
            </span>
          </div>

        </div>
      </div>

      {/* Bottom information */}
      <div className="relative z-10 grid grid-cols-2 gap-8 border-t border-white/15 py-8 md:grid-cols-4">

        <div className="about-card">
          <p className="text-3xl font-light tracking-tight">
            01<span className="text-[#c5ff42]">.</span>
          </p>

          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
            Design thinking
          </p>
        </div>

        <div className="about-card">
          <p className="text-3xl font-light tracking-tight">
            02<span className="text-[#c5ff42]">.</span>
          </p>

          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
            Creative coding
          </p>
        </div>

        <div className="about-card">
          <p className="text-3xl font-light tracking-tight">
            03<span className="text-[#c5ff42]">.</span>
          </p>

          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
            Interactive 3D
          </p>
        </div>

        <div className="about-card">
          <p className="text-3xl font-light tracking-tight">
            04<span className="text-[#c5ff42]">.</span>
          </p>

          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
            Digital experiences
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/35">
          Designed with curiosity
        </span>

        <span className="text-[9px] uppercase tracking-[0.25em] text-white/35">
          Madhukar Yadav © 2026
        </span>

        <span className="text-[9px] uppercase tracking-[0.25em] text-[#c5ff42]">
          Keep creating ↗
        </span>
      </footer>
    </section>
  );
};

export default About;

