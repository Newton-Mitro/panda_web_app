import { Head } from '@inertiajs/react';

import React from 'react';
import Gallery from '../../components/gallery';
import MediaPreview from '../../components/media-preview';
import ServiceCardLeftIcon from '../../components/service-card-left-icon';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Page } from '../../types/page';
import { PageSection } from '../../types/page_section';

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

    const renderSectionContent = (section: PageSection) => {
        try {
            const items = section.json_array ? JSON.parse(section.json_array) : [];
            return (
                <div
                    className={`mx-auto items-start gap-4 md:max-w-[64rem] ${items[0].question ? 'flex flex-col gap-4' : 'grid grid-cols-2 gap-4 md:grid-cols-3'}`}
                >
                    {items.map((item: any, idx: number) => (
                        //  // <ServiceCardLeftIcon key={idx} icon={item.icon} title={item.title} text={item.subtitle.substring(0, 80)} />
                        // // <ServiceCardIcon key={idx} icon={item.icon} title={item.title} text={item.subtitle.substring(0, 80)} />
                        // <ServiceCardBorderIcon key={idx} icon={item.icon} title={item.title} text={item.subtitle.substring(0, 80)} />

                        <>
                            {item.icon && <ServiceCardLeftIcon key={idx} icon={item.icon} title={item.title} text={item.subtitle.substring(0, 80)} />}

                            {item.image && (
                                <div className="flex flex-col items-center gap-3 md:items-start">
                                    <img
                                        src={item.image}
                                        alt={item.text || `img-${idx}`}
                                        className="h-20 w-20 flex-shrink-0 rounded-full border border-[var(--border)] object-cover"
                                    />
                                    <div className="">
                                        {item.title && <p className="font-semibold">{item.title}</p>}
                                        {item.subtitle && <p className="text-[var(--muted-foreground)]">{item.subtitle.substring(0, 80)}</p>}
                                    </div>
                                </div>
                            )}

                            {item.question && item.answer && (
                                <div className="">
                                    {item.question && <p className="font-semibold">{`${idx + 1}. ${item.question}`}</p>}
                                    {item.answer && <p className="text-[var(--muted-foreground)]">{`Answer: ${item.answer}`}</p>}
                                </div>
                            )}
                        </>
                    ))}
                </div>
            );
        } catch {
            return <p className="text-sm text-[var(--destructive)]">Invalid JSON content</p>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Show Page - ${page.title}`} />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                {/* <HeadingSmall title={page.title} description={page.meta_description || ''} /> */}

                {sections.length > 0 ? (
                    <div className="">
                        {sections
                            .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                            .map((section, index) => (
                                <div key={section.id} className="mb-30 w-full space-y-10 lg:w-6xl">
                                    {/* Section Heading */}
                                    <div className="mb-6 flex flex-col items-center justify-center text-center">
                                        {section.heading && <h2 className="mb-1 text-2xl font-semibold">{section.heading}</h2>}
                                        {section.sub_heading && <h3 className="mb-2 text-sm text-gray-500">{section.sub_heading}</h3>}
                                        <div className="mx-auto mb-8 h-1 w-16 bg-foreground md:mx-0"></div>
                                    </div>

                                    {/* Media + Content */}
                                    <div className={`flex flex-col items-center gap-4 md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                                        {section.media && (
                                            <div className="w-full flex-shrink-0 md:w-1/3">
                                                <MediaPreview media={section.media} />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <div
                                                dangerouslySetInnerHTML={{ __html: section.content || '' }}
                                                className="prose prose-sm [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                                            />
                                        </div>
                                    </div>
                                    <div className="py-6">{section.json_array && renderSectionContent(section)}</div>

                                    {/* Gallery */}
                                    {section.gallery && section.gallery.length > 0 && (
                                        <>
                                            {/* Section Heading */}
                                            {/* <div className="mb-6 flex flex-col items-center justify-center text-center">
                                                <h2 className="mb-1 text-2xl font-semibold">Gallery</h2>
                                                <h3 className="mb-2 text-sm text-gray-500">Browse the gallery</h3>
                                            </div> */}
                                            <Gallery gallery={section.gallery} />
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
