import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, ArrowRight, HelpCircle, ChevronDown, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import emailjs from "@emailjs/browser";

const contactSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  company: z.string().optional(),
  currency: z.string().default("USD"),
  budget: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const currencies = [
  { code: "USD", symbol: "$" },
  { code: "INR", symbol: "₹" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "JPY", symbol: "¥" },
  { code: "AUD", symbol: "A$" },
  { code: "CAD", symbol: "C$" },
  { code: "SGD", symbol: "S$" },
  { code: "AED", symbol: "AED" },
];

const faqs = [
  {
    question: "Is there a free consultation?",
    answer: "Yes. We start every engagement with a free discovery call to understand your goals and recommend the right approach.",
  },
  {
    question: "How quickly can we get started?",
    answer: "Most projects kick off within 3-5 business days after we align on scope, timelines, and expectations.",
  },
  {
    question: "What industries do you work with?",
    answer: "We partner with startups and growing businesses across SaaS, e-commerce, fintech, healthcare, and more.",
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes. We provide flexible support and maintenance options after launch to keep your product running smoothly.",
  },
  {
    question: "What is your pricing model?",
    answer: "We offer both fixed-price project quotes and dedicated team monthly retainers depending on your project's needs.",
  },
  {
    question: "Can you help with UI/UX only?",
    answer: "Absolutely. We have a dedicated design team that can handle everything from user research to high-fidelity prototyping.",
  },
  {
    question: "Do you sign NDAs?",
    answer: "Yes, we prioritize client confidentiality and are happy to sign standard non-disclosure agreements before project discussions.",
  },
  {
    question: "Which technologies do you specialize in?",
    answer: "Our core stack includes React, Node.js, Python, and specialized cloud infrastructure on AWS and Google Cloud.",
  },
];

export default function Contact() {
  const [showAllFaqs, setShowAllFaqs] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      currency: "USD",
      phone: ""
    }
  });

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 4);

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    // const isSuccess = Math.random() > 0.1; // 90% success rate for mock
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_CONTACT_US_TEMPLATE_ID,
        {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          currency: data.currency,
          company: data.company,
          budget: data.budget,
          message: data.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      reset();
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
        className: "bg-white border-none shadow-[0_20px_50px_rgba(20,49,9,0.15)] p-6 rounded-2xl flex items-start gap-4",
        variant: "default",
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
    // if (isSuccess) {
    //   reset();
    //   toast({
    //     title: "Message Sent Successfully!",
    //     description: "We'll get back to you within 24 hours.",
    //     className: "bg-white border-none shadow-[0_20px_50px_rgba(20,49,9,0.15)] p-6 rounded-2xl flex items-start gap-4",
    //     variant: "default",
    //   });
    // } else {
    //   toast({
    //     title: "Submission Failed",
    //     description: "Something went wrong. Please try again later.",
    //     className: "bg-white border-none shadow-[0_20px_50px_rgba(220,38,38,0.15)] p-6 rounded-2xl flex items-start gap-4",
    //     variant: "destructive",
    //   });
    // }
  };

  return (
    <section id="contact" className="py-24 bg-white font-sans overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-32">
            
            {/* Left Side: Impactful Text & Info */}
            <div className="lg:col-span-5 space-y-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-5xl md:text-7xl font-bold font-display text-[#121212] tracking-tighter leading-[0.9]">
                  Let's make <br />
                  <span className="text-[#143109] italic">it happen.</span>
                </h2>
                <p className="text-xl text-[#212121]/60 leading-relaxed max-w-sm">
                  Whether you're starting from scratch or scaling up, our team is ready to engineer your success.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-1 gap-8"
              >
                {[
                  { icon: Mail, label: "Drop us a line", value: "cravionttech@gmail.com", href: "mailto:cravionttech@gmail.com" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    className="group flex items-center gap-5 p-4 rounded-2xl transition-all hover:bg-slate-50"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-[#143109] group-hover:bg-[#143109] group-hover:text-white transition-all duration-300">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                      <p className="text-lg font-bold text-[#121212]">{item.value}</p>
                    </div>
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Right Side: Modern Minimalist Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 w-full bg-[#FAFAFA] rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm"
            >
              <form className="space-y-10" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                  <div className="relative">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Full Name</label>
                    <Input 
                      {...register("fullName")}
                      placeholder="e.g. Alex Rivera" 
                      className={`h-12 bg-transparent border-0 border-b ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#143109] transition-all placeholder:text-gray-300 text-lg font-medium shadow-none`}
                      data-testid="input-name"
                    />
                    {errors.fullName && <span className="text-red-500 text-[10px] absolute -bottom-5 left-0">{errors.fullName.message}</span>}
                  </div>
                  <div className="relative">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Email Address</label>
                    <Input 
                      {...register("email")}
                      type="email"
                      placeholder="e.g. alex@company.com" 
                      className={`h-12 bg-transparent border-0 border-b ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#143109] transition-all placeholder:text-gray-300 text-lg font-medium shadow-none`}
                      data-testid="input-email"
                    />
                    {errors.email && <span className="text-red-500 text-[10px] absolute -bottom-5 left-0">{errors.email.message}</span>}
                  </div>
                  <div className="relative">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Phone Number</label>
                    <div className={`border-b ${errors.phone ? 'border-red-500' : 'border-gray-200'} pb-1`}>
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                          <PhoneInput
                            country={'in'}
                            value={field.value}
                            onChange={(value) => field.onChange(value)}
                            containerClass="!w-full"
                            inputClass="!w-full !h-12 !bg-transparent !border-none !rounded-none !px-0 !pl-[3rem] !text-base !font-medium focus:!ring-0 placeholder:!text-gray-300 !text-[#121212]"
                            buttonClass="!bg-transparent !border-none !rounded-none !px-0 hover:!bg-transparent"
                            dropdownClass="!shadow-xl !rounded-xl !border-gray-100 !mt-2 !overflow-y-auto !max-h-60 !bg-white !z-[50]"
                          />
                        )}
                      />
                    </div>
                    {errors.phone && <span className="text-red-500 text-[10px] absolute -bottom-5 left-0">{errors.phone.message}</span>}
                  </div>
                  <div className="relative">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Company (Optional)</label>
                    <Input 
                      {...register("company")}
                      placeholder="Your organization" 
                      className="h-12 bg-transparent border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#143109] transition-all placeholder:text-gray-300 text-lg font-medium shadow-none"
                      data-testid="input-company"
                    />
                  </div>
                  <div className="relative flex gap-4 md:col-span-2">
                    <div className="w-1/3">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Currency</label>
                      <Controller
                        name="currency"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="h-12 bg-transparent border-0 border-b border-gray-200 rounded-none px-0 focus:ring-0 focus:border-[#143109] text-base font-medium shadow-none">
                              <SelectValue placeholder="USD" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[200px] overflow-y-auto bg-white border-gray-100 shadow-xl rounded-xl">
                              {currencies.map((curr) => (
                                <SelectItem key={curr.code} value={curr.code} className="cursor-pointer hover:bg-slate-50 py-3">
                                  {curr.code} ({curr.symbol})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Budget Range</label>
                      <Input 
                        {...register("budget")}
                        placeholder="Estimated amount" 
                        className="h-12 bg-transparent border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#143109] transition-all placeholder:text-gray-300 text-lg font-medium shadow-none"
                        data-testid="input-budget"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative pt-4">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 block">How can we help?</label>
                  <Textarea 
                    {...register("message")}
                    placeholder="Tell us about your project goals and vision..." 
                    className={`min-h-[140px] bg-transparent border-0 border-b ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#143109] transition-all placeholder:text-gray-300 text-lg font-medium resize-none shadow-none`}
                    data-testid="textarea-message"
                  />
                  {errors.message && <span className="text-red-500 text-[10px] absolute -bottom-5 left-0">{errors.message.message}</span>}
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <Button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-[#143109] hover:bg-[#1a3d0b] text-white px-10 h-16 rounded-2xl text-lg font-bold shadow-xl shadow-[#143109]/20 transition-all hover:translate-y-[-2px] active:translate-y-[1px] flex items-center gap-3 group"
                    data-testid="button-submit"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* FAQ Section */}
          <div className="mt-24 border-t border-gray-100 pt-20">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#121212] tracking-tight">
              Frequently asked questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              {visibleFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-4 p-2"
                >
                  <div className="w-10 h-10 shrink-0 rounded-full bg-slate-50 text-[#143109] flex items-center justify-center mt-1 border border-slate-100">
                    <HelpCircle size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#121212] mb-2">{faq.question}</h3>
                    <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="flex justify-center mt-16">
              <Button
                variant="outline"
                onClick={() => setShowAllFaqs(!showAllFaqs)}
                className="rounded-full px-8 py-6 border-slate-200 text-[#143109] font-bold hover:bg-slate-50 transition-all flex items-center gap-2"
              >
                {showAllFaqs ? "Show Less" : "View All Questions"}
                <ChevronDown className={cn("transition-transform duration-300", showAllFaqs && "rotate-180")} size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
