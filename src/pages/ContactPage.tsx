import { Helmet } from "react-helmet-async";
import Navbar from "@/components/sections/Navbar";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Craviont | Get a Free Web Development Consultation</title>

        <meta
          name="description"
          content="Contact Craviont to discuss your web application project. Get a free consultation with our engineering team."
        />

        <link rel="canonical" href="https://craviont.com/contact" />
      </Helmet>

      <h1>Contact Craviont</h1>
      <main className="min-h-screen w-full bg-[#E0E0E0] text-[#212121] font-sans selection:bg-[#143109]/20 selection:text-[#143109] overflow-x-hidden">
        <Navbar />
        <div className="pt-12 bg-white">
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  );
}
