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
import AttributeSection from './sections/AttributeSection';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';

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
                    <HeroSection />
                    <ServicesSection />
                    <AttributeSection />
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
