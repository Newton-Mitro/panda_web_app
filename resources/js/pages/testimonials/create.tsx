import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Transition } from '@headlessui/react';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import { MediaSelector } from '../../components/media-selector';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select } from '../../components/ui/select';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Media } from '../../types/media';
import { PaginatedData } from '../../types/paginated_meta';
import MediaBrowserModal from '../media/media_browser_modal';

interface CreateProps {
    media: PaginatedData<Media>;
}

export default function Create({ media }: CreateProps) {
    const [form, setForm] = useState({
        author_name: '',
        author_designation: '',
        company: '',
        message: '',
        media_id: null as number | null,
        rating: null as number | null,
        status: 'Active',
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('testimonials.store'), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Testimonials', href: route('testimonials.index') },
        { title: 'Create Testimonial', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Testimonial" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Create Testimonial" description="Add a new client testimonial" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Author Info */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Author Name</Label>
                            <Input value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} />
                            <InputError message={errors.author_name} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Designation</Label>
                            <Input value={form.author_designation} onChange={(e) => setForm({ ...form, author_designation: e.target.value })} />
                            <InputError message={errors.author_designation} />
                        </div>
                    </div>

                    {/* Company */}
                    <div className="grid gap-2 md:w-1/2">
                        <Label>Company</Label>
                        <Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                        <InputError message={errors.company} />
                    </div>

                    {/* Message */}
                    <div className="grid gap-2">
                        <Label>Message</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={form.message}
                            onChange={(_, editor) => setForm({ ...form, message: editor.getData() })}
                        />
                        <InputError message={errors.message} />
                    </div>

                    {/* Rating & Status */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Rating (1–5)</Label>
                            <Input
                                type="number"
                                min={1}
                                max={5}
                                value={form.rating ?? ''}
                                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                            />
                            <InputError message={errors.rating} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Status</Label>
                            <Select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                options={[
                                    { value: 'Active', label: 'Active ✅' },
                                    { value: 'Inactive', label: 'Inactive 🚫' },
                                ]}
                            />
                            <InputError message={errors.status} />
                        </div>
                    </div>

                    {/* Media */}
                    <div className="flex gap-4">
                        <MediaSelector
                            media={selectedMedia}
                            onSelect={() => setIsModalOpen(true)}
                            onRemove={() => {
                                setSelectedMedia(null);
                                setForm({ ...form, media_id: null });
                            }}
                            error={errors.media_id}
                            label="Author Image"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Create Testimonial</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Created successfully</p>
                        </Transition>
                    </div>
                </form>

                {/* Media Modal */}
                <MediaBrowserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    media={media}
                    onSelect={(m) => {
                        setSelectedMedia(m);
                        setForm({ ...form, media_id: m.id });
                    }}
                />
            </div>
        </AppLayout>
    );
}
