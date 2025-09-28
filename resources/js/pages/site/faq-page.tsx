import { Head } from '@inertiajs/react';
import { useState } from 'react';
import PageLayout from '../../layouts/page-layout';
import { Page } from '../../types/page';
import PageBanner from './components/page-banner';

interface FaqPageProps {
    page: Page;
}

const FaqPage: React.FC<FaqPageProps> = ({ page }) => {
    const pageUrl = window.location.href;
    const imageUrl = '';
    const metaTitle = page?.meta_title || 'YourSite';
    const metaDescription = page?.meta_description || 'YourSite';
    const metaKeywords = page?.meta_keywords || 'YourSite';

    // Keep track of open question for each section
    const [openQuestions, setOpenQuestions] = useState<{ [sectionId: number]: number | null }>({});

    const toggleAccordion = (sectionId: number, index: number) => {
        setOpenQuestions((prev) => ({
            ...prev,
            [sectionId]: prev[sectionId] === index ? null : index,
        }));
    };

    const renderSectionContent = (sectionId: number, jsonItems: string) => {
        try {
            const items = jsonItems ? JSON.parse(jsonItems) : [];

            return (
                <div className="space-y-4">
                    {items.map((item: any, idx: number) => {
                        if (!item.question) return null;
                        const isOpen = openQuestions[sectionId] === idx;

                        return (
                            <div key={idx} className="rounded-md border bg-background shadow-sm">
                                <button
                                    className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold focus:outline-none"
                                    onClick={() => toggleAccordion(sectionId, idx)}
                                >
                                    <span>{item.question}</span>
                                    <span className="ml-2 text-lg">{isOpen ? '−' : '+'}</span>
                                </button>
                                {isOpen && <div className="px-4 py-3 text-gray-600">{item.answer}</div>}
                            </div>
                        );
                    })}
                </div>
            );
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return <p className="text-sm text-red-500">Invalid JSON content</p>;
        }
    };

    return (
        <>
            <Head title={page.title}>
                <meta name="title" content={metaTitle} />
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`${metaKeywords || ''}, articles, blog`} />
                <meta property="og:type" content="page" />
                <meta property="og:title" content={page?.title} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={pageUrl} />
            </Head>

            <PageLayout>
                <PageBanner title={page?.title} subtitle="We’ve got answers for you!" />

                <div className="mx-auto my-16 w-full space-y-14 p-6 md:w-6xl">
                    {page.sections.length > 0 ? (
                        page.sections
                            .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                            .map((section) => (
                                <div key={section.id} className="w-full space-y-6">
                                    {section.heading && (
                                        <div className="mb-6 text-center">
                                            <h2 className="mb-1 text-3xl font-semibold">{section.heading}</h2>
                                            {section.sub_heading && <h3 className="text-sm text-gray-500">{section.sub_heading}</h3>}
                                            <div className="mx-auto mt-2 h-1 w-16 bg-foreground"></div>
                                        </div>
                                    )}

                                    {section.json_array && renderSectionContent(section.id!, section.json_array)}
                                </div>
                            ))
                    ) : (
                        <p className="text-sm text-gray-500">No FAQ available.</p>
                    )}
                </div>
            </PageLayout>
        </>
    );
};

export default FaqPage;
