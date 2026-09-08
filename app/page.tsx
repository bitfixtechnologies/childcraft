import Banner from "@/components/Banner";
import Header from "@/components/Header";
import AboutSection from "@/components/AboutSection";
import Roadmap from "@/components/Roadmap";
import BookOutline from "@/components/BookOutline";
import NewArrivals from "@/components/NewArrivals";
import MembersSection from "@/components/MembersSection";
import GallerySection from "@/components/GallerySection";
import OfferBanner from "@/components/OfferBanner";
import ContactCTA from "@/components/ContactCTA";

export default function Home() {
  return (
    <main>
      <Banner />
      <AboutSection />
      <Roadmap />
      <BookOutline />
      <NewArrivals />
      <MembersSection />
      <GallerySection />
      <OfferBanner />
      <ContactCTA />
    </main>
  );
}