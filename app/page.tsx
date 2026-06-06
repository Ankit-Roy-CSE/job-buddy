import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/homepage/Hero";
import { Features } from "@/components/homepage/Features";
import { Confidence } from "@/components/homepage/Confidence";
import { Testimonial } from "@/components/homepage/Testimonial";
import { BottomCTA } from "@/components/homepage/BottomCTA";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Dashboard Preview Section */}
        <section className="w-full bg-surface-secondary pb-24 border-b border-border">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-[1000px]">
              <div className="overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-2xl">
                <Image
                  src="/images/dashboard-demo.png"
                  alt="JobBuddy Dashboard Preview"
                  width={1920}
                  height={1080}
                  className="rounded-xl border border-border-light object-cover w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <Features />

        {/* Confidence Section */}
        <Confidence />

        {/* Testimonials Section */}
        <Testimonial />

        {/* Bottom CTA Section */}
        <BottomCTA />
      </main>

      <Footer />
    </div>
  );
}