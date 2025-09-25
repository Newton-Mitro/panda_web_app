import { Head } from '@inertiajs/react';
import Gallery from '../../components/gallery';
import ServiceCardBorderIcon from '../../components/service-card-border-icon';
import PageLayout from '../../layouts/page-layout';
import { Page } from '../../types/page';
import ResponsiveImageSection from '../pages/responsive-image-section';

interface MissionVisionPageProps {
    page: Page;
}

const MissionVisionPage: React.FC<MissionVisionPageProps> = ({ page }) => {
    console.log(page);
    const pageUrl = window.location.href;
    const imageUrl = '';
    const metaTitle = page?.meta_title || 'YourSite';
    const metaDescription = page?.meta_description || 'YourSite';
    const metaKeywords = page?.meta_keywords || 'YourSite';

    const renderSectionContent = (jsonItems) => {
        try {
            const items = jsonItems ? JSON.parse(jsonItems) : [];
            console.log('ITEMS', items);
            return (
                <div className={`${items[0].image || items[0].icon ? 'grid grid-cols-1 gap-12 md:grid-cols-3' : 'flex flex-col gap-4'}`}>
                    {items.map((item: any, idx: number) =>
                        item.img_icon || item.question ? (
                            item.question ? (
                                <div className="">
                                    {item.question && <p className="font-semibold">{`${idx + 1}. ${item.question}`}</p>}
                                    {item.answer && <p className="text-[var(--muted-foreground)]">{item.answer}</p>}
                                </div>
                            ) : (
                                <div className="flex items-center gap-6">
                                    <img src={item.img_icon} alt={item.text || `img-${idx}`} className="h-8 w-8 flex-shrink-0 object-cover" />
                                    <div className="">
                                        {item.title && <p className="font-semibold">{item.title}</p>}
                                        {item.subtitle && <p className="text-[var(--muted-foreground)]">{item.subtitle.substring(0, 80)}</p>}
                                    </div>
                                </div>
                            )
                        ) : item.image ? (
                            <div className="flex items-center gap-6 bg-card px-4 py-2">
                                <img src={item.image} alt={item.text || `img-${idx}`} className="h-16 w-16 flex-shrink-0 object-cover" />
                                <div className="">
                                    {item.title && <p className="font-semibold">{item.title}</p>}
                                    {item.subtitle && <p className="text-[var(--muted-foreground)]">{item.subtitle.substring(0, 80)}</p>}
                                </div>
                            </div>
                        ) : (
                            <ServiceCardBorderIcon key={idx} icon={item.icon} title={item.title} text={item.subtitle.substring(0, 80)} />
                        ),
                    )}
                </div>
            );
        } catch {
            return <p className="text-sm text-[var(--destructive)]">Invalid JSON content</p>;
        }
    };

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
                <section className="mt-16 bg-secondary py-20 text-secondary-foreground">
                    <div className="mx-auto max-w-4xl px-4 text-center">
                        <h1 className="mb-4 text-4xl font-bold md:text-5xl">{page?.title}</h1>
                        <p className="text-lg opacity-90 md:text-xl">
                            We’d love to hear from you—reach out for support, partnerships, or just to say hi!
                        </p>
                    </div>
                </section>
                <div className="mx-auto my-16 w-full space-y-14 p-6 md:w-6xl">
                    {page.sections.length > 0 ? (
                        <div className="">
                            {page.sections
                                .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                                .map((section, index) => (
                                    <div key={section.id || index} className="mb-30 w-full space-y-10 lg:w-6xl">
                                        {/* Section Heading */}
                                        <div className="mb-6 flex flex-col items-center justify-center text-center">
                                            {section.heading && <h2 className="mb-1 text-3xl font-semibold">{section.heading}</h2>}
                                            {section.sub_heading && <h3 className="mb-2 text-sm text-gray-500">{section.sub_heading}</h3>}
                                            <div className="mx-auto mb-8 h-1 w-16 bg-foreground md:mx-0"></div>
                                        </div>

                                        <ResponsiveImageSection
                                            mediaUrl={section.media?.url}
                                            mimeType={section.media?.file_type}
                                            contentHtml={section.content || ''}
                                            shape="octagon-left"
                                        />

                                        <div className="py-6">{section.json_array && renderSectionContent(section.json_array)}</div>

                                        {/* Gallery */}
                                        {section?.gallery && section?.gallery.length > 0 && (
                                            <>
                                                {/* Section Heading */}
                                                {/* <div className="mb-6 flex flex-col items-center justify-center text-center">
                                                <h2 className="mb-1 text-2xl font-semibold">Gallery</h2>
                                                <h3 className="mb-2 text-sm text-gray-500">Browse the gallery</h3>
                                            </div> */}
                                                <Gallery gallery={JSON.parse(section.gallery)} />
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

export default MissionVisionPage;
