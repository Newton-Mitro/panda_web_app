import { Head } from '@inertiajs/react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { HeroSlide } from '../../types/hero_slide';

interface Props {
    heroSlide: HeroSlide;
}

export default function Show({ heroSlide }: Props) {
    // Breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Hero Slides', href: route('hero-sliders.index') },
        { title: heroSlide.title || '', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Hero Slide: ${heroSlide.title}`} />
            <section className="relative m-6 h-[70vh] w-full overflow-hidden md:w-6xl">
                {/* Background Image */}
                {heroSlide.media?.url && (
                    <img src={heroSlide.media.url} alt={heroSlide.title || 'Hero Slide'} className="absolute inset-0 h-full w-full object-cover" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" />

                {/* Content */}
                <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center text-white">
                    {/* Status Badge */}
                    <Badge variant={heroSlide.status === 'Active' ? 'default' : 'secondary'} className="mb-3">
                        {heroSlide.status}
                    </Badge>

                    {/* Title */}
                    {heroSlide.title && <h1 className="mb-2 text-4xl font-bold md:text-5xl">{heroSlide.title}</h1>}

                    {/* Subtitle */}
                    {heroSlide.subtitle && <p className="mb-6 max-w-2xl text-lg opacity-90">{heroSlide.subtitle}</p>}

                    {/* Button */}
                    {heroSlide.button_text && heroSlide.button_link && (
                        <Button asChild size="lg" className="rounded-xl shadow-md transition-transform hover:scale-105">
                            <a href={heroSlide.button_link}>{heroSlide.button_text}</a>
                        </Button>
                    )}
                </div>
            </section>
        </AppLayout>
    );
}
