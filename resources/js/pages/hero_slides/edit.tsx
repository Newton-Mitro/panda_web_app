import { Transition } from '@headlessui/react';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import { MediaSelector } from '../../components/media-selector';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/text-area';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { HeroSlide } from '../../types/hero_slide';
import { Media } from '../../types/media';
import { PaginatedData } from '../../types/paginated_meta';
import MediaBrowserModal from '../media/media_browser_modal';

interface EditProps {
    heroSlide: HeroSlide;
    media: PaginatedData<Media>;
}

export default function Edit({ heroSlide, media }: EditProps) {
    const { data, setData, put, processing, errors, recentlySuccessful } = useForm({
        title: heroSlide.title || '',
        subtitle: heroSlide.subtitle || '',
        button_text: heroSlide.button_text || '',
        button_link: heroSlide.button_link || '',
        media_id: heroSlide.media_id || null,
        sort_order: heroSlide.sort_order || 0,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(heroSlide.media || null);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('hero-sliders.update', heroSlide.id));
    };

    // Breadcrumbs
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Hero Slides', href: route('hero-sliders.index') },
        { title: `Edit: ${heroSlide.title}`, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Hero Slide: ${heroSlide.title}`} />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Edit Hero Slide" description="Update hero slide details" />

                <div className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Title */}
                        <div className="grid gap-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" value={data.title} onChange={(e) => setData('title', e.target.value)} placeholder="Slide title" />
                            <InputError message={errors.title} />
                        </div>

                        {/* Subtitle */}
                        <div className="grid gap-2">
                            <Label htmlFor="subtitle">Subtitle</Label>
                            <Textarea
                                id="subtitle"
                                value={data.subtitle}
                                onChange={(e) => setData('subtitle', e.target.value)}
                                placeholder="Slide subtitle"
                            />
                            <InputError message={errors.subtitle} />
                        </div>

                        {/* Button Text */}
                        <div className="grid gap-2">
                            <Label htmlFor="button_text">Button Text</Label>
                            <Input
                                id="button_text"
                                value={data.button_text}
                                onChange={(e) => setData('button_text', e.target.value)}
                                placeholder="e.g. Learn More"
                            />
                            <InputError message={errors.button_text} />
                        </div>

                        {/* Button Link */}
                        <div className="grid gap-2">
                            <Label htmlFor="button_link">Button Link</Label>
                            <Input
                                id="button_link"
                                value={data.button_link}
                                onChange={(e) => setData('button_link', e.target.value)}
                                placeholder="https://example.com"
                            />
                            <InputError message={errors.button_link} />
                        </div>

                        {/* Sort Order */}
                        <div className="grid gap-2">
                            <Label htmlFor="sort_order">Sort Order</Label>
                            <Input
                                id="sort_order"
                                type="number"
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', Number(e.target.value))}
                            />
                            <InputError message={errors.sort_order} />
                        </div>

                        {/* Media Picker */}
                        <div className="grid gap-2">
                            <MediaSelector
                                media={selectedMedia}
                                onSelect={() => setIsModalOpen(true)}
                                onRemove={() => {
                                    setSelectedMedia(null);
                                    setData('media_id', null);
                                }}
                                error={errors.media_id}
                            />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            <div className="">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update'}
                                </Button>
                            </div>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Updated</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </div>

            {/* Media Modal */}
            <MediaBrowserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                media={media}
                onSelect={(m) => {
                    setSelectedMedia(m);
                    setData('media_id', m.id);
                }}
            />
        </AppLayout>
    );
}
