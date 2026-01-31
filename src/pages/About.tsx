import { Helmet } from "react-helmet-async";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, Target, Zap, Shield, Code2, Users, Rocket } from "lucide-react";
import aboutCollaboration from "@/assets/about-collaboration.jpg";

import { Link } from "wouter";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Craviont | Engineering-Led Web Development Company</title>

        <meta
          name="description"
          content="Learn about Craviont, an engineering-led web application development company focused on building secure, scalable, and high-quality software solutions."
        />

        <link rel="canonical" href="https://craviont.com/about" />
      </Helmet>

      <h1 className="sr-only">About Craviont</h1>
      <main className="min-h-screen w-full bg-white text-[#212121] font-sans selection:bg-[#143109]/20 selection:text-[#143109] overflow-x-hidden">
        <Navbar />
        
        {/* Hero Section */}
        <section className="relative pt-40 pb-24 overflow-hidden bg-slate-50/50">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div {...fadeIn}>
                <div className="inline-flex items-center gap-2.5 py-1.5 px-4 rounded-full bg-[#143109]/5 border border-[#143109]/10 text-[#143109] text-[12px] font-bold tracking-widest uppercase mb-10 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#143109] animate-pulse" />
                  About Craviont
                </div>
                <h1 className="text-4xl md:text-8xl font-bold font-display mb-8 text-[#121212] tracking-tighter leading-[0.9]">
                  Technology built with <br />
                  <span className="text-[#143109] italic text-5xl md:text-8xl">ambition.</span>
                </h1>
                <p className="text-lg md:text-2xl text-[#212121]/60 leading-relaxed max-w-2xl mx-auto">
                  Craviont is a digital technology company built around one simple belief: technology should solve real problems and scale with ambition.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
  
        {/* Core Philosophy */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 items-center">
              <motion.div {...fadeIn} className="relative">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                  <img 
                    src={aboutCollaboration}
                    alt="Team collaboration" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[#143109] rounded-3xl p-8 text-white hidden md:flex flex-col justify-end shadow-xl">
                  <span className="text-4xl font-bold font-display mb-1">01</span>
                  <span className="text-sm font-bold uppercase tracking-widest opacity-80">Clarity & Precision</span>
                </div>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-8">
                <p className="text-lg text-[#212121]/70 leading-relaxed">
                  We work with businesses that want more than just software. They want systems that are reliable, secure, and built with long-term growth in mind. From early-stage ideas to mature products, we help turn vision into well-engineered digital solutions.
                </p>
                <p className="text-lg text-[#212121]/70 leading-relaxed">
                  At Craviont, we focus on clarity, precision, and thoughtful execution. Every project starts with understanding the business behind the idea, not just the requirements on paper. This allows us to build solutions that feel purposeful, practical, and future-ready.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
  
        {/* Mission Section */}
        <section className="py-24 bg-[#121212] text-white overflow-hidden relative">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <motion.div {...fadeIn}>
                <div className="w-16 h-16 bg-[#143109] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(20,49,9,0.5)]">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-8 text-white">Our Mission</h2>
                <p className="text-2xl md:text-3xl font-light text-white leading-snug italic">
                  "Our mission is to make complex technology approachable and useful. We bridge the gap between powerful engineering and real-world usability by creating software that works seamlessly, scales effortlessly, and feels intuitive to the people using it every day."
                </p>
              </motion.div>
            </div>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#143109]/10 to-transparent pointer-events-none" />
        </section>
  
        {/* How We Work */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-12 mb-16 items-end justify-between">
              <div className="max-w-2xl">
                <h2 className="text-4xl md:text-5xl font-bold font-display text-[#121212] mb-6 tracking-tight">How We Work</h2>
                <p className="text-xl text-[#212121]/60">We believe great results come from strong fundamentals and honest collaboration.</p>
              </div>
              <Zap className="w-12 h-12 text-[#143109] hidden md:block" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Architecture First",
                  description: "We design systems with clean architecture and scalability at the core.",
                  icon: LayersIcon
                },
                {
                  title: "Quality Engineering",
                  description: "We write code that prioritizes performance, security, and maintainability.",
                  icon: Shield
                },
                {
                  title: "Clear Communication",
                  description: "We communicate clearly and work as a true partner, not just a vendor.",
                  icon: Users
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  {...fadeIn} 
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#143109]/5 flex items-center justify-center text-[#143109] mb-8 group-hover:bg-[#143109] group-hover:text-white transition-all">
                    <item.icon size={28} />
                  </div>
                  <h4 className="text-2xl font-bold text-[#121212] mb-4">{item.title}</h4>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
  
        {/* What We Build */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div {...fadeIn}>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-[#121212] mb-8 tracking-tight">What We Build</h2>
                <p className="text-lg text-[#212121]/70 leading-relaxed mb-12">
                  We deliver end-to-end digital solutions across a wide range of needs. Every product we build is designed to grow with your business, not limit it.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    "Web & Mobile Applications",
                    "Business & Enterprise Software",
                    "E-commerce Platforms",
                    "Backend Systems & Integrations",
                    "Cyber Security Solutions"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="text-[#143109] w-5 h-5" />
                      <span className="font-bold text-[#121212]">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...fadeIn} transition={{ delay: 0.2 }}>
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl bg-[#143109] p-1">
                  <img 
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop" 
                    alt="Digital development" 
                    className="rounded-[2.8rem] w-full h-full object-cover grayscale opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <Code2 className="w-24 h-24 text-white opacity-20" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
  
        {/* Why Craviont */}
        <section className="py-24 bg-slate-50 border-t border-gray-200">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-4xl mx-auto text-center space-y-12">
              <motion.div {...fadeIn}>
                <h2 className="text-4xl md:text-6xl font-bold font-display text-[#121212] mb-8 tracking-tight">Why Craviont</h2>
                <p className="text-2xl text-[#212121]/70 leading-relaxed font-light">
                  Clients choose Craviont for our balance of technical depth and practical thinking. We care about how things work, how they scale, and how they support real business goals. We don’t chase trends. <span className="text-[#143109] font-bold">We build technology that lasts.</span>
                </p>
                <div className="pt-12">
                  <Link href="/contact">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#143109] text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl shadow-[#143109]/20 flex items-center gap-3 mx-auto group cursor-pointer"
                    >
                      Work with us
                      <Rocket size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
  
        <Footer />
      </main>
    </>
  );
}

function LayersIcon({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
      <path d="m2.6 12.08 8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9" />
      <path d="m2.6 16.08 8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9" />
    </svg>
  );
}

