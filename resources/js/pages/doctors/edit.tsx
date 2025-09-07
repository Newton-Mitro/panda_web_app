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
import { Team } from '../../types/team';
import MediaBrowserModal from '../media/media_browser_modal';

interface EditProps {
    team: Team;
    categories: Category[];
    media: PaginatedData<Media>;
}

export default function Edit({ team, categories, media }: EditProps) {
    const [form, setForm] = useState({
        name: team.name,
        designation: team.designation,
        bio: team.bio ?? '',
        message: team.message ?? '',
        department: team.department ?? '',
        media_id: team.media_id ?? null,
        category_id: team.category_id,
        facebook_links: team.facebook_links ?? '',
        twitter_links: team.twitter_links ?? '',
        linkedin_links: team.linkedin_links ?? '',
        instagram_links: team.instagram_links ?? '',
        youtube_links: team.youtube_links ?? '',
        whatsapp_links: team.whatsapp_links ?? '',
        github_links: team.github_links ?? '',
        email: team.email ?? '',
        phone: team.phone ?? '',
        address: team.address ?? '',
        status: team.status,
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(team.media ?? null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('teams.update', team.id), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Teams', href: route('teams.index') },
        { title: `Edit ${team.name}`, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${team.name}`} />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title={`Edit ${team.name}`} description="Update team member details" />

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
                            <Select
                                value={form.category_id?.toString() || ''}
                                onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                                options={categories.map((cat) => ({
                                    value: cat.id.toString(),
                                    label: `${cat.name} 🌿`,
                                }))}
                            />
                            <InputError message={errors.category_id} />
                        </div>
                    </div>

                    {/* Department + Contact Info */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label>Department</Label>
                            <Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
                            <InputError message={errors.department} />
                        </div>

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
                            label="Photo"
                        />
                    </div>

                    {/* Social Links */}
                    <div className="grid gap-4 md:grid-cols-2">
                        {[
                            { key: 'facebook_links', label: 'Facebook', placeholder: 'https://facebook.com/username' },
                            { key: 'twitter_links', label: 'Twitter', placeholder: 'https://twitter.com/username' },
                            { key: 'linkedin_links', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
                            { key: 'instagram_links', label: 'Instagram', placeholder: 'https://instagram.com/username' },
                            { key: 'youtube_links', label: 'YouTube', placeholder: 'https://youtube.com/channel/...' },
                            { key: 'whatsapp_links', label: 'WhatsApp', placeholder: 'https://wa.me/1234567890' },
                            { key: 'github_links', label: 'GitHub', placeholder: 'https://github.com/username' },
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
