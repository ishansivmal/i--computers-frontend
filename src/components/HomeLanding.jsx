import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  HiOutlineComputerDesktop,
  HiOutlineCpuChip,
  HiOutlineShieldCheck,
  HiOutlineTruck,
} from "react-icons/hi2";
import { BiChevronRight, BiMouse } from "react-icons/bi";
import ScrollReveal from "./ScrollReveal";
import TiltCard from "./TiltCard";
import AnimatedCounter from "./AnimatedCounter";
import FloatingParticles from "./FloatingParticles";
import ParallaxImage from "./ParallaxImage";

export default function HomeLanding() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [mouseY, setMouseY] = useState(0);
  const heroRef = useRef(null);

  // Hero entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Parallax mouse effect on hero
  useEffect(() => {
    function handleMouseMove(e) {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      if (e.clientY >= rect.top && e.clientY <= rect.bottom) {
        setMouseY((e.clientY - rect.top) / rect.height - 0.5);
      }
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      {/* ━━━━━━━━━━━━━━━━━━ HERO ━━━━━━━━━━━━━━━━━━ */}
      <section
        ref={heroRef}
        className="relative w-full min-h-[100vh] flex items-center overflow-hidden"
      >
        {/* Parallax Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/home.jpg"
            alt="High-performance computers"
            className="w-full h-[110%] object-cover"
            style={{
              transform: `translate3d(0, ${mouseY * -30}px, 0) scale(1.05)`,
              transition: "transform 0.3s ease-out",
              willChange: "transform",
            }}
            loading="eager"
          />
          {/* Multi-layer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        </div>

        {/* Floating Particles */}
        <FloatingParticles count={35} className="z-[1]" />

        {/* Animated Grid Lines */}
        <div className="absolute inset-0 z-[1] opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
          <div className="max-w-2xl">
            {/* Animated Badge */}
            <div
              className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6 transition-all duration-700 ease-out ${
                heroVisible
                  ? "opacity-100 translate-y-0 rotate-0"
                  : "opacity-0 translate-y-8 -rotate-2"
              }`}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <span className="text-white/90 text-sm font-medium tracking-wide">
                🔥 New Arrivals — RTX 5090 In Stock
              </span>
            </div>

            {/* 3D Perspective Heading */}
            <div
              style={{
                perspective: "1000px",
                perspectiveOrigin: "left center",
              }}
            >
              <h1
                className={`text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.05] transition-all duration-1000 delay-150 ease-out ${
                  heroVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transform: heroVisible
                    ? "rotateX(0deg) rotateY(0deg)"
                    : "rotateX(10deg) rotateY(-5deg)",
                  transition:
                    "opacity 1s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.15s",
                  transformStyle: "preserve-3d",
                }}
              >
                Build Your
                <span className="block mt-1">
                  <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500"
                    style={{
                      backgroundSize: "200% auto",
                      animation: "shimmer 3s ease-in-out infinite",
                    }}
                  >
                    Dream Setup
                  </span>
                </span>
              </h1>
            </div>

            {/* Subtitle with typing feel */}
            <p
              className={`mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-lg transition-all duration-700 delay-400 ease-out ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Premium desktops, laptops, and components — handpicked for
              performance, built for reliability. Experience computing at its
              finest.
            </p>

            {/* CTA Buttons with 3D press effect */}
            <div
              className={`mt-8 flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ease-out ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <Link
                to="/products"
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold px-9 py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.04] active:scale-[0.97] overflow-hidden"
              >
                {/* Shine sweep on hover */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                <span className="relative z-10 flex items-center gap-2">
                  Shop Now
                  <BiChevronRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/25 hover:border-white/60 text-white font-semibold px-9 py-4 rounded-2xl transition-all duration-300 backdrop-blur-sm hover:bg-white/10 hover:scale-[1.02]"
              >
                Browse Categories
              </Link>
            </div>

            {/* Animated Stats */}
            <div
              className={`mt-14 flex gap-8 sm:gap-14 transition-all duration-700 delay-700 ease-out ${
                heroVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {[
                { value: "500", suffix: "+", label: "Products" },
                { value: "10000", suffix: "+", label: "Happy Customers" },
                { value: "247", suffix: "", label: "24/7 Support", display: "24/7" },
              ].map((stat) => (
                <div key={stat.label} className="group cursor-default">
                  <div className="text-3xl sm:text-4xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                    {stat.display ? (
                      stat.display
                    ) : (
                      <>
                        <AnimatedCounter target={stat.value} />
                        {stat.suffix}
                      </>
                    )}
                  </div>
                  <div className="text-sm text-gray-400 mt-1 group-hover:text-gray-300 transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <BiMouse className="text-white/60 text-2xl" />
          <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━ FEATURES BAR (3D cards) ━━━━━━━━━━━━━━ */}
      <section className="w-full bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 relative overflow-hidden">
        {/* Subtle animated background pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            animation: "slidePattern 20s linear infinite",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <HiOutlineTruck className="text-3xl" />,
              title: "Free Shipping",
              desc: "On orders over $99",
            },
            {
              icon: <HiOutlineShieldCheck className="text-3xl" />,
              title: "2-Year Warranty",
              desc: "On all products",
            },
            {
              icon: <HiOutlineCpuChip className="text-3xl" />,
              title: "Genuine Parts",
              desc: "100% authentic",
            },
            {
              icon: <HiOutlineComputerDesktop className="text-3xl" />,
              title: "Expert Support",
              desc: "Tech help 24/7",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.title} direction="up" delay={i * 100}>
              <div className="flex items-center gap-3 text-white group cursor-default">
                <div className="shrink-0 bg-white/15 group-hover:bg-white/25 rounded-xl p-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  {item.icon}
                </div>
                <div>
                  <div className="font-semibold text-sm sm:text-base">
                    {item.title}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-100">
                    {item.desc}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━ CATEGORIES (3D Tilt Cards) ━━━━━━━━━━━ */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 sm:py-24">
        <ScrollReveal direction="up">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-blue-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Categories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Shop by Category
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-xl mx-auto">
              Find the perfect hardware — from gaming rigs to office
              workstations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {[
            {
              title: "Laptops",
              desc: "Portable power for work & play",
              emoji: "💻",
              gradient: "from-violet-500 to-purple-600",
              shadow: "shadow-violet-200",
            },
            {
              title: "Desktops",
              desc: "High-performance towers & AIOs",
              emoji: "🖥️",
              gradient: "from-blue-500 to-indigo-600",
              shadow: "shadow-blue-200",
            },
            {
              title: "Components",
              desc: "GPUs, CPUs, RAM & more",
              emoji: "⚙️",
              gradient: "from-cyan-500 to-blue-600",
              shadow: "shadow-cyan-200",
            },
            {
              title: "Monitors",
              desc: "Crisp visuals for every setup",
              emoji: "🖥️",
              gradient: "from-emerald-500 to-teal-600",
              shadow: "shadow-emerald-200",
            },
            {
              title: "Peripherals",
              desc: "Keyboards, mice & accessories",
              emoji: "⌨️",
              gradient: "from-orange-500 to-red-500",
              shadow: "shadow-orange-200",
            },
            {
              title: "Networking",
              desc: "Routers, switches & cables",
              emoji: "🌐",
              gradient: "from-pink-500 to-rose-600",
              shadow: "shadow-pink-200",
            },
          ].map((cat, i) => (
            <ScrollReveal
              key={cat.title}
              direction={i % 2 === 0 ? "left" : "right"}
              delay={i * 80}
            >
              <TiltCard className="rounded-2xl" intensity={12}>
                <Link
                  to="/products"
                  className={`group block relative overflow-hidden rounded-2xl p-7 sm:p-9 bg-white border border-gray-100 shadow-md hover:shadow-2xl hover:${cat.shadow} transition-all duration-500`}
                >
                  {/* Hover gradient fill */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-600`}
                  />
                  {/* Floating emoji with 3D */}
                  <div
                    className="relative z-10"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <span
                      className="inline-block text-5xl sm:text-6xl group-hover:scale-125 transition-transform duration-500"
                      style={{
                        transform: "translateZ(30px)",
                        display: "inline-block",
                      }}
                    >
                      {cat.emoji}
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-400">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-gray-500 group-hover:text-white/80 transition-colors duration-400 text-sm">
                      {cat.desc}
                    </p>
                    <div className="mt-5 flex items-center gap-1 text-blue-600 group-hover:text-white font-medium text-sm transition-colors duration-400">
                      Explore
                      <BiChevronRight className="text-lg group-hover:translate-x-2 transition-transform duration-400" />
                    </div>
                  </div>
                </Link>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━ PARALLAX IMAGE DIVIDER ━━━━━━━━━━━ */}
      <ParallaxImage
        src="/home.jpg"
        alt="Computer setup showcase"
        speed={0.25}
        className="w-full h-[40vh] sm:h-[50vh]"
      />

      {/* ━━━━━━━━━━━ PROMO BANNER (3D orb + glow) ━━━━━━━━━━━ */}
      <section className="w-full bg-gray-950 py-20 sm:py-24 relative overflow-hidden">
        {/* Background glow circles */}
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <ScrollReveal direction="left" className="flex-1">
            <div className="text-center lg:text-left">
              <span className="inline-block bg-blue-500/15 text-blue-400 font-semibold text-sm px-5 py-2 rounded-full mb-5 border border-blue-500/20">
                ⚡ Limited Time Offer
              </span>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Up to{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    40% Off
                  </span>
                  {/* Underline decoration */}
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full" />
                </span>
                <br />
                on Gaming PCs
              </h2>
              <p className="mt-5 text-gray-400 text-lg max-w-lg mx-auto lg:mx-0">
                Level up your gaming experience with our curated collection of
                high-performance gaming machines.
              </p>
              <Link
                to="/products"
                className="group inline-flex items-center gap-2 mt-7 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-9 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50"
              >
                Shop Deals
                <BiChevronRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </ScrollReveal>

          {/* 3D Rotating Orb */}
          <ScrollReveal direction="zoom" className="flex-1 flex justify-center">
            <div
              className="relative w-64 h-64 sm:w-80 sm:h-80"
              style={{ perspective: "800px" }}
            >
              {/* Orbiting ring */}
              <div
                className="absolute inset-[-20px] border-2 border-blue-500/20 rounded-full"
                style={{ animation: "orbit 8s linear infinite" }}
              />
              <div
                className="absolute inset-[-40px] border border-indigo-500/10 rounded-full"
                style={{ animation: "orbit 12s linear infinite reverse" }}
              />
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full blur-3xl opacity-25 animate-pulse" />
              {/* 3D Card */}
              <div
                className="absolute inset-4 bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 rounded-3xl flex items-center justify-center border border-white/10 shadow-2xl shadow-blue-500/20"
                style={{
                  animation: "float3D 6s ease-in-out infinite",
                  transformStyle: "preserve-3d",
                }}
              >
                <HiOutlineComputerDesktop
                  className="text-white text-8xl sm:text-9xl opacity-80"
                  style={{ transform: "translateZ(40px)" }}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ━━━━━━━━━━━ WHY CHOOSE US (3D Tilt) ━━━━━━━━━━━ */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20 sm:py-24">
        <ScrollReveal direction="up">
          <div className="text-center mb-14">
            <span className="inline-block bg-blue-50 text-blue-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Why Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Why Choose i-Computers?
            </h2>
            <p className="mt-4 text-gray-500 text-lg">
              We're committed to delivering the best computing experience.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "🚀",
              title: "Lightning Fast Delivery",
              desc: "Get your order delivered within 2-3 business days. Same-day delivery in select cities.",
            },
            {
              icon: "🔒",
              title: "Secure Payments",
              desc: "SSL-encrypted gateway supporting all major payment methods. Shop with confidence.",
            },
            {
              icon: "🎯",
              title: "Expert Recommendations",
              desc: "Our team of tech experts helps you choose the perfect setup for your needs and budget.",
            },
          ].map((item, i) => (
            <ScrollReveal key={item.title} direction="up" delay={i * 150}>
              <TiltCard className="rounded-2xl h-full" intensity={8}>
                <div className="text-center p-9 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl border border-gray-100 transition-all duration-500 h-full">
                  <span className="inline-block text-5xl sm:text-6xl group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </span>
                  <h3 className="mt-5 text-xl font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━ MARQUEE BRANDS TICKER ━━━━━━━━━━━ */}
      <section className="w-full py-12 bg-gray-50 border-y border-gray-100 overflow-hidden">
        <ScrollReveal direction="up">
          <p className="text-center text-sm text-gray-400 font-medium tracking-widest uppercase mb-6">
            Trusted Brands
          </p>
        </ScrollReveal>
        <div className="flex whitespace-nowrap" style={{ animation: "marquee 25s linear infinite" }}>
          {[...Array(2)].map((_, setIndex) => (
            <div key={setIndex} className="flex shrink-0 items-center gap-16 px-8">
              {["NVIDIA", "AMD", "Intel", "ASUS", "MSI", "Corsair", "Logitech", "Samsung", "Dell", "HP", "Lenovo", "Razer"].map(
                (brand) => (
                  <span
                    key={`${setIndex}-${brand}`}
                    className="text-2xl sm:text-3xl font-bold text-gray-300 hover:text-gray-600 transition-colors duration-300 cursor-default select-none"
                  >
                    {brand}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━ NEWSLETTER CTA ━━━━━━━━━━━ */}
      <section className="w-full bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-800 py-20 sm:py-24 relative overflow-hidden">
        {/* Decorative blurs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-cyan-400/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/15 rounded-full blur-[120px]" />

        <ScrollReveal direction="zoom" className="relative">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Stay Updated with Latest Deals
            </h2>
            <p className="mt-4 text-blue-100 text-lg">
              Subscribe to our newsletter and never miss a discount.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-white/40 backdrop-blur-sm transition-all duration-300"
              />
              <button className="group px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-all duration-300 hover:scale-[1.04] active:scale-[0.97] shrink-0 shadow-lg shadow-blue-900/30">
                Subscribe
                <span className="inline-block group-hover:translate-x-1 transition-transform duration-300 ml-1">
                  →
                </span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ━━━━━━━━━━━ FOOTER ━━━━━━━━━━━ */}
      <footer className="w-full bg-gray-950 text-gray-400">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
          <ScrollReveal direction="up" delay={0} className="col-span-2 md:col-span-1">
            <div>
              <h3 className="text-white font-bold text-2xl mb-3">
                i-Computers
              </h3>
              <p className="text-sm leading-relaxed">
                Your one-stop shop for premium computers, components, and
                accessories.
              </p>
              {/* Social icons */}
              <div className="flex gap-3 mt-5">
                {["FB", "IG", "TW", "YT"].map((s) => (
                  <span
                    key={s}
                    className="w-10 h-10 bg-white/5 hover:bg-blue-500 rounded-xl flex items-center justify-center text-xs font-bold text-gray-500 hover:text-white transition-all duration-300 cursor-pointer hover:scale-110"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={100}>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <div className="flex flex-col gap-3 text-sm">
                {[
                  { to: "/", label: "Home" },
                  { to: "/products", label: "Products" },
                  { to: "/cart", label: "Cart" },
                  { to: "/orders", label: "Orders" },
                ].map((link) => (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="hover:text-white hover:translate-x-1 transition-all duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={200}>
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <div className="flex flex-col gap-3 text-sm">
                {["FAQ", "Contact Us", "Shipping Info", "Returns"].map((s) => (
                  <span
                    key={s}
                    className="hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={300}>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex flex-col gap-3 text-sm">
                {["Facebook", "Instagram", "Twitter", "YouTube"].map((s) => (
                  <span
                    key={s}
                    className="hover:text-white hover:translate-x-1 transition-all duration-300 cursor-pointer"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
        <div className="max-w-7xl mx-auto px-6 py-8 border-t border-gray-800 text-center text-sm">
          © 2026 i-Computers. All rights reserved.
        </div>
      </footer>
    </div>
  );
}