import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '@/components/ui/select';
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
import { JobCircular } from '../../types/job_circular';

interface EditProps {
    career: JobCircular; // Career object from backend
}

export default function Edit({ career }: EditProps) {
    const [form, setForm] = useState<any>({
        title: career.title,
        location: career.location || '',
        salary_range: career.salary_range || '',
        min_salary: career.min_salary || '',
        max_salary: career.max_salary || '',
        currency: career.currency || 'USD',
        description: career.description || '',
        requirements: career.requirements || '',
        responsibilities: career.responsibilities || '',
        is_remote: career.is_remote || false,
        employment_type: career.employment_type || 'full-time',
        experience_level: career.experience_level || 'entry',
        department: career.department || '',
        job_function: career.job_function || '',
        education_level: career.education_level || '',
        deadline: career.deadline || '',
        status: career.status || 'open',
        positions: career.positions || 1,
        benefits: career.benefits || [],
    });

    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.put(route('careers.update', career.id), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Careers', href: route('careers.index') },
        { title: 'Edit Career', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Career" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Edit Career" description="Update the career details" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-5xl dark:bg-gray-900">
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

                    {/* Remote */}
                    <div className="grid gap-2 md:w-1/3">
                        <Checkbox checked={form.is_remote} onCheckedChange={(val) => setForm({ ...form, is_remote: Boolean(val) })} />
                        <Label>Remote</Label>
                    </div>

                    {/* Employment Type & Experience Level */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2 md:w-1/2">
                            <Label>Employment Type</Label>
                            <Select
                                value={form.employment_type}
                                onChange={(e) => setForm({ ...form, employment_type: e.target.value })}
                                options={[
                                    { value: 'full-time', label: 'Full-Time' },
                                    { value: 'part-time', label: 'Part-Time' },
                                    { value: 'contract', label: 'Contract' },
                                    { value: 'internship', label: 'Internship' },
                                    { value: 'temporary', label: 'Temporary' },
                                ]}
                            />
                            <InputError message={errors.employment_type} />
                        </div>
                        <div className="grid gap-2 md:w-1/2">
                            <Label>Experience Level</Label>
                            <Select
                                value={form.experience_level}
                                onChange={(e) => setForm({ ...form, experience_level: e.target.value })}
                                options={[
                                    { value: 'entry', label: 'Entry' },
                                    { value: 'junior', label: 'Junior' },
                                    { value: 'mid', label: 'Mid' },
                                    { value: 'senior', label: 'Senior' },
                                    { value: 'lead', label: 'Lead' },
                                ]}
                            />
                            <InputError message={errors.experience_level} />
                        </div>
                    </div>

                    {/* Department & Job Function */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Department</Label>
                            <Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
                            <InputError message={errors.department} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Job Function</Label>
                            <Input value={form.job_function} onChange={(e) => setForm({ ...form, job_function: e.target.value })} />
                            <InputError message={errors.job_function} />
                        </div>
                    </div>

                    {/* Description, Requirements, Responsibilities */}
                    <div className="grid gap-2">
                        <Label>Description</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={form.description}
                            onChange={(_, editor) => setForm({ ...form, description: editor.getData() })}
                        />
                        <InputError message={errors.description} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Requirements</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={form.requirements}
                            onChange={(_, editor) => setForm({ ...form, requirements: editor.getData() })}
                        />
                        <InputError message={errors.requirements} />
                    </div>
                    <div className="grid gap-2">
                        <Label>Responsibilities</Label>
                        <CKEditor
                            editor={ClassicEditor as any}
                            data={form.responsibilities}
                            onChange={(_, editor) => setForm({ ...form, responsibilities: editor.getData() })}
                        />
                        <InputError message={errors.responsibilities} />
                    </div>

                    {/* Status & Positions */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2 md:w-1/3">
                            <Label>Status</Label>
                            <Select
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                                options={[
                                    { value: 'open', label: 'Open' },
                                    { value: 'closed', label: 'Closed' },
                                    { value: 'draft', label: 'Draft' },
                                ]}
                            />
                            <InputError message={errors.status} />
                        </div>
                        <div className="grid gap-2 md:w-1/3">
                            <Label>Positions</Label>
                            <Input type="number" value={form.positions} onChange={(e) => setForm({ ...form, positions: Number(e.target.value) })} />
                            <InputError message={errors.positions} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Update Career</Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-green-600">Career updated successfully</p>
                        </Transition>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
