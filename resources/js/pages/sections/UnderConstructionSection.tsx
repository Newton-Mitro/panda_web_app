import { Wrench } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const UnderConstructionSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} className="py-20 bg-background">
      <div className={`max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
        <div className="mb-8">
          <Wrench className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-foreground mb-4">UNDER CONSTRUCTION</h2>
        </div>
      </div>
    </section>
  );
};

export default UnderConstructionSection;