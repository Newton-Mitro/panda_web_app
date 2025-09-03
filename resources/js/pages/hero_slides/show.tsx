import { Head, Link } from '@inertiajs/react';
import HeadingSmall from '../../components/heading-small';
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
            <div className="p-6">
                <HeadingSmall title={heroSlide.title || ''} description={heroSlide.subtitle || ''} />

                {heroSlide.media && (
                    <img src={heroSlide.media.url} alt={heroSlide.media.alt_text || heroSlide.media.file_name} className="mt-4 max-h-64 rounded" />
                )}

                <div className="mt-4 flex flex-col gap-4">
                    {/* Button Link */}
                    {heroSlide.button_text && (
                        <div className="">
                            <Link href={heroSlide.button_link ?? '#'} className="rounded-full bg-blue-500 px-4 py-2 text-white">
                                {heroSlide.button_text}
                            </Link>
                        </div>
                    )}

                    {/* Status Badge */}
                    <div className="flex">
                        <div
                            className={`rounded-full px-2 text-sm font-medium ${
                                heroSlide.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {heroSlide.status}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
