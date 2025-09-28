import { Head } from '@inertiajs/react';

import React from 'react';
import IconCardItem from '../../components/service-card-border-icon';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Page } from '../../types/page';
import { PageSection } from '../../types/page_section';
import ImageCardItem from '../site/components/image-card-item';
import ImageIconItem from '../site/components/image-icon-item';
import ImageWrappedContentSection from '../site/components/image-wrapped-content-section';
import QuestionAnswerItem from '../site/components/question-answer-item';
import SectionGallery from '../site/components/section-gallery';

interface PageProps {
    page: Page;
    sections: PageSection[];
}

const Show: React.FC<PageProps> = ({ page, sections }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pages', href: '/admin/pages' },
        { title: page.title, href: '' },
    ];

    const renderSectionContent = (jsonItems) => {
        try {
            const items = jsonItems ? JSON.parse(jsonItems) : [];
            return (
                <div className={`${items[0].image || items[0].icon ? 'grid grid-cols-1 gap-12 md:grid-cols-3' : 'flex flex-col gap-4'}`}>
                    {items.map((item: any, idx: number) =>
                        item.img_icon || item.question ? (
                            item.question ? (
                                <QuestionAnswerItem key={idx} question={item.question} answer={item.answer} idx={idx} />
                            ) : (
                                <ImageIconItem key={idx} img_icon={item.img_icon} title={item.title} subtitle={item.subtitle} />
                            )
                        ) : item.image ? (
                            <ImageCardItem key={idx} image={item.image} title={item.title} subtitle={item.subtitle} text={item.text} />
                        ) : (
                            <IconCardItem key={idx} icon={item.icon} title={item.title} text={item.subtitle.substring(0, 80)} />
                        ),
                    )}
                </div>
            );
        } catch {
            return <p className="text-sm text-[var(--destructive)]">Invalid JSON content</p>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Show Page - ${page.title}`} />
            <div className="mx-auto h-[calc(100vh-100px)] space-y-14 overflow-auto p-6">
                {sections.length > 0 ? (
                    <div className="">
                        {sections
                            .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                            .map((section) => (
                                <div key={section.id} className="mb-30 w-full space-y-10 lg:w-6xl">
                                    {/* Section Heading */}
                                    <div className="mb-6 flex flex-col items-start justify-center text-center">
                                        {section.heading && <h2 className="mb-1 text-3xl font-semibold">{section.heading}</h2>}
                                        {section.sub_heading && <h3 className="mb-2 text-sm text-gray-500">{section.sub_heading}</h3>}
                                        <div className="mx-auto mb-8 h-1 w-16 bg-foreground md:mx-0"></div>
                                    </div>

                                    <ImageWrappedContentSection
                                        mediaUrl={section.media?.url}
                                        mimeType={section.media?.file_type}
                                        contentHtml={section.content || ''}
                                        shape="octagon-right"
                                    />

                                    <div className="py-6">{section.json_array && renderSectionContent(section.json_array)}</div>

                                    {/* Gallery */}
                                    {section.gallery && section.gallery.length > 0 && (
                                        <>
                                            {/* Section Heading */}
                                            {/* <div className="mb-6 flex flex-col items-center justify-center text-center">
                                                <h2 className="mb-1 text-2xl font-semibold">Gallery</h2>
                                                <h3 className="mb-2 text-sm text-gray-500">Browse the gallery</h3>
                                            </div> */}
                                            <SectionGallery gallery={JSON.parse(section.gallery)} />
                                        </>
                                    )}

                                    {/* Button */}
                                    {section.button_text && section.button_link && (
                                        <div className="my-6 text-center">
                                            <a
                                                href={section.button_link}
                                                className="inline-block rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                                            >
                                                {section.button_text}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No sections available for this page.</p>
                )}
            </div>
        </AppLayout>
    );
};

export default Show;
