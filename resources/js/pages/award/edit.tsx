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
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Award } from '../../types/award';
import { Media } from '../../types/media';
import { PaginatedData } from '../../types/paginated_meta';
import MediaBrowserModal from '../media/media_browser_modal';

interface EditProps {
    award: Award;
    media: PaginatedData<Media>;
}

export default function Edit({ award, media }: EditProps) {
    const [form, setForm] = useState({
        title: award.title || '',
        description: award.description || '',
        year: award.year || '',
        media_id: award.media_id ?? null,
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(award.media ?? null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('awards.update', award.id), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Awards', href: route('awards.index') },
        { title: 'Edit Award', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Award" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Edit Award" description="Update the award details" />
                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Title */}
                    <div className="grid gap-2">
                        <Label>Title</Label>
                        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                        <InputError message={errors.title} />
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

                    {/* Year */}
                    <div className="grid gap-2">
                        <Label>Year</Label>
                        <Input type="number" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
                        <InputError message={errors.year} />
                    </div>

                    {/* Media */}
                    <MediaSelector
                        media={selectedMedia}
                        onSelect={() => setIsModalOpen(true)}
                        onRemove={() => {
                            setSelectedMedia(null);
                            setForm({ ...form, media_id: null });
                        }}
                        label="Award Image"
                        error={errors.media_id}
                    />

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Update</Button>
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
