import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Transition } from '@headlessui/react';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import AppDatePicker from '../../components/ui/app_date_picker';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';

export default function Create() {
    const [form, setForm] = useState({
        title: '',
        location: '',
        salary_range: '',
        deadline: '',
        description: '',
        requirements: '',
    });

    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('careers.store'), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => {
                setRecentlySuccessful(true);
                setForm({
                    title: '',
                    location: '',
                    salary_range: '',
                    deadline: '',
                    description: '',
                    requirements: '',
                });
            },
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Careers', href: route('careers.index') },
        { title: 'Create Career', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Career" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Create Career" description="Add a new career opportunity" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 shadow-md md:w-4xl dark:bg-gray-900">
                    {/* Title & Location */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                            <InputError message={errors.title} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Location</Label>
                            <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
                            <InputError message={errors.location} />
                        </div>
                    </div>

                    {/* Salary & Deadline */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Salary Range</Label>
                            <Input value={form.salary_range} onChange={(e) => setForm({ ...form, salary_range: e.target.value })} />
                            <InputError message={errors.salary_range} />
                        </div>
                        <div className="grid gap-2">
                            <AppDatePicker
                                label="Deadline"
                                value={form.deadline}
                                onChange={(val) => setForm({ ...form, deadline: val })}
                                error={errors.deadline}
                            />
                            <InputError message={errors.deadline} />
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

                    {/* Requirements */}
                    <div className="grid gap-2">
                        <Label>Requirements</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={form.requirements}
                            onChange={(_, editor) => setForm({ ...form, requirements: editor.getData() })}
                        />
                        <InputError message={errors.requirements} />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Create Career</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">Career created successfully</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
