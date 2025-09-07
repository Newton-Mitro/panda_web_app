const HeroSection = () => {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
            <div className="absolute inset-0">
                <img src="/storage/uploads/1.jpg" alt="Bulwark Foundation building" className="h-full w-full object-cover opacity-20" />
            </div>
            <div className="to-bulwark-green-light/60 absolute inset-0 bg-gradient-to-br from-background via-background/80"></div>

            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <div className="mb-8">
                    <h1 className="mb-2 text-6xl font-bold text-foreground md:text-8xl">
                        BULWARK
                        <span className="ml-2 rounded bg-foreground px-1 py-0.5 align-top text-xs text-background">TM</span>
                    </h1>
                    <h2 className="text-2xl font-light tracking-wider text-foreground md:text-3xl">FOUNDATION</h2>
                </div>

                <div className="mx-auto mb-12 max-w-2xl">
                    <blockquote className="text-lg leading-relaxed text-muted-foreground italic md:text-xl">
                        "I slept and dreamt that life was joy. I awoke and saw that life was service. I acted and behold, service was joy."
                    </blockquote>
                    <cite className="mt-4 block text-sm text-muted-foreground">— Rabindranath Tagore</cite>
                </div>

                <div className="flex items-center justify-center space-x-8">
                    <div className="bg-bulwark-accent flex h-16 w-16 items-center justify-center rounded-full">
                        <div className="h-8 w-8 rounded-full bg-foreground"></div>
                    </div>
                    <div className="text-left">
                        <div className="text-sm text-muted-foreground">Since</div>
                        <div className="text-2xl font-bold text-foreground">1947</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
