import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import AttributeSection from './sections/AttributeSection';

export default function About() {
    return (
        <>
            <Head title="Home" />
            <PageLayout>
                <main className="m-16">
                    <div className="m-16 mx-auto max-w-6xl">
                        <AttributeSection />
                    </div>
                </main>
            </PageLayout>
        </>
    );
}
