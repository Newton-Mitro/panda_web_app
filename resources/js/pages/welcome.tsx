import { Head } from '@inertiajs/react';
import AppLogoIcon from '../components/app-logo-icon';
import Navigation from './Navigation';
import AttributeSection from './sections/AttributeSection';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import TeamSection from './sections/TeamSection';

export default function Welcome() {
    const appName = import.meta.env.VITE_APP_NAME || 'MyApp'; // fallback

    // Define the services array

    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen bg-background">
                <Navigation />

                <main>
                    <HeroSection />
                    <ServicesSection />
                    <AttributeSection />
                    {/* <MuseumSection />
                    <WorkWithUsSection />
                    <BecomePartnerSection />  */}
                    <TeamSection />
                </main>

                <footer className="border-t border-border bg-background py-8">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="text-sm font-bold text-foreground">{appName}</div>
                                <span className="flex items-start rounded p-1">
                                    <AppLogoIcon className="h-4 w-4 text-background" />
                                </span>
                            </div>
                            <p className="text-xs text-muted-foreground">Copyright © 2024 Bulwark Foundation by Prakash Foundation</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
