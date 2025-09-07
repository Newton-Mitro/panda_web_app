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
import { Media } from '../../types/media';
import { PaginatedData } from '../../types/paginated_meta';
import { Partner } from '../../types/partner';
import MediaBrowserModal from '../media/media_browser_modal';

interface EditProps {
    partner: Partner;
    media: PaginatedData<Media>;
}

export default function Edit({ partner, media }: EditProps) {
    const [form, setForm] = useState({
        name: partner.name,
        website: partner.website || '',
        media_id: partner.media_id,
        status: partner.status,
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(partner.media || null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('partners.update', partner.id), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Partners', href: route('partners.index') },
        { title: 'Edit Partner', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${partner.name}`} />
            <div className="space-y-8 p-6">
                <HeadingSmall title={`Edit ${partner.name}`} description="Update partner details" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Name */}
                    <div className="grid gap-2">
                        <Label>Name</Label>
                        <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                        <InputError message={errors.name} />
                    </div>

                    {/* Website */}
                    <div className="grid gap-2">
                        <Label>Website</Label>
                        <Input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
                        <InputError message={errors.website} />
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
                            label="Logo / Media"
                        />
                    </div>

                    {/* Submit */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Update Partner</Button>
                        {recentlySuccessful && <p className="text-sm text-neutral-600">Updated successfully</p>}
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
