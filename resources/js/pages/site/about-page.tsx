import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Page } from '../../types/page';
import ImageWrappedContentSection from './components/image-wrapped-content-section';
import PageBanner from './components/page-banner';
import RenderSectionContent from './components/render-section-content';
import SectionGallery from './components/section-gallery';
import SectionHeader from './components/section-header';

interface AboutPageProps {
    page: Page;
}

const AboutPage: React.FC<AboutPageProps> = ({ page }) => {
    const pageUrl = window.location.href;
    const imageUrl = '';
    const metaTitle = page?.meta_title || 'YourSite';
    const metaDescription = page?.meta_description || 'YourSite';
    const metaKeywords = page?.meta_keywords || 'YourSite';

    return (
        <>
            <Head title={page.title}>
                {/* Basic SEO */}
                <meta name="title" content={metaTitle} />
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`${metaKeywords || ''}, articles, blog`} />
                <meta name="author" content={'YourSite'} />

                {/* Open Graph (Facebook/LinkedIn) */}
                <meta property="og:type" content="page" />
                <meta property="og:title" content={page?.title} />
                <meta property="og:description" content={metaDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:site_name" content="YourSite" />

                {/* Twitter Cards */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={page?.title} />
                <meta name="twitter:description" content={metaDescription} />
                <meta name="twitter:image" content={imageUrl} />

                {/* Canonical URL */}
                <link rel="canonical" href={pageUrl} />
            </Head>
            <PageLayout>
                {/* Hero */}
                <PageBanner title={page?.title} />

                <div className="mx-auto my-16 w-full space-y-14 p-6 md:w-6xl">
                    {page.sections.length > 0 ? (
                        <div className="">
                            {page.sections
                                .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                                .map((section, index) => (
                                    <div key={section.id || index} className="mb-30 w-full space-y-10 lg:w-6xl">
                                        {/* Section Heading */}
                                        <SectionHeader heading={section?.heading} sub_heading={section?.sub_heading} />

                                        <ImageWrappedContentSection
                                            mediaUrl={section.media?.url}
                                            mimeType={section.media?.file_type}
                                            contentHtml={section.content || ''}
                                            shape="octagon-left"
                                        />

                                        <div className="py-6">{section.json_array && <RenderSectionContent jsonItems={section.json_array} />}</div>

                                        {/* Gallery */}
                                        {section?.gallery && section?.gallery.length > 0 && (
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
            </PageLayout>
        </>
    );
};

export default AboutPage;
