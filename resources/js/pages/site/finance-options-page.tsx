import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Page } from '../../types/page';
import AttributeSection from './sections/AttributeSection';

interface FinanceOptionsPageProps {
    page: Page;
}

const FinanceOptionsPage: React.FC<FinanceOptionsPageProps> = ({ page }) => {
    return (
        <>
            <Head title={page.title} />
            <PageLayout>
                {/* Hero */}
                <section className="mt-16 bg-secondary py-20 text-secondary-foreground">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">Finance Options</h1>
                        <p className="text-lg opacity-90 md:text-xl">
                            We’d love to hear from you—reach out for support, partnerships, or just to say hi!
                        </p>
                    </div>
                </section>
                <AttributeSection />
            </PageLayout>
        </>
    );
};

export default FinanceOptionsPage;
