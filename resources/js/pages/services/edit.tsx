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
import { Category } from '../../types/category';
import { Media } from '../../types/media';
import { PaginatedData } from '../../types/paginated_meta';
import { Service } from '../../types/service';
import MediaBrowserModal from '../media/media_browser_modal';

interface EditProps {
    service?: Service;
    categories: Category[];
    media: PaginatedData<Media>;
}

export default function Edit({ service, categories, media }: EditProps) {
    const isEdit = !!service;
    const [form, setForm] = useState({
        title: service?.title || '',
        slug: service?.slug || '',
        description: service?.description || '',
        gallery: service?.gallery || [],
        media_id: service?.media_id ?? null,
        category_id: service?.category_id || (categories[0]?.id ?? 0),
        status: service?.status || 'Active',
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(service?.media ?? null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const method = isEdit ? 'put' : 'post';
        const url = isEdit ? route('services.update', service!.id) : route('services.store');

        router[method](url, form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Services', href: route('services.index') },
        { title: isEdit ? 'Edit Service' : 'Create Service', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Edit Service' : 'Create Service'} />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title={isEdit ? 'Edit Service' : 'Create Service'} description="Fill in the service details" />
                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Title & Slug */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
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

                    {/* Gallery */}
                    <div className="grid gap-2">
                        <Label>Gallery URLs (comma separated)</Label>
                        <Input value={form.gallery.join(',')} onChange={(e) => setForm({ ...form, gallery: e.target.value.split(',') })} />
                        <InputError message={errors.gallery} />
                    </div>

                    {/* Media & Icon Media */}
                    <div className="flex gap-4">
                        <MediaSelector
                            media={selectedMedia}
                            onSelect={() => setIsModalOpen(true)}
                            onRemove={() => {
                                setSelectedMedia(null);
                                setForm({ ...form, media_id: null });
                            }}
                            label="Image, Icon or Video"
                            error={errors.media_id}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">{isEdit ? 'Updated' : 'Created'}</p>
                        </Transition>
                    </div>
                </form>

                {/* Media Modals */}
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
