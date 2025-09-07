import { Upload, Image, Download } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const AttributeSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} id="attribute" className="py-20 bg-background">
      <div className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-4">Attribute</h2>
            <div className="w-16 h-1 bg-foreground mb-8"></div>
            
            <p className="text-muted-foreground leading-relaxed mb-6">
              Bulwark foundation introduces Attributes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Grow through Attributes to the foundation to find your account. Bulwark foundation welcomes you consider your image and news virtual community.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Join attribute and express your support how.
            </p>

            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Visit attributes</span>
              <span className="text-foreground font-bold">5,843</span>
              <span className="text-muted-foreground">Published now</span>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-80 h-64 bg-bulwark-accent rounded-lg border-2 border-dashed border-bulwark-green-light flex flex-col items-center justify-center">
              <Upload className="w-12 h-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center mb-2">
                Drag and drop your files here
              </p>
              <p className="text-sm text-muted-foreground">or click to browse</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttributeSection;