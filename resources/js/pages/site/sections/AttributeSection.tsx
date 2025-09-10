import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AttributeSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section ref={ref} id="attribute" className="bg-background py-16 md:py-20">
            <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                <div className="grid items-start gap-8 sm:gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-12">
                    {/* Left Content */}
                    <div className="text-center md:text-left">
                        <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl md:text-left">Attribute</h2>
                        <div className="mx-auto mb-8 h-1 w-16 bg-foreground md:mx-0"></div>
                        <p className="mb-4 leading-relaxed text-muted-foreground sm:mb-6">Bulwark foundation introduces Attributes.</p>
                        <p className="mb-4 leading-relaxed text-muted-foreground sm:mb-6">
                            Grow through Attributes to the foundation to find your account. Bulwark foundation welcomes you consider your image and
                            news virtual community.
                        </p>
                        <p className="mb-6 leading-relaxed text-muted-foreground sm:mb-8">Join attribute and express your support how.</p>

                        <div className="flex flex-col items-center justify-center space-y-2 text-sm sm:flex-row sm:items-start sm:justify-start sm:space-y-0 sm:space-x-2">
                            <span className="text-muted-foreground">Visit attributes</span>
                            <span className="font-bold text-foreground">5,843</span>
                            <span className="text-muted-foreground">Published now</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="mx-auto my-auto hidden h-32 w-[1px] bg-border md:block"></div>

                    {/* Right Content */}
                    <div className="flex justify-center md:justify-end">
                        <div className="bg-bulwark-accent border-bulwark-green-light flex h-full w-full flex-col items-center justify-center rounded-lg border-2 border-dashed md:h-80 md:w-80">
                            <img src="/storage/uploads/2.jpg" alt="attribute" className="h-full w-full rounded-2xl object-cover p-2" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AttributeSection;
