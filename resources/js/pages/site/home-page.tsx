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
import HeroSection from './sections/HeroSection';

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
                    <HeroSection
                        heroImage={page?.sections[0].media?.url}
                        title={page?.sections[0].heading}
                        subtitle={page?.sections[0].sub_heading}
                        quote={page?.sections[0].content}
                    />
                    <section id="attribute" className="pt-32 pb-32">
                        <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6`}>
                            <div className="mt-12 flex flex-col md:gap-36">
                                {services.map((service, index) => (
                                    <div
                                        key={service.id ?? index}
                                        className="group flex cursor-pointer flex-col items-center md:relative md:flex-row"
                                    >
                                        {index % 2 === 0 ? (
                                            <div
                                                className={`group clear-both flex w-full ${index % 2 !== 0 ? 'flex-col-reverse' : 'flex-col'} items-center group-hover:cursor-pointer md:relative md:flex-row`}
                                            >
                                                <img
                                                    src={
                                                        service.media.url ??
                                                        'https://t3.ftcdn.net/jpg/01/06/12/68/360_F_106126874_6Yl8PyFmYgoOAx7DYoH6zs5a3MoFvQHr.jpg'
                                                    }
                                                    alt="Custom Shape"
                                                    style={{
                                                        clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                                                    }}
                                                    className={`borderobject-cover z-10 mt-6 mb-6 h-72 w-72 border-6 bg-card shadow-lg transition-transform duration-300 group-hover:scale-105 md:absolute md:h-96 md:w-96`}
                                                    // border-4 for thickness, border-blue-500 for color, adjust as needed
                                                />
                                                <div className="flex min-h-62 w-full flex-col justify-center rounded-2xl border-1 border-border bg-card p-6 md:ml-80 md:pl-20">
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: service.description ?? '' }}
                                                        className="prose prose-sm text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className={`group clear-both flex w-full ${index % 2 !== 0 ? 'flex-col-reverse' : 'flex-col'} items-center group-hover:cursor-pointer md:relative md:flex-row`}
                                            >
                                                <div className="flex min-h-62 w-full flex-col justify-center rounded-2xl border-1 border-border bg-card p-6 md:mr-80 md:pr-20">
                                                    <div
                                                        dangerouslySetInnerHTML={{ __html: service.description ?? '' }}
                                                        className="prose prose-sm text-muted-foreground [&_h1,h2,h3,h4,h5,h6]:text-foreground [&_table]:border [&_table]:border-gray-500 [&_td]:border [&_td]:border-gray-500 [&_th]:border [&_th]:border-gray-500"
                                                    />
                                                </div>
                                                <img
                                                    src={service.media.url}
                                                    alt="Custom Shape"
                                                    style={{
                                                        clipPath: 'polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)',
                                                    }}
                                                    className={`borderobject-cover right-0 z-10 mt-6 mb-6 h-72 w-72 border-6 bg-card shadow-lg transition-transform duration-300 group-hover:scale-105 md:absolute md:h-96 md:w-96`}
                                                    // border-4 for thickness, border-blue-500 for color, adjust as needed
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <section id="team" className="bg-bulwark-accent py-16 md:py-20">
                        <div className={`mx-auto max-w-6xl px-4 transition-all duration-700 sm:px-6 md:px-6`}>
                            <h2 className="mb-4 text-center text-3xl font-bold text-foreground sm:text-4xl md:text-left">Our Team</h2>
                            <div className="mx-auto mb-12 h-1 w-16 bg-foreground md:mx-0"></div>

                            {/* Team Members */}
                            <div className="mb-12">
                                <div className="flex flex-col items-center gap-10 pb-2 md:flex-row">
                                    {teams.map((partner, index) => (
                                        <div key={partner.id} className={`flex flex-shrink-0 flex-col items-center`}>
                                            <div
                                                className={`${index === 0 ? 'size-40 ring-2 ring-foreground md:size-32' : 'size-40 md:size-32'} group relative overflow-hidden rounded-full border border-border/20 transition-all hover:size-32 hover:ring-2 hover:ring-foreground`}
                                            >
                                                <img src={partner.media?.url} alt={`${partner.name} logo`} className="h-full w-full object-cover" />
                                            </div>
                                            <p className="mt-2 text-center text-sm font-bold text-foreground">{partner.name}</p>
                                            <div className="mx-auto max-w-3xl text-center md:mx-0 md:hidden md:text-left">
                                                <p className="leading-relaxed text-muted-foreground">{partner.bio}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mx-auto max-w-3xl text-center md:mx-0 md:text-left">
                                <p className="hidden leading-relaxed text-muted-foreground md:block">
                                    The Bulwark Support Network (BSN) is the key to creating truly effective partnerships with our stakeholders. It
                                    provides the perfect opportunity for parties to contribute to truly impactful development and advancement in
                                    partnership with Foundation. We stand right by our Partners and send few monthly goals and work wise milestones.
                                </p>
                            </div>
                        </div>
                    </section>
                </main>
            </PageLayout>
        </>
    );
};

export default HomePage;
