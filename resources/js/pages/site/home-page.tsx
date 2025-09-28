import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import { Article } from '../../types/article';
import { Award } from '../../types/award';
import { Event } from '../../types/event';
import { HeroSlide } from '../../types/hero_slide';
import { Notice } from '../../types/notice';
import { Page } from '../../types/page';
import { Project } from '../../types/project';
import { Service } from '../../types/service';
import { Team } from '../../types/team';
import { Testimonial } from '../../types/testimonial';
import ImageWrappedContentSection from './components/image-wrapped-content-section';
import RenderSectionContent from './components/render-section-content';
import SectionGallery from './components/section-gallery';

interface HomePageProps {
    page: Page;
    heroSlides: HeroSlide[];
    services: Service[];
    teams: Team[];
    testimonials: Testimonial[];
    awards: Award[];
    notices: Notice[];
    events: Event[];
    articles: Article[];
    projects: Project[];
}

const HomePage: React.FC<HomePageProps> = ({ page, heroSlides, services, teams, testimonials, awards, notices, events, articles, projects }) => {
    const pageUrl = window.location.href;
    const imageUrl = '';
    const metaTitle = page?.meta_title || 'YourSite';
    const metaDescription = page?.meta_description || 'YourSite';
    const metaKeywords = page?.meta_keywords || 'YourSite';

    console.log('PAGE', page);
    console.log('ARTICLES', articles);
    console.log('PROJECTS', projects);
    console.log('SERVICES', services);
    console.log('TEAM', teams);
    console.log('TESTIMONIALS', testimonials);
    console.log('AWARDS', awards);
    console.log('NOTICES', notices);
    console.log('EVENTS', events);
    console.log('HERO SLIDES', heroSlides);

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
                <main className="flex-grow">
                    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
                        {/* Background Image */}
                        <div className="absolute inset-0">
                            <img
                                src={page?.sections[0].media?.url}
                                alt={`${page?.sections[0].heading} building`}
                                className="h-full w-full object-cover opacity-80"
                            />
                        </div>

                        {/* Overlay Gradient */}
                        <div className="to-bulwark-accent/30 absolute inset-0 bg-gradient-to-br from-background via-background/70"></div>

                        {/* Content */}
                        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
                            <div className="mb-8">
                                <h1 className="relative mb-2 inline-flex items-start text-4xl font-bold text-foreground md:text-8xl">
                                    {page?.sections[0].heading}
                                </h1>

                                <h2 className="text-2xl font-light tracking-wider text-muted-foreground md:text-3xl">
                                    {page?.sections[0].sub_heading}
                                </h2>
                            </div>

                            {/* Quote */}
                            <div className="mx-auto mb-12 max-w-2xl">
                                <blockquote className="text-lg leading-relaxed text-muted-foreground italic md:text-xl">
                                    {page?.sections[0].content}
                                </blockquote>
                                {/* <cite className="mt-4 block text-sm text-muted-foreground">— Rabindranath Tagore</cite> */}
                            </div>
                        </div>
                    </section>

                    <div className="mx-auto my-16 w-full space-y-14 p-6 md:w-6xl">
                        {page.sections.length > 0 ? (
                            <div className="">
                                {page.sections
                                    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
                                    .map(
                                        (section, index) =>
                                            index !== 0 && (
                                                <div key={section.id || index} className="mb-30 w-full space-y-10 lg:w-6xl">
                                                    {/* Section Heading */}
                                                    <div className="mb-6 flex flex-col items-center justify-center text-center">
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

                                                    <div className="py-6">
                                                        {section.json_array && <RenderSectionContent jsonItems={section.json_array} />}
                                                    </div>

                                                    {/* Gallery */}
                                                    {section?.gallery && (
                                                        <>
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
                                            ),
                                    )}
                            </div>
                        ) : (
                            <p className="text-sm text-gray-500">No sections available for this page.</p>
                        )}
                    </div>
                </main>
            </PageLayout>
        </>
    );
};

export default HomePage;
