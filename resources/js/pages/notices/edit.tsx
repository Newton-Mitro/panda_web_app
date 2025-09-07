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
import { Category } from '../../types/category';
import { Media } from '../../types/media';
import { Notice } from '../../types/notice';
import { PaginatedData } from '../../types/paginated_meta';
import MediaBrowserModal from '../media/media_browser_modal';

interface EditProps {
    notice: Notice;
    categories: Category[];
    media: PaginatedData<Media>;
}

export default function Edit({ notice, categories, media }: EditProps) {
    const [form, setForm] = useState({
        title: notice.title,
        slug: notice.slug,
        content: notice.content || '',
        publish_date: notice.publish_date, // read-only
        expiry_date: notice.expiry_date || '',
        category_id: notice.category_id || (categories[0]?.id ?? 0),
        status: notice.status,
        media_id: notice.media_id ?? null,
        media: notice.media ?? null,
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(notice.media ?? null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('notices.update', notice.id), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Notices', href: route('notices.index') },
        { title: 'Edit Notice', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Notice" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Edit Notice" description="Update the notice details" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Title & Category Side by Side */}
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

                    {/* Publish & Expiry Dates Side by Side */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <AppDatePicker label="Publish Date" value={form.publish_date} disabled small />
                        <AppDatePicker
                            label="Expiry Date"
                            value={form.expiry_date?.split('T')[0]}
                            onChange={(val) => setForm({ ...form, expiry_date: val })}
                            error={errors.expiry_date}
                            small
                        />
                    </div>

                    {/* Content */}
                    <div className="grid gap-2">
                        <Label>Content</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={form.content}
                            onChange={(_, editor) => setForm({ ...form, content: editor.getData() })}
                        />
                        <InputError message={errors.content} />
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
                            label="Image or Pdf"
                            error={errors.media_id}
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Update Notice</Button>
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
