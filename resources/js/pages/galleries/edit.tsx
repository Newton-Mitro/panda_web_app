import { Transition } from '@headlessui/react';
import { Head, router } from '@inertiajs/react';
import { PlusCircleIcon, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import { MediaSelector } from '../../components/media-selector';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/text-area';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Gallery, GalleryMediaItem } from '../../types/gallery';
import { Media } from '../../types/media';
import { PaginatedData } from '../../types/paginated_meta';
import MediaBrowserModal from '../media/media_browser_modal';

interface EditProps {
    media: PaginatedData<Media>;
    gallery: Gallery;
}

interface GalleryForm {
    title: string;
    description?: string;
    media_id: number | null;
    media_items: GalleryMediaItem[];
}

const Edit: React.FC<EditProps> = ({ media, gallery }) => {
    const [form, setForm] = useState<GalleryForm>({
        title: '',
        description: '',
        media_id: null,
        media_items: [],
    });

    const [selectedMainMedia, setSelectedMainMedia] = useState<Media | null>(null);
    const [mediaModalOpen, setMediaModalOpen] = useState(false);
    const [galleryMediaModalOpen, setGalleryMediaModalOpen] = useState(false);
    const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<number | null>(null);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    // preload gallery data
    useEffect(() => {
        setForm({
            title: gallery.title,
            description: gallery.description,
            media_id: gallery.media_id,
            media_items:
                gallery.media_items?.map((item) => ({
                    id: item.id,
                    gallery_id: item.gallery_id,
                    media: item.media || null,
                    media_id: item.media_id,
                    caption: item.caption || '',
                    description: item.description || '',
                })) || [],
        });

        if (gallery.media) {
            setSelectedMainMedia(gallery.media);
        }
    }, [gallery]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('galleries.update', gallery.id), form as any, {
            onError: (err) => setErrors(err),
            onSuccess: () => {
                setRecentlySuccessful(true);
                toast.success('Gallery updated successfully.');
                router.visit(route('galleries.index'));
            },
        });
    };

    const addGalleryMedia = () => {
        setForm((prev) => ({
            ...prev,
            media_items: [...prev.media_items, { media: null, media_id: null, caption: '', description: '' }],
        }));
    };

    const updateGalleryMedia = (index: number, keyOrFields: keyof GalleryMediaItem | Record<string, any>, value?: any) => {
        setForm((prev) => {
            const updated = [...prev.media_items];
            if (typeof keyOrFields === 'string') {
                updated[index] = { ...updated[index], [keyOrFields]: value };
            } else {
                updated[index] = { ...updated[index], ...keyOrFields };
            }
            return { ...prev, media_items: updated };
        });
    };

    const removeGalleryMedia = (index: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This media item will be removed.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setForm((prev) => {
                    const updated = [...prev.media_items];
                    updated.splice(index, 1);
                    return { ...prev, media_items: updated };
                });
            }
        });
    };

    const handleMainMediaSelect = (m: Media) => {
        setSelectedMainMedia(m);
        setForm({ ...form, media_id: m.id });
        setMediaModalOpen(false);
    };

    const handleGalleryMediaSelect = (m: Media) => {
        if (selectedGalleryIndex !== null) {
            updateGalleryMedia(selectedGalleryIndex, { media: m, media_id: m.id });
            setSelectedGalleryIndex(null);
        }
        setGalleryMediaModalOpen(false);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Galleries', href: route('galleries.index') },
        { title: 'Edit Gallery', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Gallery" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Edit Gallery" description="Update gallery title, cover image, and media items" />

                <form onSubmit={submit} className="w-full md:w-4xl">
                    <div className="space-y-6 rounded-lg border bg-white p-6 dark:bg-gray-900">
                        {/* Title & Description */}
                        <div className="grid gap-4">
                            <div className="flex flex-col gap-2">
                                <Label>Title</Label>
                                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                                <InputError message={errors.title} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={form.description || ''}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    rows={3}
                                />
                                <InputError message={errors.description} />
                            </div>
                        </div>

                        {/* Main Media */}
                        <div className="mt-2">
                            <MediaSelector
                                media={selectedMainMedia}
                                onSelect={() => setMediaModalOpen(true)}
                                onRemove={() => {
                                    setSelectedMainMedia(null);
                                    setForm({ ...form, media_id: null });
                                }}
                                label="Gallery Cover"
                                error={errors.media_id}
                            />
                        </div>
                    </div>

                    <div className="mt-6">
                        <HeadingSmall title="Gallery Images" description="Add or update multiple images in this gallery" />
                    </div>

                    {/* Gallery Images */}
                    <div>
                        {form.media_items.map((item, index) => (
                            <div key={index} className="relative my-6 gap-6 space-y-6 rounded-lg border bg-white p-6 dark:bg-gray-900">
                                <div className="flex items-center justify-between">
                                    <span>Image {index + 1}</span>
                                    <Button type="button" variant="outline" onClick={() => removeGalleryMedia(index)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <MediaSelector
                                    media={item.media}
                                    onSelect={() => {
                                        setSelectedGalleryIndex(index);
                                        setGalleryMediaModalOpen(true);
                                    }}
                                    onRemove={() => updateGalleryMedia(index, { media: null, media_id: null })}
                                    label="Select Image"
                                />
                                <Input
                                    placeholder="Caption"
                                    value={item.caption || ''}
                                    onChange={(e) => updateGalleryMedia(index, 'caption', e.target.value)}
                                />
                                <Textarea
                                    placeholder="Description"
                                    value={item.description || ''}
                                    onChange={(e) => updateGalleryMedia(index, 'description', e.target.value)}
                                    rows={2}
                                />
                            </div>
                        ))}
                    </div>

                    <Button type="button" onClick={addGalleryMedia} variant="outline" className="flex items-center gap-2">
                        <PlusCircleIcon className="h-5 w-5" /> Add Media
                    </Button>

                    {/* Actions */}
                    <div className="mt-4 flex items-center gap-4">
                        <Button type="submit">Update Gallery</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Updated successfully</p>
                        </Transition>
                    </div>
                </form>

                {/* Media Modals */}
                <MediaBrowserModal isOpen={mediaModalOpen} onClose={() => setMediaModalOpen(false)} media={media} onSelect={handleMainMediaSelect} />
                <MediaBrowserModal
                    isOpen={galleryMediaModalOpen}
                    onClose={() => setGalleryMediaModalOpen(false)}
                    media={media}
                    onSelect={handleGalleryMediaSelect}
                />
            </div>
        </AppLayout>
    );
};

export default Edit;
