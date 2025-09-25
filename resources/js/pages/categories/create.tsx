import { Transition } from '@headlessui/react';
import { Head, router } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import { MediaSelector } from '../../components/media-selector';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select } from '../../components/ui/select';
import { Textarea } from '../../components/ui/text-area';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Category } from '../../types/category';
import { Media } from '../../types/media';
import { PaginatedData } from '../../types/paginated_meta';
import MediaBrowserModal from '../media/media_browser_modal';

interface CreateProps {
    media: PaginatedData<Media>;
    categories: Category[]; // all categories for parent dropdown
}

export default function Create({ media, categories }: CreateProps) {
    const [form, setForm] = useState({
        name: '',
        slug: '',
        category_of: '',
        media_id: null as number | null,
        description: '',
    });

    const [parentCategories, setParentCategories] = useState<Category[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    // Update parent categories whenever category_of changes
    useEffect(() => {
        if (form.category_of) {
            setParentCategories(categories.filter((cat) => cat.category_of === form.category_of));
        } else {
            setParentCategories([]);
        }
        setForm((prev) => ({ ...prev, parent_id: null }));
    }, [form.category_of, categories]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('categories.store'), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Categories', href: route('categories.index') },
        { title: 'Create Category', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Category" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Create Category" description="Add a new category" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Name + Slug */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                            <InputError message={errors.name} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="slug">Slug</Label>
                            <Input id="slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
                            <InputError message={errors.slug} />
                        </div>
                    </div>

                    {/* Category Of + Parent Category */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="category_of">Category Of</Label>
                            <Select
                                value={form.category_of}
                                onChange={(e) => setForm({ ...form, category_of: e.target.value })}
                                options={[
                                    { value: 'Leader', label: 'Leader' },
                                    { value: 'Team', label: 'Team' },
                                    { value: 'Student', label: 'Student' },
                                    { value: 'Service', label: 'Service' },
                                    { value: 'Product', label: 'Product' },
                                    { value: 'Project', label: 'Project' },
                                    { value: 'Event', label: 'Event' },
                                    { value: 'Notice', label: 'Notice' },
                                    { value: 'Article', label: 'Article' },
                                    { value: 'Course', label: 'Course' },
                                ]}
                            />
                            <InputError message={errors.category_of} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                        <InputError message={errors.description} />
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

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Save</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-neutral-600">Saved</p>
                        </Transition>
                    </div>
                </form>

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
