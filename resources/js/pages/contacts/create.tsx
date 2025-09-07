import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import React, { useState } from 'react';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import AppLayout from '../../layouts/app-layout';

export default function Create() {
    const [form, setForm] = useState({
        title: '',
        address: '',
        phone: '',
        email: '',
        opening_hours: '',
        latitude: '',
        longitude: '',
        status: 'Active',
    });

    const [errors, setErrors] = useState<any>({});
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(route('contacts.store'), form, {
            onError: (err) => setErrors(err),
            onSuccess: () => setRecentlySuccessful(true),
        });
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Contacts', href: route('contacts.index') },
        { title: 'Create Contact', href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Contact" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                <HeadingSmall title="Create Contact" description="Fill in the contact details" />

                <form onSubmit={submit} className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                    {/* Title & Phone Side by Side */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Title</Label>
                            <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                            <InputError message={errors.title} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Phone</Label>
                            <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                            <InputError message={errors.phone} />
                        </div>
                    </div>

                    {/* Address & Email Side by Side */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Address</Label>
                            <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                            <InputError message={errors.address} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                            <InputError message={errors.email} />
                        </div>
                    </div>

                    {/* Opening Hours */}
                    <div className="grid gap-2 md:w-1/2">
                        <div className="grid gap-2">
                            <Label>Opening Hours</Label>
                            <Input value={form.opening_hours} onChange={(e) => setForm({ ...form, opening_hours: e.target.value })} />
                        </div>
                    </div>

                    {/* Latitude & Longitude */}
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label>Latitude</Label>
                            <Input value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} />
                        </div>
                        <div className="grid gap-2">
                            <Label>Longitude</Label>
                            <Input value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Button type="submit">Create Contact</Button>
                        {recentlySuccessful && <p className="text-sm text-neutral-600">Created successfully</p>}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
