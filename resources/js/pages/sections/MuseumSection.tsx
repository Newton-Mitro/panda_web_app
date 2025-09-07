import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MuseumSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    const museumItems = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
    }));

    return (
        <section ref={ref} id="museum" className="bg-bulwark-accent py-20">
            <div className={`mx-auto max-w-6xl px-6 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <div className="grid items-start gap-12 md:grid-cols-2">
                    <div>
                        <h2 className="mb-4 text-4xl font-bold text-foreground">Museum</h2>
                        <div className="mb-8 h-1 w-16 bg-foreground"></div>

                        <p className="mb-8 leading-relaxed text-muted-foreground">
                            The museum collects all the artefacts sent across the museum curators. We recognize published artists and literature as
                            their responsibility and fix the museum and art for everyone.
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm text-muted-foreground">Your Location</label>
                                <input
                                    type="text"
                                    placeholder="Hyderabad"
                                    className="w-full rounded border border-border bg-background px-4 py-2 text-foreground"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-5 gap-4">
                        {museumItems.map((item) => (
                            <div key={item.id} className="aspect-square overflow-hidden rounded-lg border border-border/20">
                                <img
                                    src="/storage/uploads/4.jpg"
                                    alt={`Museum ${item.name}`}
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MuseumSection;
