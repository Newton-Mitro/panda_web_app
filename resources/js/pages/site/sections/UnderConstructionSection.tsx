import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const UnderConstructionSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    return (
        <section ref={ref} className="bg-background py-20">
            <div className={`mx-auto max-w-4xl px-6 text-center transition-all duration-700 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
                <div className="mb-8">
                    <i className="fa-solid fa-screwdriver-wrench mx-auto mb-6 text-8xl text-muted-foreground"></i>
                    <h2 className="mb-4 text-4xl font-bold text-foreground">UNDER CONSTRUCTION</h2>
                </div>
            </div>
        </section>
    );
};

export default UnderConstructionSection;
