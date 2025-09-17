import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BreadcrumbItem } from '@/types';
import { Contact } from '@/types/contact';
import { Head, Link, router } from '@inertiajs/react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import Swal from 'sweetalert2';
import HeadingSmall from '../../components/heading-small';
import AppLayout from '../../layouts/app-layout';

interface IndexProps {
    contacts: Contact[];
}

const containerStyle = {
    width: '100%',
    height: '75vh',
};

const Index: React.FC<IndexProps> = ({ contacts }) => {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Contacts', href: route('contacts.index') },
    ];

    const deleteContact = (id: number) => {
        const isDark = document.documentElement.classList.contains('dark');
        Swal.fire({
            title: 'Are you sure?',
            text: 'This contact will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: isDark ? '#ef4444' : '#d33',
            cancelButtonColor: isDark ? '#3b82f6' : '#3085d6',
            background: isDark ? '#1f2937' : '#fff',
            color: isDark ? '#f9fafb' : '#111827',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('contacts.destroy', id), {
                    preserveScroll: true,
                    preserveState: true,
                    onSuccess: () => {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Contact has been deleted.',
                            icon: 'success',
                            background: isDark ? '#1f2937' : '#fff',
                            color: isDark ? '#f9fafb' : '#111827',
                        });
                    },
                });
            }
        });
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    });

    const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);

    // Filter valid locations and convert lat/lng to numbers
    const locations = contacts
        .filter((c) => c.latitude && c.longitude)
        .map((c) => ({
            ...c,
            lat: Number(c.latitude),
            lng: Number(c.longitude),
        }));

    // Center map at average of all locations
    const center =
        locations.length > 0
            ? {
                  lat: locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length,
                  lng: locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length,
              }
            : { lat: 23.685, lng: 90.3563 }; // default Bangladesh center

    if (loadError) return <div>Error loading Google Maps</div>;
    if (!isLoaded) return <div>Loading Google Maps...</div>;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contacts" />
            <div className="space-y-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <HeadingSmall title="Contacts" description="Manage your contacts" />
                    <Link
                        href={route('contacts.create')}
                        className="inline-block rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Create Contact
                    </Link>
                </div>

                {/* Google Map */}
                <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={7}>
                    {locations.map((contact) => {
                        const icon = {
                            url: '/logo.png', // your custom icon
                            scaledSize: new google.maps.Size(40, 40),
                        };
                        return (
                            <Marker
                                key={contact.id}
                                icon={icon}
                                position={{ lat: contact.lat, lng: contact.lng }}
                                onClick={() => setSelectedContact(contact)}
                            />
                        );
                    })}

                    {selectedContact && (
                        <InfoWindow
                            position={{ lat: Number(selectedContact.latitude), lng: Number(selectedContact.longitude) }}
                            onCloseClick={() => setSelectedContact(null)}
                        >
                            <div className="space-y-1 text-stone-900">
                                <p className="font-semibold">{selectedContact.title}</p>
                                <p>{selectedContact.address}</p>
                                <p>Phone: {selectedContact.phone || '-'}</p>
                                <p>Email: {selectedContact.email || '-'}</p>
                                <p>Open: {selectedContact.opening_hours || '-'}</p>

                                <div className="mt-2 flex space-x-2">
                                    <TooltipProvider>
                                        {/* View */}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href={route('contacts.show', selectedContact.id)}
                                                    className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                                                >
                                                    <Eye className="h-5 w-5" />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>View</TooltipContent>
                                        </Tooltip>

                                        {/* Edit */}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Link
                                                    href={route('contacts.edit', selectedContact.id)}
                                                    className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300"
                                                >
                                                    <Pencil className="h-5 w-5" />
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent>Edit</TooltipContent>
                                        </Tooltip>

                                        {/* Delete */}
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button
                                                    onClick={() => deleteContact(selectedContact.id)}
                                                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                                >
                                                    <Trash2 className="h-5 w-5" />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent>Delete</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </AppLayout>
    );
};

export default Index;
