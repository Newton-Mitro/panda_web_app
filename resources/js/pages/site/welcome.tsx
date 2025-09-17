import { Head } from '@inertiajs/react';
import PageLayout from '../../layouts/page-layout';
import AttributeSection from './sections/AttributeSection';
import HeroSection from './sections/HeroSection';
import ServicesSection from './sections/ServicesSection';
import TeamSection from './sections/TeamSection';

export default function Welcome({ page }) {
    const pageUrl = window.location.href;
    const imageUrl = page?.image;
    const metaTitle = page?.meta_title;
    const metaDescription = page?.meta_description;
    const metaKeywords = page?.meta_keywords;
    return (
        <>
            <Head title="Home Page">
                {/* Basic SEO */}
                <meta name="title" content={metaTitle} />
                <meta name="description" content={metaDescription} />
                <meta name="keywords" content={`${page?.category?.name || ''}, ${metaKeywords || ''}, articles, blog`} />
                <meta name="author" content={page?.author?.name || 'YourSite'} />

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
                    <TeamSection />
                </main>
            </PageLayout>
        </>
    );
}
