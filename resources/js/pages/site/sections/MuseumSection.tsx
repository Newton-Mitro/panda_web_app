import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const MuseumSection = () => {
    const { ref, isVisible } = useScrollAnimation();
    const museumItems = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Item ${i + 1}`,
    }));

    return (
        <section ref={ref} id="museum" className="bg-bulwark-accent py-20">
            <div className={`mx-auto max-w-6xl px-6 transition-all duration-700 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl md:text-left">Museum</h2>
                <div className="mx-auto mb-12 h-1 w-16 bg-foreground md:mx-0"></div>
                <div className="grid items-start gap-12 md:grid-cols-2">
                    {/* Left Content */}
                    <div>
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

                    {/* Right Content */}
                    <div className="relative">
                        <div className="scrollbar-hide grid h-72 grid-cols-5 gap-x-4 gap-y-4 overflow-auto [mask-image:linear-gradient(to_bottom,black_70%,transparent)] [mask-size:100%_100%] [mask-repeat:no-repeat] p-6">
                            {museumItems.map((item) => (
                                <div key={item.id} className="aspect-square size-12 overflow-hidden rounded-full border border-border/20 md:size-20">
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
            </div>
        </section>
    );
};

export default MuseumSection;
