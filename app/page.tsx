import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import ClientsSection from "@/components/clients-section"
import ServicesSection from "@/components/services-section"
import NosotrosSection from "@/components/nosotros-section"
import LayoutSimulator from "@/components/layout-simulator"
import FAQSection from "@/components/faq-section"
import ProcessSection from "@/components/process-section"
import DecisionTree from "@/components/decision-tree"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ClientsSection />
      <ServicesSection />
      <NosotrosSection />
      <LayoutSimulator />
      <ProcessSection />
      <FAQSection />
      <DecisionTree />
      <Footer />
    </main>
  )
}
