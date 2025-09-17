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
import { Category } from '../../types/category';
import { Media } from '../../types/media';
import { PaginatedData } from '../../types/paginated_meta';
import MediaBrowserModal from '../media/media_browser_modal';

interface CreateProps {
    media: PaginatedData<Media>;
    categories: Category[];
}

export default function Create({ media, categories }: CreateProps) {
    const [form, setForm] = useState({
        name: '',
        designation: '',
        bio: '',
        message: '',
        media_id: null as number | null,
        category_id: 0,
        facebook_links: '',
        twitter_links: '',
        linkedin_links: '',
        instagram_links: '',
        email: '',
        phone: '',
        address: '',
        status: 'Active',
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('leaders.store'), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Leaders', href: route('leaders.index') },
        { title: 'Create Leader', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Leader" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Create Leader" description="Add a new leader" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Name + Designation */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label>Name</Label>
                            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            <InputError message={errors.name} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Designation</Label>
                            <Input value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
                            <InputError message={errors.designation} />
                        </div>
                    </div>

                    {/* Category + Status */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label>Category</Label>
                            <select
                                value={form.category_id}
                                onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                                className="rounded border border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                            >
                                <option value={0}>Select Category</option>
                                {categories.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.category_id} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Status</Label>
                            <select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                className="rounded border border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                            <InputError message={errors.status} />
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label>Email</Label>
                            <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            <InputError message={errors.email} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Phone</Label>
                            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            <InputError message={errors.phone} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Address</Label>
                            <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                            <InputError message={errors.address} />
                        </div>
                    </div>

                    {/* Bio + Message */}
                    <div className="flex flex-col gap-2">
                        <Label>Bio</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={form.bio}
                            onChange={(_, editor) => setForm({ ...form, bio: editor.getData() })}
                        />
                        <InputError message={errors.bio} />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Message</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={form.message}
                            onChange={(_, editor) => setForm({ ...form, message: editor.getData() })}
                        />
                        <InputError message={errors.message} />
                    </div>

                    {/* Media */}
                    <div className="flex flex-col gap-2">
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

                    {/* Social Links */}
                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            { key: 'facebook_links', label: 'Facebook', placeholder: 'https://facebook.com/username' },
                            { key: 'twitter_links', label: 'Twitter', placeholder: 'https://twitter.com/username' },
                            { key: 'linkedin_links', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
                            { key: 'instagram_links', label: 'Instagram', placeholder: 'https://instagram.com/username' },
                        ].map((social) => (
                            <div className="flex flex-col gap-2" key={social.key}>
                                <Label>{social.label}</Label>
                                <Input
                                    value={form[social.key as keyof typeof form] as string}
                                    placeholder={social.placeholder}
                                    onChange={(e) => setForm({ ...form, [social.key]: e.target.value })}
                                />
                                <InputError message={errors[social.key]} />
                            </div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Create</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Created</p>
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
