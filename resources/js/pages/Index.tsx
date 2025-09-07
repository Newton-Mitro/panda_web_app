import Navigation from "@/components/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import PartnersSection from "@/components/sections/PartnersSection";
import AttributeSection from "@/components/sections/AttributeSection";
import MuseumSection from "@/components/sections/MuseumSection";
import UnderConstructionSection from "@/components/sections/UnderConstructionSection";
import WorkWithUsSection from "@/components/sections/WorkWithUsSection";
import BecomePartnerSection from "@/components/sections/BecomePartnerSection";
import TeamSection from "@/components/sections/TeamSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <HeroSection />
        <PartnersSection />
        <AttributeSection />
        <MuseumSection />
        <UnderConstructionSection />
        <WorkWithUsSection />
        <BecomePartnerSection />
        <TeamSection />
      </main>
      
      <footer className="bg-background border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="text-sm font-bold text-foreground">BULWARK</div>
              <div className="text-xs bg-foreground text-background px-1 py-0.5 rounded">TM</div>
            </div>
            <p className="text-xs text-muted-foreground">
              Copyright © 2024 Bulwark Foundation by Prakash Foundation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
