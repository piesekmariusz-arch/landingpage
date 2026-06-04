import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Mail, Phone, Linkedin, ArrowRight, ArrowDown } from "lucide-react";
import { translations, CONTACT, ASSETS } from "@/i18n/translations";

const EASE = [0.16, 1, 0.3, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const SectionLabel = ({ children }) => (
  <span
    className="inline-block text-[13px] lg:text-sm uppercase tracking-[0.28em] font-mono text-[#27aae1]"
    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
  >
    {children}
  </span>
);

const Navbar = ({ lang, setLang, t }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "about", label: t.nav.about },
    { id: "services", label: t.nav.services },
    { id: "map", label: t.nav.map },
    { id: "trainings", label: t.nav.trainings },
    { id: "contact", label: t.nav.contact },
  ];

  const goTo = (id) => {
    const wasOpen = open;
    setOpen(false);
    const doScroll = () =>
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (wasOpen) {
      // Wait for the mobile menu collapse animation (~0.35s) before scrolling
      // so the document layout shift doesn't cancel the smooth scroll.
      window.setTimeout(doScroll, 400);
    } else {
      doScroll();
    }
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-[#0d2745]/85 border-b border-white/5 h-36 lg:h-40"
          : "bg-transparent h-44 lg:h-52"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-full flex items-center justify-between">
        <button
          data-testid="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3 group"
          aria-label="ForecastFlow"
        >
          <img
            src={ASSETS.logo}
            alt="ForecastFlow"
            className={`w-auto transition-all duration-500 ${
              scrolled ? "h-28 lg:h-32" : "h-32 lg:h-44"
            }`}
          />
        </button>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <button
              key={l.id}
              data-testid={`nav-link-${l.id}`}
              onClick={() => goTo(l.id)}
              className="text-base lg:text-lg tracking-wide text-white/85 hover:text-[#27aae1] transition-colors duration-300"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div
            data-testid="lang-switcher"
            className="flex items-center text-[12px] font-mono tracking-wider border border-white/15 rounded-full overflow-hidden"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <button
              data-testid="lang-pl"
              onClick={() => setLang("pl")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "pl"
                  ? "bg-[#27aae1] text-[#0d2745]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              PL
            </button>
            <span className="w-px h-4 bg-white/15" />
            <button
              data-testid="lang-en"
              onClick={() => setLang("en")}
              className={`px-3 py-1.5 transition-colors ${
                lang === "en"
                  ? "bg-[#27aae1] text-[#0d2745]"
                  : "text-white/70 hover:text-white"
              }`}
            >
              EN
            </button>
          </div>

          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden text-white/80 hover:text-white"
            aria-label="Menu"
          >
            <div className="flex flex-col gap-1.5 items-end">
              <span className={`block h-px w-6 bg-current transition-all ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
              <span className={`block h-px w-4 bg-current transition-all ${open ? "opacity-0" : ""}`} />
              <span className={`block h-px w-6 bg-current transition-all ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="lg:hidden overflow-hidden border-t border-white/5 bg-[#0d2745]/95 backdrop-blur-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((l) => (
                <button
                  key={l.id}
                  data-testid={`mobile-nav-link-${l.id}`}
                  onClick={() => goTo(l.id)}
                  className="text-left text-white/85 hover:text-[#27aae1] text-base tracking-wide"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = ({ t }) => {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative min-h-[100svh] flex items-end overflow-hidden bg-[#0d2745]"
    >
      <div className="absolute inset-0">
        <img
          src={ASSETS.hero}
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "saturate(0.9)" }}
        />
        <div className="absolute inset-0 bg-[#0d2745]/75 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d2745]/60 via-[#0d2745]/40 to-[#0d2745]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d2745]/80 via-transparent to-transparent" />
      </div>

      {/* corner ticks */}
      <div className="absolute top-56 left-6 lg:left-10 hidden md:block">
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#27aae1]/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          50°03'06.1"N 19°56'41.6"E
        </div>
      </div>
      <div className="absolute top-56 right-6 lg:right-10 hidden md:block">
        <div className="font-mono text-[10px] tracking-[0.3em] text-[#27aae1]/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
          EST. KRAKÓW · PL
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-10 pb-20 lg:pb-28 pt-56 lg:pt-64">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.12 } },
          }}
          className="max-w-5xl"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <SectionLabel>{t.hero.eyebrow}</SectionLabel>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            data-testid="hero-motto"
            className="text-white font-medium tracking-[-0.02em] leading-[0.98]"
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "clamp(2.75rem, 8.5vw, 7.5rem)",
            }}
          >
            {t.hero.motto}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-[#cbd5e1] text-base lg:text-lg leading-relaxed"
            style={{ fontFamily: "'Zalando Sans', sans-serif" }}
          >
            {t.hero.sub}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              data-testid="hero-cta-primary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-3 bg-[#27aae1] text-[#0d2745] px-6 py-3.5 text-sm tracking-wide font-medium hover:bg-white transition-colors duration-300"
            >
              {t.hero.cta}
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#services"
              data-testid="hero-cta-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group inline-flex items-center gap-3 border border-white/25 text-white px-6 py-3.5 text-sm tracking-wide hover:border-[#27aae1] hover:text-[#27aae1] transition-colors duration-300"
            >
              {t.hero.ctaSecondary}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-6 right-6 lg:right-10 flex items-center gap-2 text-[#27aae1]/80" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        <span className="text-[10px] tracking-[0.3em] uppercase">{t.hero.scroll}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </motion.div>
      </div>
    </section>
  );
};

const StatsStrip = ({ t }) => (
  <section
    data-testid="stats-section"
    className="border-y border-white/8 bg-[#0a1e36]"
  >
    <div className="max-w-[1400px] mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-white/8">
      {t.stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          className="px-6 lg:px-10 py-10 lg:py-14"
          data-testid={`stat-${i}`}
        >
          <div
            className="text-[#27aae1] text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {s.value}
          </div>
          <div
            className="mt-3 text-[11px] lg:text-xs uppercase tracking-[0.2em] text-white/55"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            {s.label}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

const About = ({ t }) => (
  <section
    id="about"
    data-testid="about-section"
    className="relative scroll-mt-44 py-24 lg:py-36 bg-[#0d2745]"
  >
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-4"
        >
          <SectionLabel>{t.about.label}</SectionLabel>
          <h2
            className="mt-6 text-white font-medium tracking-tight leading-[1.05]"
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            }}
          >
            {t.about.title}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="lg:col-span-7 lg:col-start-6 space-y-6"
          style={{ fontFamily: "'Zalando Sans', sans-serif" }}
        >
          {t.about.body.map((p, i) => (
            <p
              key={i}
              className={`leading-relaxed ${
                i === 0 ? "text-lg lg:text-xl text-white" : "text-[15px] lg:text-base text-[#cbd5e1]"
              }`}
            >
              {p}
            </p>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

const Services = ({ t }) => (
  <section
    id="services"
    data-testid="services-section"
    className="relative scroll-mt-44 py-24 lg:py-36 bg-[#0a1e36] border-y border-white/8"
  >
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="max-w-3xl mb-16 lg:mb-24"
      >
        <SectionLabel>{t.services.label}</SectionLabel>
        <h2
          className="mt-6 text-white font-medium tracking-tight leading-[1.05]"
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
          }}
        >
          {t.services.title}
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 border-l border-t border-white/8">
        {t.services.items.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE }}
            data-testid={`service-card-${i + 1}`}
            className="group relative border-r border-b border-white/8 p-8 lg:p-10 hover:bg-[#0d2745] transition-colors duration-500 cursor-default"
          >
            <div
              className="text-[10px] uppercase tracking-[0.3em] text-[#27aae1]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {s.code}
            </div>
            <h3
              className="mt-6 text-white text-xl lg:text-2xl font-medium tracking-tight leading-snug"
              style={{ fontFamily: "'Urbanist', sans-serif" }}
            >
              {s.title}
            </h3>
            <p
              className="mt-5 text-[14.5px] text-[#cbd5e1] leading-relaxed"
              style={{ fontFamily: "'Zalando Sans', sans-serif" }}
            >
              {s.desc}
            </p>
            <div className="mt-8 h-px w-8 bg-white/15 group-hover:w-20 group-hover:bg-[#27aae1] transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const MapSection = ({ t }) => (
  <section
    id="map"
    data-testid="map-section"
    className="relative scroll-mt-44 py-24 lg:py-36 bg-[#0d2745] overflow-hidden"
  >
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-4 lg:sticky lg:top-28"
        >
          <SectionLabel>{t.map.label}</SectionLabel>
          <h2
            className="mt-6 text-white font-medium tracking-tight leading-[1.05]"
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            }}
          >
            {t.map.title}
          </h2>
          <p
            className="mt-6 text-[#cbd5e1] text-[15px] leading-relaxed"
            style={{ fontFamily: "'Zalando Sans', sans-serif" }}
          >
            {t.map.subtitle}
          </p>
          <div
            className="mt-8 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-[#27aae1]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <span className="w-2 h-2 rounded-full bg-[#27aae1] animate-pulse" />
            PL · UK · IE · LT · LV · EE · FI
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
          className="lg:col-span-8"
        >
          <div className="relative border border-white/10 p-3 lg:p-5 bg-[#0a1e36]">
            <div className="absolute -top-px -left-px w-6 h-6 border-t border-l border-[#27aae1]" />
            <div className="absolute -top-px -right-px w-6 h-6 border-t border-r border-[#27aae1]" />
            <div className="absolute -bottom-px -left-px w-6 h-6 border-b border-l border-[#27aae1]" />
            <div className="absolute -bottom-px -right-px w-6 h-6 border-b border-r border-[#27aae1]" />
            <img
              src={ASSETS.map}
              alt={t.map.caption}
              className="w-full h-auto"
              data-testid="map-image"
            />
          </div>
          <div
            className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.25em] text-white/45"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <span>FIG. 01 / {t.map.caption}</span>
            <span>FORECASTFLOW · 2025</span>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const PTV = ({ t }) => (
  <section
    id="trainings"
    data-testid="ptv-section"
    className="relative scroll-mt-44 py-24 lg:py-36 bg-[#112c4f] border-y border-white/8 overflow-hidden"
  >
    {/* subtle grid backdrop */}
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage:
          "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }}
    />
    <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="lg:col-span-6"
        >
          <SectionLabel>{t.ptv.label}</SectionLabel>

          <div
            data-testid="ptv-badge"
            className="mt-6 inline-flex items-center gap-3 border border-[#27aae1]/60 px-4 py-2 text-[#27aae1]"
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <span className="w-1.5 h-1.5 bg-[#27aae1]" />
            <span className="text-[11px] uppercase tracking-[0.25em]">{t.ptv.badge}</span>
          </div>

          <h2
            className="mt-8 text-white font-medium tracking-tight leading-[1.05]"
            style={{
              fontFamily: "'Urbanist', sans-serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            }}
          >
            {t.ptv.title}
          </h2>

          <p
            className="mt-8 text-[15.5px] text-[#cbd5e1] leading-relaxed max-w-xl"
            style={{ fontFamily: "'Zalando Sans', sans-serif" }}
          >
            {t.ptv.body}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          className="lg:col-span-5 lg:col-start-8 space-y-px"
        >
          {t.ptv.tools.map((tool, i) => (
            <div
              key={i}
              data-testid={`ptv-tool-${i}`}
              className="border border-white/10 px-6 py-6"
            >
              <div
                className="text-[10px] uppercase tracking-[0.3em] text-[#27aae1] mb-2"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                {`TOOL · 0${i + 1}`}
              </div>
              <div
                className="text-white text-xl font-medium tracking-tight"
                style={{ fontFamily: "'Urbanist', sans-serif" }}
              >
                {tool.name}
              </div>
              <div
                className="text-[14px] text-[#cbd5e1] mt-2 leading-relaxed"
                style={{ fontFamily: "'Zalando Sans', sans-serif" }}
              >
                {tool.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

const Contact = ({ t }) => (
  <section
    id="contact"
    data-testid="contact-section"
    className="relative scroll-mt-44 py-24 lg:py-36 bg-[#0a1e36]"
  >
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
        className="max-w-4xl"
      >
        <SectionLabel>{t.contact.label}</SectionLabel>
        <h2
          className="mt-6 text-white font-medium tracking-[-0.02em] leading-[0.98]"
          style={{
            fontFamily: "'Urbanist', sans-serif",
            fontSize: "clamp(2.5rem, 7vw, 6rem)",
          }}
        >
          {t.contact.title}
        </h2>
        <p
          className="mt-6 text-[#cbd5e1] text-lg max-w-xl"
          style={{ fontFamily: "'Zalando Sans', sans-serif" }}
        >
          {t.contact.sub}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        className="mt-16 lg:mt-20 grid md:grid-cols-3 border-t border-white/10"
      >
        <a
          href={`mailto:${CONTACT.email}`}
          data-testid="contact-email"
          className="group block border-b md:border-b-0 md:border-r border-white/10 p-8 lg:p-10 hover:bg-[#0d2745] transition-colors"
        >
          <div className="flex items-center gap-3 text-[#27aae1]">
            <Mail className="w-4 h-4" />
            <span
              className="text-[11px] uppercase tracking-[0.25em]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {t.contact.emailLabel}
            </span>
          </div>
          <div
            className="mt-5 text-white text-lg lg:text-xl group-hover:text-[#27aae1] transition-colors break-all"
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            {CONTACT.email}
          </div>
        </a>
        <a
          href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
          data-testid="contact-phone"
          className="group block border-b md:border-b-0 md:border-r border-white/10 p-8 lg:p-10 hover:bg-[#0d2745] transition-colors"
        >
          <div className="flex items-center gap-3 text-[#27aae1]">
            <Phone className="w-4 h-4" />
            <span
              className="text-[11px] uppercase tracking-[0.25em]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {t.contact.phoneLabel}
            </span>
          </div>
          <div
            className="mt-5 text-white text-lg lg:text-xl group-hover:text-[#27aae1] transition-colors"
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            {CONTACT.phone}
          </div>
        </a>
        <a
          href={CONTACT.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="contact-linkedin"
          className="group block p-8 lg:p-10 hover:bg-[#0d2745] transition-colors"
        >
          <div className="flex items-center gap-3 text-[#27aae1]">
            <Linkedin className="w-4 h-4" />
            <span
              className="text-[11px] uppercase tracking-[0.25em]"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {t.contact.linkedinLabel}
            </span>
          </div>
          <div
            className="mt-5 flex items-center gap-2 text-white text-lg lg:text-xl group-hover:text-[#27aae1] transition-colors"
            style={{ fontFamily: "'Urbanist', sans-serif" }}
          >
            forecastflowpl
            <ArrowUpRight className="w-5 h-5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
        </a>
      </motion.div>
    </div>
  </section>
);

const Footer = ({ t }) => (
  <footer
    data-testid="footer-section"
    className="bg-[#0d2745] border-t border-white/10"
  >
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 lg:py-14 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
      <div className="flex items-center gap-4">
        <img src={ASSETS.logo} alt="ForecastFlow" className="h-14 lg:h-16 w-auto" />
        <span
          className="hidden md:inline text-[12px] text-white/45 tracking-wider"
          style={{ fontFamily: "'IBM Plex Mono', monospace" }}
        >
          / {t.footer.tagline}
        </span>
      </div>
      <div
        className="text-[11px] uppercase tracking-[0.25em] text-white/40"
        style={{ fontFamily: "'IBM Plex Mono', monospace" }}
      >
        © 2025 - 2026 ForecastFlow · {t.footer.rights}
      </div>
    </div>
  </footer>
);

export default function LandingPage() {
  const [lang, setLangState] = useState(() => {
    if (typeof window === "undefined") return "pl";
    return localStorage.getItem("ff_lang") || "pl";
  });

  const setLang = useCallback((l) => {
    setLangState(l);
    try {
      localStorage.setItem("ff_lang", l);
    } catch (e) {
      /* noop */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = "ForecastFlow";
  }, [lang]);

  const t = translations[lang];

  return (
    <div className="bg-[#0d2745] text-white min-h-screen" style={{ fontFamily: "'Zalando Sans', sans-serif" }}>
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <Hero t={t} />
        <StatsStrip t={t} />
        <About t={t} />
        <Services t={t} />
        <MapSection t={t} />
        <PTV t={t} />
        <Contact t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}
