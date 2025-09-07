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

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import AppDatePicker from '../../components/ui/app_date_picker';
import { Category } from '../../types/category';
import MediaBrowserModal from '../media/media_browser_modal';

interface CreateProjectProps {
    categories: Category[];
    media: PaginatedData<Media>;
}

export default function CreateProject({ categories, media }: CreateProjectProps) {
    const [form, setForm] = useState({
        title: '',
        slug: '',
        description: '',
        gallery: [] as string[],
        media_id: null as number | null,
        category_id: 0,
        status: 'Active',
        source_code_link: '',
        live_site_link: '',
        start_date: '',
        end_date: '',
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('projects.store'), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Projects', href: route('projects.index') },
        { title: 'Create Project', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Project" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Create Project" description="Fill in the project details" />

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
                            <Label>Category</Label>
                            <Select
                                value={form.category_id.toString()}
                                onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                                options={categories.map((cat) => ({
                                    value: cat.id.toString(),
                                    label: `${cat.name} 🌿`,
                                }))}
                            />
                            <InputError message={errors.category_id} />
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

                    {/* Source Code Link */}
                    <div className="grid gap-2">
                        <Label>Source Code Link</Label>
                        <Input type="url" value={form.source_code_link} onChange={(e) => setForm({ ...form, source_code_link: e.target.value })} />
                        <InputError message={errors.source_code_link} />
                    </div>

                    {/* Live Site Link */}
                    <div className="grid gap-2">
                        <Label>Live Site Link</Label>
                        <Input type="url" value={form.live_site_link} onChange={(e) => setForm({ ...form, live_site_link: e.target.value })} />
                        <InputError message={errors.live_site_link} />
                    </div>

                    {/* Start Date */}
                    <div className="grid gap-2">
                        <AppDatePicker
                            label="Start Date"
                            value={form.start_date?.split('T')[0]}
                            onChange={(value) => setForm({ ...form, start_date: value })}
                            error={errors.start_date}
                        />
                    </div>

                    {/* End Date */}
                    <div className="grid gap-2">
                        <AppDatePicker
                            label="End Date"
                            value={form.end_date?.split('T')[0]}
                            onChange={(value) => setForm({ ...form, end_date: value })}
                            error={errors.end_date}
                        />
                    </div>

                    {/* Gallery */}
                    <div className="grid gap-2">
                        <Label>Gallery URLs (comma separated)</Label>
                        <Input value={form.gallery.join(',')} onChange={(e) => setForm({ ...form, gallery: e.target.value.split(',') })} />
                        <InputError message={errors.gallery} />
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
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Create Project</Button>
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
