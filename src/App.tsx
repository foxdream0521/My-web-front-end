import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Eye, 
  ArrowRight, 
  Instagram, 
  Linkedin, 
  Dribbble, 
  Mail, 
  Star, 
  Sparkles, 
  X, 
  Check, 
  Compass, 
  Clock, 
  Moon, 
  ChevronDown, 
  Award,
  Send,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { PROJECTS, JOURNAL_ENTRIES, STATS, HERO_IMAGE, PORTRAIT_IMAGE } from './data';
import { Project, JournalEntry } from './types';

export default function App() {
  // State for gallery filters
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  
  // State for project detail modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // State for email subscription
  const [email, setEmail] = useState<string>("");
  const [subscribing, setSubscribing] = useState<boolean>(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [subscriberCount, setSubscriberCount] = useState<number>(1428);
  const [subscribersList, setSubscribersList] = useState<string[]>([]);

  // State for contact modal (Connect)
  const [isConnectOpen, setIsConnectOpen] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [contactSent, setContactSent] = useState<boolean>(false);

  // State for cat's footprint Easter egg quotes
  const [catQuoteIndex, setCatQuoteIndex] = useState<number>(-1);
  const catQuotes = [
    "“Like a cat watching the city from a rooftop, I observe patterns, movements, and details...”",
    "“In the dark, all colors are silver.”",
    "“True observation requires silence. Moving without sound, seeing without being seen.”",
    "“The night is not empty. It is merely waiting.”"
  ];

  // State for background brightness toggle in Hero
  const [heroDimmed, setHeroDimmed] = useState<boolean>(true);

  // Scroll depth tracker for simple parallax effects
  const [scrollY, setScrollY] = useState<number>(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered projects
  const filteredProjects = activeFilter === "ALL" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeFilter);

  // Email submission handler
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setSubscribed(true);
      setSubscriberCount(prev => prev + 1);
      setSubscribersList(prev => [email, ...prev]);
      setEmail("");
      // Reset success status after 5 seconds
      setTimeout(() => setSubscribed(false), 5000);
    }, 1200);
  };

  // Contact form submission handler
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setIsConnectOpen(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
    }, 2000);
  };

  // Helper function to smooth scroll to an element ID
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Easter egg trigger for stat blocks
  const [statReveal, setStatReveal] = useState<string | null>(null);

  return (
    <div className="bg-background text-on-background font-sans min-h-screen relative overflow-x-hidden selection:bg-primary selection:text-on-primary">
      
      {/* Background Starry Atmosphere with Immersive UI Glowing Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[120px]" />
        <div className="absolute top-[35%] -right-[5%] w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[110px]" />
        <div className="absolute bottom-[10%] left-[5%] w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      {/* TopAppBar / Header */}
      <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl border-b border-outline/10">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-12 h-20">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-headline text-2xl text-primary tracking-tighter cursor-pointer font-extrabold flex items-center gap-2"
            id="stargazer-brand-logo"
          >
            <Moon className="w-5 h-5 text-primary animate-[spin_20s_linear_infinite]" />
            <span>foxdream</span>
          </motion.h1>

          <nav className="hidden md:flex items-center gap-10">
            {[
              { label: "Gallery", id: "gallery-section" },
              { label: "Projects", id: "projects-section" },
              { label: "About", id: "about-section" },
              { label: "Journal", id: "journal-section" }
            ].map((link, idx) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => scrollToSection(link.id)}
                className="font-mono text-[13px] tracking-[0.2em] uppercase text-on-surface-variant hover:text-primary transition-all duration-300 relative py-1 group cursor-pointer"
                id={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-4" />
              </motion.button>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button 
              onClick={() => setIsConnectOpen(true)}
              className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-opacity-90 active:scale-95 transition-all duration-300 shadow-[0_0_20px_rgba(190,198,224,0.15)] cursor-pointer"
              id="header-connect-btn"
            >
              Connect
            </button>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 scale-105">
            <motion.img 
              style={{ 
                y: scrollY * 0.15,
                scale: 1 + scrollY * 0.0003
              }}
              className={`w-full h-full object-cover transition-all duration-1000 ${heroDimmed ? 'brightness-[0.4]' : 'brightness-75'}`}
              src={HERO_IMAGE}
              alt="Nocturnal starry night with telescope dome looking up at the Milky Way galaxy"
              id="hero-bg-img"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
          </div>

          <div className="relative z-10 text-center max-w-4xl px-6 md:px-12 flex flex-col items-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono text-xs text-primary tracking-[0.4em] uppercase mb-6"
              id="hero-category-label"
            >
              ଘ(੭ ᐛ)⁄☆ﾟ.*･｡ﾟ這裡沒有藏秘密！
            </motion.p>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="font-headline text-4xl md:text-6xl text-on-background mb-8 leading-[1.15] tracking-tight text-glow"
              id="hero-main-title"
            >
               <span className="text-primary italic font-medium font-serif block sm:inline">歡迎您來到夢境.˙⋆✮</span>
            </motion.h2>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex justify-center items-center gap-6 mb-10"
              id="hero-decorative-divider"
            >
              <div className="star-divider" />
              <span className="font-sans text-base md:text-lg text-on-surface-variant font-light tracking-wide max-w-md">
                很高興您的到來₍^. .^₎⟆.
              </span>
              <div className="star-divider" />
            </motion.div>

            {/* Ambient Light Control (Easter Egg feature to highlight clean, vast design) */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              onClick={() => setHeroDimmed(!heroDimmed)}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-outline/20 bg-surface/30 backdrop-blur-md text-xs font-mono text-on-surface-variant hover:text-primary hover:border-primary/40 transition-all duration-300 cursor-pointer"
              id="hero-ambient-toggle"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span>{heroDimmed ? "Ambient Lights: Off" : "Ambient Lights: On"}</span>
            </motion.button>
          </div>

          {/* Scroll Down Indicator */}
          <div 
            onClick={() => scrollToSection("gallery-section")}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300"
            id="scroll-indicator-button"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant">Scroll</span>
            <ChevronDown className="w-4 h-4 text-primary animate-bounce" />
          </div>
        </section>

        {/* Silent Observations Section (Bento Grid & Interactive Filters) */}
        <section id="gallery-section" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 relative">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 border-b border-outline/10 pb-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="star-divider" />
                <span className="text-primary font-mono text-xs uppercase tracking-widest">123</span>
              </div>
              <h3 className="font-headline text-3xl md:text-4xl font-semibold text-on-background mb-4" id="gallery-title">
                我不知道
              </h3>
              <p className="font-sans text-base text-on-surface-variant max-w-xl leading-relaxed" id="gallery-description">
                我再想想
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2" id="gallery-filter-panel">
              {["ALL", "cat", "landscape", "food"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full font-mono text-[11px] tracking-wider transition-all duration-300 border cursor-pointer ${
                    activeFilter === filter
                      ? "bg-primary text-on-primary border-primary font-bold shadow-[0_0_12px_rgba(190,198,224,0.2)]"
                      : "bg-surface-container-low border-outline/10 text-on-surface-variant hover:text-primary hover:border-primary/40"
                  }`}
                  id={`filter-btn-${filter.toLowerCase().replace(" ", "-")}`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="gallery-grid">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => {
                // Apply different vertical alignment offset as described in the style manual/HTML (middle card is translated)
                const isCenterCard = idx % 3 === 1;
                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className={`group relative overflow-hidden rounded-xl glass-card transition-all duration-500 hover:-translate-y-2 flex flex-col h-full cursor-pointer ${
                      isCenterCard ? "md:translate-y-8" : ""
                    }`}
                    onClick={() => setSelectedProject(project)}
                    id={`project-card-${project.id}`}
                  >
                    <div className="aspect-[4/5] overflow-hidden relative">
                      <img 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={project.imageUrl} 
                        alt={project.altText}
                        id={`project-img-${project.id}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <div className="flex items-center gap-2 text-primary font-mono text-xs">
                          <span>Inspect File</span>
                          <Eye className="w-4 h-4 animate-pulse" />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="star-divider opacity-60" />
                        <p className="font-mono text-[10px] text-primary tracking-widest uppercase">{project.category}</p>
                      </div>
                      <h4 className="font-headline text-xl text-on-background mb-4 font-bold tracking-tight">
                        {project.title}
                      </h4>
                      <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-6">
                        {project.description}
                      </p>
                      <div className="mt-auto pt-4 border-t border-outline/5 flex justify-between items-center text-xs font-mono text-on-surface-variant group-hover:text-primary transition-colors">
                        <span>Case Study 0{idx + 1}</span>
                        <ArrowRight className="w-4 h-4 -translate-x-2 group-hover:translate-x-0 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-20" id="projects-section">
            <button 
              onClick={() => {
                setActiveFilter("ALL");
                scrollToSection("projects-section");
              }}
              className="font-mono text-xs text-primary tracking-widest flex items-center gap-2 group hover:text-on-background transition-colors cursor-pointer"
              id="view-all-works-btn"
            >
              VIEW ALL WORKS 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-primary" />
            </button>
          </div>
        </section>

        {/* About Section */}
        <section id="about-section" className="bg-surface-container-low py-24 md:py-32 relative overflow-hidden">
          
          {/* Subtle celestial graphic grid */}
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{
            backgroundImage: "radial-gradient(circle_at_1px_1px, #bec6e0 1px, transparent 0)",
            backgroundSize: "40px 40px"
          }} />

          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 md:gap-24 relative z-10">
            
            {/* Visual Orbit System surrounding portrait */}
            <div className="relative flex justify-center items-center" id="about-visual-canvas">
              
              {/* Rotating outer orbit */}
              <div className="aspect-square w-full max-w-[420px] rounded-full border border-primary/15 p-6 flex items-center justify-center animate-[spin_50s_linear_infinite]">
                
                {/* Orbiting dot */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#bec6e0]" />
                
                {/* Rotating middle orbit */}
                <div className="w-full h-full rounded-full border border-primary/25 p-10 relative animate-[spin_35s_linear_infinite_reverse]">
                  
                  {/* Orbiting dot */}
                  <div className="absolute bottom-0 left-1/4 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-tertiary shadow-[0_0_8px_#c3c0ff]" />

                  {/* Inner orbit */}
                  <div className="w-full h-full rounded-full border border-primary/45" />
                </div>
              </div>

              {/* Central portrait frame */}
              <div className="absolute w-[240px] md:w-[280px] aspect-square rounded-full overflow-hidden border border-primary/45 shadow-[0_0_30px_rgba(190,198,224,0.1)] group">
                <img 
                  className="w-full h-full object-cover filter grayscale brightness-[0.7] hover:brightness-95 hover:scale-105 hover:grayscale-0 transition-all duration-1000 ease-in-out" 
                  src={PORTRAIT_IMAGE}
                  alt="Stargazer portfolio photographer creative designer portrait"
                  id="about-portrait-img"
                />
              </div>
            </div>

            {/* Narrative Context */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <div className="star-divider" />
                <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">偷看⦮ ⦯</span>
              </div>
              
              <h2 className="font-headline text-3xl md:text-4xl font-bold text-on-background mb-8" id="about-title">
                簡介
              </h2>

              <p className="font-sans text-base md:text-lg text-on-surface-variant mb-6 leading-relaxed">
                我叫夜优.foxdream,別名伊雪.想怎麼叫我都可以.我知道叫我就行!
              </p>

              <p className="font-sans text-base md:text-lg text-on-surface-variant mb-12 leading-relaxed">
                我的興趣很多對很多事情感興趣,所以學過很多事情,但熟不熟就是一回事了₍^. .^₎⟆因為太多想學的想嘗試的但時間目前不夠,只好等未來有空慢慢學慢慢嘗試！最起碼我想先把現在喜歡的學好,好玩但好難要付出走夠的努力爆肝了TAT
              </p>

              {/* Tappable metrics */}
              <div className="grid grid-cols-2 gap-8 border-t border-outline/10 pt-8" id="about-metrics">
                {STATS.map((stat) => (
                  <div 
                    key={stat.id} 
                    onClick={() => setStatReveal(statReveal === stat.id ? null : stat.id)}
                    className="cursor-pointer group relative p-4 rounded-xl bg-surface/30 hover:bg-surface/60 border border-transparent hover:border-outline/10 transition-all duration-300"
                    id={`stat-block-${stat.id}`}
                  >
                    <span className="font-headline text-3xl md:text-4xl text-primary font-bold block mb-2 group-hover:scale-105 origin-left transition-transform">
                      {stat.value}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs text-on-surface-variant uppercase tracking-wider block">
                      {stat.label}
                    </span>
                    
                    <AnimatePresence>
                      {statReveal === stat.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 right-0 -bottom-16 bg-surface-container-high border border-outline/20 p-2 rounded-lg text-[10px] font-mono text-primary z-20 text-center"
                        >
                          {stat.id === 'years-observation' 
                            ? "౨ৎ𐙚生日那天該愛我一下吧⋆.˚₊⊹♡." 
                            : "85 completed physical drafts, mockups, and client handoffs."}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Silhouette Cat footprint SVG in background (Interactive Easter Egg) */}
          <div 
            className="absolute bottom-6 right-10 opacity-30 cursor-pointer hidden md:block select-none"
            onClick={() => {
              const nextIndex = (catQuoteIndex + 1) % catQuotes.length;
              setCatQuoteIndex(nextIndex);
            }}
            id="cat-observer-easter-egg"
            title="Click the nocturnal observer to inspect silent thoughts"
          >
            <div className="flex flex-col items-end gap-3">
              <AnimatePresence mode="wait">
                {catQuoteIndex !== -1 && (
                  <motion.div
                    key={catQuoteIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-surface-container border border-outline/15 p-3 rounded-lg max-w-[260px] text-xs font-mono text-primary shadow-xl"
                  >
                    {catQuotes[catQuoteIndex]}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Paw/Footprint SVG representing the feline observer */}
              <div className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
                <span className="text-[10px] font-mono opacity-60 tracking-wider">NOCTURNAL VISITOR</span>
                <svg className="w-16 h-16 fill-current animate-pulse" viewBox="0 0 24 24">
                  <path d="M12,14c-1.66,0-3,1.34-3,3s1.34,3,3,3s3-1.34,3-3S13.66,14,12,14z M7,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S8.1,10,7,10z M17,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S18.1,10,17,10z M12,4c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,4,12,4z" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Journal Section - elegant nocturnal list */}
        <section id="journal-section" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 relative">
          <div className="mb-16 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <div className="star-divider" />
              <span className="text-primary font-mono text-xs uppercase tracking-widest">Writings & Thoughts</span>
            </div>
            <h3 className="font-headline text-3xl font-semibold text-on-background" id="journal-title">
              Nocturnal Logs
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="journal-list">
            {JOURNAL_ENTRIES.map((entry, idx) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-surface/30 border border-outline/10 hover:border-primary/30 p-8 rounded-xl flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 group"
                id={`journal-card-${entry.id}`}
              >
                <div>
                  <div className="flex justify-between items-center text-xs font-mono text-on-surface-variant mb-6">
                    <span className="text-primary font-medium">{entry.category}</span>
                    <span>{entry.date}</span>
                  </div>
                  <h4 className="font-headline text-lg font-bold text-on-background mb-4 group-hover:text-primary transition-colors leading-snug">
                    {entry.title}
                  </h4>
                  <p className="font-sans text-sm text-on-surface-variant mb-6 leading-relaxed">
                    {entry.excerpt}
                  </p>
                </div>

                <div className="pt-6 border-t border-outline/5 flex justify-between items-center text-xs font-mono text-on-surface-variant">
                  <span>{entry.readTime}</span>
                  <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                    Read log <BookOpen className="w-3.5 h-3.5" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 text-center relative overflow-hidden bg-gradient-to-b from-transparent to-surface-container-lowest">
          
          <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex justify-center items-center">
            {/* Massive background orbital ring */}
            <div className="w-[800px] aspect-square rounded-full border-[10px] border-primary/20 animate-[spin_100s_linear_infinite]" />
          </div>

          <div className="relative z-10 px-6 max-w-2xl mx-auto flex flex-col items-center">
            <h2 className="font-headline text-3xl md:text-5xl font-bold text-on-background mb-6 leading-tight" id="cta-title">
              Join the Night Watch
            </h2>
            <p className="font-sans text-base md:text-lg text-on-surface-variant mb-10 leading-relaxed" id="cta-description">
              Sign up for my journal to receive quiet reflections on design, art, and the beauty of the dark. No noise, just cosmos.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 w-full justify-center items-stretch" id="cta-form">
              <input 
                className="bg-surface-container border border-outline/20 rounded-full px-6 py-4 focus:outline-none focus:border-primary/50 transition-colors text-on-surface w-full sm:w-96 font-sans text-sm placeholder:text-on-surface-variant/40" 
                placeholder="Your celestial address (email)" 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="cta-email-input"
              />
              <button 
                type="submit"
                disabled={subscribing}
                className="bg-primary text-on-primary font-mono text-xs font-bold tracking-widest px-8 py-4 rounded-full hover:bg-opacity-90 transition-all shadow-[0_0_20px_rgba(190,198,224,0.15)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                id="cta-submit-btn"
              >
                {subscribing ? (
                  <span>SENDING...</span>
                ) : (
                  <>
                    <span>SUBSCRIBE</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            {/* Newsletter confirmation notice / subscribers lists */}
            <AnimatePresence>
              {subscribed && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-6 flex items-center gap-2 text-primary font-mono text-xs bg-primary/10 border border-primary/20 px-4 py-2.5 rounded-full"
                  id="cta-success-message"
                >
                  <Check className="w-4 h-4 text-primary" />
                  <span>Welcome to the Watch. Your transmission is recorded.</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Live stats ticker to make app feel exceptionally alive */}
            <div className="mt-8 text-xs font-mono text-on-surface-variant/50" id="cta-live-ticker">
              Currently orbiting with <span className="text-primary font-bold">{subscriberCount}</span> night watchers.
            </div>

            {/* Subscribers preview panel if any exists */}
            {subscribersList.length > 0 && (
              <div className="mt-12 w-full max-w-md p-4 rounded-xl border border-outline/10 bg-surface/40 backdrop-blur-md text-left">
                <p className="text-[10px] font-mono text-primary uppercase tracking-wider mb-2">Newly Registered Observers</p>
                <div className="flex flex-wrap gap-1.5">
                  {subscribersList.map((sub, i) => (
                    <span key={i} className="text-[11px] font-mono text-on-surface-variant bg-surface-container-high/60 px-2.5 py-1 rounded-full">
                      {sub.length > 18 ? sub.substring(0, 15) + "..." : sub}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full relative overflow-hidden border-t border-outline/10 bg-surface/90 z-20">
        <div className="flex flex-col md:flex-row justify-between items-center py-16 px-6 md:px-12 max-w-7xl mx-auto gap-10">
          
          <div className="flex flex-col items-center md:items-start gap-3 text-center md:text-left">
            <h2 className="font-headline text-2xl text-primary tracking-tighter font-extrabold flex items-center gap-2">
              <Moon className="w-5 h-5 text-primary" />
              <span>Stargazer</span>
            </h2>
            <p className="font-mono text-[10px] text-on-surface-variant uppercase tracking-widest" id="footer-copyright">
              &copy; 2026 Stargazer. Observed from the quiet depths.
            </p>
          </div>

          {/* Social connections */}
          <div className="flex gap-10" id="footer-social-links">
            {[
              { label: "Instagram", icon: <Instagram className="w-4 h-4" />, href: "https://instagram.com" },
              { label: "LinkedIn", icon: <Linkedin className="w-4 h-4" />, href: "https://linkedin.com" },
              { label: "Dribbble", icon: <Dribbble className="w-4 h-4" />, href: "https://dribbble.com" },
              { label: "Email", icon: <Mail className="w-4 h-4" />, href: "mailto:stargazer@celestial.design" }
            ].map((social) => (
              <a 
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-on-surface-variant hover:text-primary transition-all duration-300 uppercase tracking-widest flex items-center gap-1.5 opacity-80 hover:opacity-100 group"
                id={`footer-link-${social.label.toLowerCase()}`}
              >
                {social.icon}
                <span className="hidden sm:inline">{social.label}</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

        </div>

        {/* Ornamental Star in Footer */}
        <div className="flex justify-center pb-8">
          <div className="star-divider opacity-45" />
        </div>
      </footer>

      {/* Case Study Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-card rounded-2xl border border-outline/20 p-6 md:p-10 z-10 flex flex-col gap-8 shadow-2xl"
              id="case-study-modal-container"
            >
              {/* Header inside modal */}
              <div className="flex justify-between items-center border-b border-outline/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="star-divider" />
                  <span className="font-mono text-xs text-primary uppercase tracking-widest">{selectedProject.category}</span>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high hover:text-primary transition-all cursor-pointer"
                  id="close-modal-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid content inside modal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="rounded-xl overflow-hidden border border-outline/10 aspect-[4/5]">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.altText} 
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col gap-6">
                  <h3 className="font-headline text-2xl md:text-3xl font-extrabold text-on-background">
                    {selectedProject.title}
                  </h3>
                  
                  {/* Metadata cards */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-outline/10 py-4 font-mono text-xs text-on-surface-variant">
                    <div>
                      <p className="text-primary uppercase tracking-wider text-[10px] mb-1">Client</p>
                      <p className="font-medium text-on-background">{selectedProject.client || "Nocturnal Agency"}</p>
                    </div>
                    <div>
                      <p className="text-primary uppercase tracking-wider text-[10px] mb-1">Year</p>
                      <p className="font-medium text-on-background">{selectedProject.year || "2024"}</p>
                    </div>
                  </div>

                  <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                    {selectedProject.fullStory || selectedProject.description}
                  </p>

                  {/* Tools used */}
                  {selectedProject.tools && (
                    <div>
                      <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Instruments & Tools</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tools.map((tool) => (
                          <span key={tool} className="text-xs font-mono text-on-background bg-surface-container px-3 py-1.5 rounded-full border border-outline/5">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {selectedProject.tags && (
                    <div>
                      <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">Classification Tags</p>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((tag) => (
                          <span key={tag} className="text-xs font-mono text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded-md border border-outline/5">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action button in Modal */}
              <div className="flex justify-end pt-4 border-t border-outline/10">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="bg-primary text-on-primary px-6 py-2 rounded-full font-mono text-xs tracking-widest uppercase hover:bg-opacity-90 active:scale-95 transition-all cursor-pointer"
                  id="modal-acknowledgement-btn"
                >
                  Dismiss Case File
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Connect Modal Overlay */}
      <AnimatePresence>
        {isConnectOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConnectOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg glass-card rounded-2xl border border-outline/20 p-8 md:p-10 z-10 flex flex-col gap-6 shadow-2xl"
              id="connect-modal-container"
            >
              <div className="flex justify-between items-center border-b border-outline/10 pb-4">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-primary animate-[spin_10s_linear_infinite]" />
                  <span className="font-mono text-sm text-primary uppercase tracking-widest">Connect with Stargazer</span>
                </div>
                <button 
                  onClick={() => setIsConnectOpen(false)}
                  className="p-1.5 rounded-full bg-surface-container hover:bg-surface-container-high hover:text-primary transition-all cursor-pointer"
                  id="close-connect-btn"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                Send a signal into the deep space. Whether it is a project query, collaboration idea, or simple nighttime feedback, your frequency is welcomed.
              </p>

              <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block font-mono text-[10px] text-primary uppercase tracking-widest mb-1.5">Your Name</label>
                  <input 
                    type="text" 
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="E.g., Kepler Copernicus"
                    className="w-full bg-surface-container border border-outline/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 text-on-surface transition-colors"
                  />
                </div>
                
                <div>
                  <label className="block font-mono text-[10px] text-primary uppercase tracking-widest mb-1.5">Celestial Mailbox (Email)</label>
                  <input 
                    type="email" 
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="E.g., voyager1@galaxy.org"
                    className="w-full bg-surface-container border border-outline/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 text-on-surface transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-primary uppercase tracking-widest mb-1.5">Your Transmission (Message)</label>
                  <textarea 
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Type your message into the ether..."
                    className="w-full bg-surface-container border border-outline/20 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 text-on-surface transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={contactSent}
                  className="mt-2 bg-primary text-on-primary font-mono text-xs font-bold tracking-widest py-3.5 rounded-lg hover:bg-opacity-90 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {contactSent ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>SIGNAL SENT SUCCESSFULLY</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>DISPATCH SIGNAL</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
