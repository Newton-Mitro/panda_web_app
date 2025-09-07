import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Transition } from '@headlessui/react';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import { MediaSelector } from '../../components/media-selector';
import AppDatePicker from '../../components/ui/app_date_picker';
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
    const today = new Date().toISOString().split('T')[0];

    const [form, setForm] = useState({
        title: '',
        slug: '',
        description: '',
        location: '',
        start_date: today,
        end_date: '',
        media_id: null as number | null,
        status: 'Active',
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('events.store'), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Events', href: route('events.index') },
        { title: 'Create Event', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Event" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Create Event" description="Fill in the event details" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Title & Slug */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input
                                value={form.title}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        title: e.target.value,
                                        slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                                    })
                                }
                            />
                            <InputError message={errors.title} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Slug</Label>
                            <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                            <InputError message={errors.slug} />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="grid gap-2 md:w-1/2">
                        <Label>Location</Label>
                        <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                        <InputError message={errors.location} />
                    </div>

                    {/* Dates */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <AppDatePicker
                                label="Start Date"
                                value={form.start_date?.split('T')[0]}
                                onChange={(val) => setForm({ ...form, start_date: val })}
                                error={errors.start_date}
                            />
                        </div>
                        <div className="grid gap-2">
                            <AppDatePicker
                                label="End Date"
                                value={form.end_date?.split('T')[0]}
                                onChange={(val) => setForm({ ...form, end_date: val })}
                                error={errors.end_date}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={form.description}
                            onChange={(_, editor) => setForm({ ...form, description: editor.getData() })}
                        />
                        <InputError message={errors.description} />
                    </div>

                    {/* Status */}
                    <div className="grid gap-2 md:w-1/3">
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
                            label="Event Banner"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Create Event</Button>
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
