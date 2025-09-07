import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Navigation from './Navigation';
import AttributeSection from './sections/AttributeSection';
import BecomePartnerSection from './sections/BecomePartnerSection';
import HeroSection from './sections/HeroSection';
import MuseumSection from './sections/MuseumSection';
import PartnersSection from './sections/PartnersSection';
import TeamSection from './sections/TeamSection';
import UnderConstructionSection from './sections/UnderConstructionSection';
import WorkWithUsSection from './sections/WorkWithUsSection';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Home" />
            <div className="min-h-screen bg-background">
                <Navigation />

                <main>
                    <HeroSection />
                    <PartnersSection />
                    <AttributeSection />
                    <MuseumSection />
                    <UnderConstructionSection />
                    <WorkWithUsSection />
                    <BecomePartnerSection />
                    <TeamSection />
                </main>

                <footer className="border-t border-border bg-background py-8">
                    <div className="mx-auto max-w-6xl px-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="text-sm font-bold text-foreground">BULWARK</div>
                                <div className="rounded bg-foreground px-1 py-0.5 text-xs text-background">TM</div>
                            </div>
                            <p className="text-xs text-muted-foreground">Copyright © 2024 Bulwark Foundation by Prakash Foundation</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
