import { Head } from '@inertiajs/react';
import AppLogoIcon from '../../components/app-logo-icon';
import Navigation from './Navigation';
import AttributeSection from './sections/AttributeSection';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import TeamSection from './sections/TeamSection';

export default function Welcome() {
    const appName = import.meta.env.VITE_APP_NAME || 'SmartPanda';

    return (
        <>
            <Head title="Home" />

            {/* Outer wrapper: full viewport height */}
            <div className="flex min-h-screen flex-col bg-background">
                {/* Navigation */}
                <Navigation />

                {/* Main content grows to push footer down */}
                <main className="flex-grow">
                    <HeroSection />
                    <ServicesSection />
                    <AttributeSection />
                    <TeamSection />
                </main>

                {/* Footer always at bottom */}
                <footer className="mt-auto border-t border-border bg-background py-8">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
                            <div className="flex items-center space-x-2">
                                <div className="text-sm font-bold text-foreground">{appName}</div>
                                <span className="flex items-start rounded bg-foreground p-1">
                                    <AppLogoIcon className="h-4 w-4 text-background" />
                                </span>
                            </div>
                            <p className="text-center text-xs text-muted-foreground md:text-right">
                                Copyright © 2024 Bulwark Foundation by Prakash Foundation
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
