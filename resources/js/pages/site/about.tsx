import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import AttributeSection from './sections/AttributeSection';

export default function About() {
    return (
        <>
            <Head title="About Us" />
            <PageLayout>
                {/* Hero */}
                <section className="mt-16 bg-gradient-to-r from-primary to-purple-600 py-20 text-white">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">About Us</h1>
                        <p className="text-lg opacity-90 md:text-xl">
                            We’d love to hear from you—reach out for support, partnerships, or just to say hi!
                        </p>
                    </div>
                </section>
                <AttributeSection />
            </PageLayout>
        </>
    );
}
