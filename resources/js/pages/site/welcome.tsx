import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import AttributeSection from './sections/AttributeSection';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import TeamSection from './sections/TeamSection';

export default function Welcome() {
    return (
        <>
            <Head title="Home" />
            <PageLayout>
                <main className="flex-grow">
                    <HeroSection />
                    <ServicesSection />
                    <AttributeSection />
                    <TeamSection />
                </main>
            </PageLayout>
        </>
    );
}
