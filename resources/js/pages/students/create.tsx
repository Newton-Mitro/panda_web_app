import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
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
        student_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        date_of_birth: '',
        gender: '',
        religion: '',
        guardian_name: '',
        guardian_phone: '',
        roll_number: '',
        category_id: 0,
        birth_registration_no: '',
        national_id_no: '',
        address: '',
        media_id: null as number | null,
        status: 'Active',
    });

    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('students.store'), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Students', href: route('students.index') },
        { title: `Create Student`, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Student" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Create Student" description="Add a new student" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Student Info */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label>Student ID</Label>
                            <Input value={form.student_id} onChange={(e) => setForm({ ...form, student_id: e.target.value })} />
                            <InputError message={errors.student_id} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Roll Number</Label>
                            <Input value={form.roll_number} onChange={(e) => setForm({ ...form, roll_number: e.target.value })} />
                            <InputError message={errors.roll_number} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>First Name</Label>
                            <Input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} />
                            <InputError message={errors.first_name} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Last Name</Label>
                            <Input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} />
                            <InputError message={errors.last_name} />
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
                            <Label>Roll Number</Label>
                            <Input value={form.roll_number} onChange={(e) => setForm({ ...form, roll_number: e.target.value })} />
                            <InputError message={errors.roll_number} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Class</Label>
                            <select
                                value={form.category_id}
                                onChange={(e) => setForm({ ...form, category_id: Number(e.target.value) })}
                                className="rounded-md border px-2 py-1 dark:bg-gray-800 dark:text-gray-200"
                            >
                                <option value={0}>Select Class</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <InputError message={errors.category_id} />
                        </div>
                    </div>

                    {/* Bio / Address */}
                    <div className="flex flex-col gap-2">
                        <Label>Address</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={form.address || ''}
                            onChange={(_, editor) => setForm({ ...form, address: editor.getData() })}
                        />
                        <InputError message={errors.address} />
                    </div>

                    {/* Guardian Info */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <Label>Guardian Name</Label>
                            <Input value={form.guardian_name} onChange={(e) => setForm({ ...form, guardian_name: e.target.value })} />
                            <InputError message={errors.guardian_name} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label>Guardian Phone</Label>
                            <Input value={form.guardian_phone} onChange={(e) => setForm({ ...form, guardian_phone: e.target.value })} />
                            <InputError message={errors.guardian_phone} />
                        </div>
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
                        <Button type="submit">Create Student</Button>
                        {recentlySuccessful && <p className="text-sm text-neutral-600">Created</p>}
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
