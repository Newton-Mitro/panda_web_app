import AppLogoIcon from '../../../components/app-logo-icon';

const HeroSection = () => {
    const appName = import.meta.env.VITE_APP_NAME || 'SmartPanda'; // fallback

    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
            {/* Background Image */}
            <div className="absolute inset-0">
                <img src="/storage/uploads/3.jpg" alt={`${appName} building`} className="h-full w-full object-cover opacity-80" />
            </div>

            {/* Overlay Gradient */}
            <div className="to-bulwark-accent/30 absolute inset-0 bg-gradient-to-br from-background via-background/70"></div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                <div className="mb-8">
                    <h1 className="relative mb-2 inline-flex items-start text-4xl font-bold text-foreground md:text-8xl">
                        {appName}
                        <span className="ml-2 flex items-start rounded bg-foreground p-1">
                            <AppLogoIcon className="size-6 text-background md:size-8" />
                        </span>
                    </h1>

                    <h2 className="text-2xl font-light tracking-wider text-muted-foreground md:text-3xl">FOUNDATION</h2>
                </div>

                {/* Quote */}
                <div className="mx-auto mb-12 max-w-2xl">
                    <blockquote className="text-lg leading-relaxed text-muted-foreground italic md:text-xl">
                        "I slept and dreamt that life was joy. I awoke and saw that life was service. I acted and behold, service was joy."
                    </blockquote>
                    <cite className="mt-4 block text-sm text-muted-foreground">— Rabindranath Tagore</cite>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
