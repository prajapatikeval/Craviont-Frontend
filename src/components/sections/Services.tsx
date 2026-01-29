import { motion, AnimatePresence } from "framer-motion";
import { 
  Layout, Code2, Server, Layers, ArrowRight, X, Phone, Mail, User, FileText,
  Monitor, Smartphone, ShoppingCart, Globe, Shield, Search, Lock, Zap,
  Settings, RefreshCcw, Database, CheckCircle2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid contact number is required"),
  requirement: z.string().min(1, "Requirement is required"),
});
import emailjs from "@emailjs/browser";

type FormValues = z.infer<typeof formSchema>;

const serviceCategories = [
  {
    title: "UI / UX & Frontend Engineering",
    description:
      "We design and build clean, fast, and user-friendly interfaces that are easy to use and easy to maintain.",
    icon: Layout,
    subServices: [
      { name: "UI / UX Design (Web & App)", icon: Layout },
      { name: "Design Systems & Component Libraries", icon: Layers },
      { name: "Frontend Development (React, Next.js, Vue, etc.)", icon: Code2 },
      { name: "Responsive & Mobile-first Design", icon: Smartphone },
      { name: "Performance Optimization", icon: Zap },
      { name: "Accessibility & Usability Improvements", icon: CheckCircle2 }
    ],
  },
  {
    title: "Backend & API Development",
    description:
      "We build reliable backend systems and APIs that power secure, scalable digital products.",
    icon: Server,
    subServices: [
      { name: "Backend Development (Node.js, Django, FastAPI, etc.)", icon: Server },
      { name: "REST & GraphQL API Development", icon: Globe },
      { name: "Database Design & Optimization", icon: Database },
      { name: "Authentication & Authorization", icon: Lock },
      { name: "Third-party API Integrations", icon: Settings },
      { name: "System Architecture & Scalability Planning", icon: Layers }
    ],
  },
  {
    title: "Full-Stack Development",
    description:
      "From idea to production, we handle the entire development lifecycle with clean architecture and long-term reliability.",
    icon: Layers,
    subServices: [
      { name: "End-to-End Application Development", icon: Layers },
      { name: "Web Application Development", icon: Monitor },
      { name: "Mobile-ready Web Apps", icon: Smartphone },
      { name: "SaaS Product Development", icon: Globe },
      { name: "MVP Development", icon: Zap },
      { name: "Legacy System Modernization", icon: RefreshCcw }
    ],
  },
  {
    title: "Platform, Integration & Support",
    description:
      "We help teams integrate, improve, and maintain their systems so they continue working as the business grows.",
    icon: Settings,
    subServices: [
      { name: "API & System Integrations", icon: Globe },
      { name: "Application Maintenance & Support", icon: RefreshCcw },
      { name: "Performance & Code Audits", icon: Search },
      { name: "Deployment & Environment Setup", icon: Monitor },
      { name: "Monitoring & Stability Improvements", icon: Shield },
      { name: "Technical Consulting & Code Reviews", icon: FileText }
    ],
  },
  {
    title: "Cyber Security Services",
    description:
      "We identify risks, harden your systems, and help you ship with confidence using practical security testing and remediation support.",
    icon: Shield,
    subServices: [
      { name: "Web app security testing", icon: Monitor },
      { name: "Mobile/iOS security testing", icon: Smartphone },
      { name: "Vulnerability assessment", icon: Search },
      { name: "Penetration testing", icon: Lock },
      { name: "Network security", icon: Globe }
    ],
  },
];

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      requirement: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log("Service Request:", { ...data, service: selectedService });
    setIsModalOpen(false);
    form.reset();
    setPhoneValue("");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_SERVICE_REQUEST_TEMPLATE_ID,
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          requirement: data.requirement
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast({
        title: "Request Submitted Successfully",
        description: "We'll get back to you shortly.",
        variant: "default",
        className: "bg-white border-none shadow-[0_20px_50px_rgba(20,49,9,0.15)] p-6 rounded-2xl flex items-start gap-4"
      });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again later.",
        className: "bg-white border-none shadow-[0_20px_50px_rgba(220,38,38,0.15)] p-6 rounded-2xl flex items-start gap-4",
        variant: "destructive",
      });
    }
    // toast({
    //   title: "Request Submitted Successfully",
    //   description: "We'll get back to you shortly.",
    //   variant: "default",
    //   className: "bg-white border-none shadow-[0_20px_50px_rgba(20,49,9,0.15)] p-6 rounded-2xl flex items-start gap-4"
    // });
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("service-modal-open");
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.classList.remove("service-modal-open");
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.classList.remove("service-modal-open");
    };
  }, [isModalOpen]);

  return (
    <section id="services" className="py-24 px-4 bg-white relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="inline-flex items-center gap-2.5 py-1.5 px-4 rounded-full bg-[#143109]/5 border border-[#143109]/10 text-[#143109] text-[12px] font-bold tracking-widest uppercase mb-10 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#143109] animate-pulse" />
            Our Expertise
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-6 text-[#121212] tracking-tighter">
            Services built for <span className="text-[#143109] italic">modern</span> businesses.
          </h2>
        </div>

        <div className="space-y-16">
          {serviceCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={cn(
                "flex flex-col gap-8 lg:gap-16 items-center",
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              )}
            >
              {/* Category Info */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[#143109]/5 flex items-center justify-center text-[#143109] mb-4">
                  <category.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-[#121212] tracking-tight">
                  {category.title}
                </h3>
                <p className="text-[#212121]/60 text-lg leading-relaxed max-w-xl">
                  {category.description}
                </p>
                <Button 
                  onClick={() => {
                    setSelectedService(category.title);
                    setIsModalOpen(true);
                  }}
                  className="bg-[#143109] hover:bg-[#143109]/90 text-white rounded-full px-8 h-12 text-sm font-bold group/btn"
                >
                  Enquire Now <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>

              {/* Sub-services Grid */}
              <div className="w-full lg:w-1/2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.subServices.map((sub, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center gap-4 p-5 rounded-2xl bg-gray-50/50 border border-[#121212]/5 hover:border-[#143109]/20 hover:bg-white transition-all shadow-sm hover:shadow-md cursor-pointer group"
                      onClick={() => {
                        setSelectedService(`${category.title}: ${sub.name}`);
                        setIsModalOpen(true);
                      }}
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#143109]/5 text-[#143109] group-hover:bg-[#143109] group-hover:text-white transition-colors">
                        <sub.icon size={18} strokeWidth={2} />
                      </div>
                      <span className="text-sm font-semibold text-[#212121]">{sub.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>


      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[1.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] z-[105]"
            >
              {/* <div className="bg-[#143109] backdrop-blur-md p-10 md:w-1/3 flex flex-col justify-between text-white relative overflow-hidden mb-8 md:mb-0"> */}
              <div className="bg-[#143109] backdrop-blur-md p-10 md:w-1/3 flex flex-col justify-between text-white relative overflow-hidden md:mb-0">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-dotted-grid mix-blend-overlay"></div>
                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-3 text-white">Request Service</h3>
                  <p className="text-white/70 text-base mb-8">Let's build something amazing together.</p>
                  {/* <div className="inline-block px-4 py-2 bg-white/10 rounded-lg text-sm font-medium border border-white/20">
                    {selectedService}
                  </div> */}
                </div>
                <div className="hidden md:block relative z-10">
                  <div className="flex items-center gap-4 mb-4 group cursor-default">
                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110">
                      <ArrowRight className="text-white w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-white/90">Get started today</span>
                  </div>
                  <p className="text-xs text-white/50">Fill out the details and we'll contact you within 24 hours.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 md:hidden text-white/70 hover:text-white z-20"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 md:w-2/3 overflow-y-auto bg-white relative">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors hidden md:block cursor-pointer z-[110] hover:bg-gray-100 p-2 rounded-full"
                >
                  <X size={24} />
                </button>

                <div>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-wide font-bold text-[#143109]">Full Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3.5 text-[#143109] w-4 h-4 z-10" />
                                <Input placeholder="John Doe" {...field} className="pl-10 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#143109] focus:ring-1 focus:ring-[#143109] text-[#121212] placeholder:text-gray-400 transition-all h-12 text-base shadow-sm hover:border-[#143109]/30" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wide font-bold text-[#143109]">Email</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Mail className="absolute left-3 top-3.5 text-[#143109] w-4 h-4 z-10" />
                                  <Input placeholder="john@example.com" {...field} className="pl-10 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#143109] focus:ring-1 focus:ring-[#143109] text-[#121212] placeholder:text-gray-400 transition-all h-12 text-base shadow-sm hover:border-[#143109]/30" />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-xs uppercase tracking-wide font-bold text-[#143109]">Phone</FormLabel>
                              <FormControl>
                                <div className="phone-input-container">
                                  <PhoneInput
                                    country={'in'}
                                    value={phoneValue}
                                    onChange={(value) => {
                                      setPhoneValue(value);
                                      form.setValue('phone', value);
                                    }}
                                    containerClass="!w-full !rounded-xl"
                                    inputClass="!w-full !h-12 !rounded-xl !bg-gray-50 !border !border-gray-200 !shadow-sm focus:!border-[#143109] focus:!ring-1 focus:!ring-[#143109] !transition-all !text-base !pl-[3.5rem] hover:!border-[#143109]/30 !text-[#121212]"
                                    buttonClass="!bg-transparent !border-none !rounded-l-xl !px-1 hover:!bg-gray-100"
                                    dropdownClass="!shadow-xl !rounded-xl !border-gray-100 !mt-2 !overflow-y-auto !max-h-60 !bg-white !z-[9999]"
                                    searchClass="!p-2 !border-b !border-gray-100"
                                    enableSearch={false}
                                  />
                                  <input type="hidden" {...field} value={phoneValue} />
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="requirement"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-xs uppercase tracking-wide font-bold text-[#143109]">Requirement Details</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <FileText className="absolute left-3 top-3.5 text-[#143109] w-4 h-4 z-10" />
                                <Textarea 
                                  placeholder="Describe your project needs..." 
                                  className="pl-10 rounded-xl bg-gray-50 border-gray-200 focus:bg-white focus:border-[#143109] focus:ring-1 focus:ring-[#143109] text-[#121212] placeholder:text-gray-400 min-h-[120px] resize-none pt-3 transition-all text-base shadow-sm hover:border-[#143109]/30" 
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full h-12 bg-[#143109] hover:bg-[#143109]/90 text-white rounded-xl text-base font-bold shadow-lg shadow-[#143109]/20 transition-all duration-300 mt-2">
                        Submit Request
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
