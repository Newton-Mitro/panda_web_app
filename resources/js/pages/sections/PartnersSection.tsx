import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PartnersSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    const partners = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `Partner ${i + 1}`,
        role: 'Strategic Partner',
    }));

    return (
        <section ref={ref} id="partners" className="bg-bulwark-accent py-20">
            <div className={`mx-auto max-w-6xl px-6 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <h2 className="mb-4 text-4xl font-bold text-foreground">Our Partners</h2>
                <div className="mb-12 h-1 w-16 bg-foreground"></div>

                <div className="mb-12 grid grid-cols-5 gap-6 md:grid-cols-10">
                    {partners.map((partner) => (
                        <div key={partner.id} className="flex flex-col items-center">
                            <div className="h-16 w-16 overflow-hidden rounded-lg border border-border/20">
                                <img src="/storage/uploads/5.jpg" alt={`${partner.name} logo`} className="h-full w-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="max-w-3xl">
                    <p className="mb-6 leading-relaxed text-muted-foreground">
                        The Bulwark Support Network (BSN) is the key to creating truly effective partnerships with our stakeholders. It provides the
                        perfect opportunity for parties to contribute to truly impactful development and advancement in partnership with Foundation.
                    </p>
                    <p className="leading-relaxed text-muted-foreground">
                        We stand right by our Partners and send few monthly goals and work wise milestones.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PartnersSection;
