import { Contact } from '@/types/contact';
import { Head } from '@inertiajs/react';
import { GoogleMap, InfoWindow, Marker, useLoadScript } from '@react-google-maps/api';
import { Mail, MapPin, Phone } from 'lucide-react';
import React from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/text-area';
import PageLayout from '../../layouts/page-layout';
import PageBanner from './components/page-banner';

interface ContactPageProps {
    contacts: Contact[];
}

const containerStyle = {
    width: '100%',
    height: '70vh',
};

const ContactPage: React.FC<ContactPageProps> = ({ contacts }) => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
    });

    const [selectedContact, setSelectedContact] = React.useState<Contact | null>(null);

    const locations = contacts
        .filter((c) => c.latitude && c.longitude)
        .map((c) => ({
            ...c,
            lat: Number(c.latitude),
            lng: Number(c.longitude),
        }));

    const center =
        locations.length > 0
            ? {
                  lat: locations.reduce((sum, loc) => sum + loc.lat, 0) / locations.length,
                  lng: locations.reduce((sum, loc) => sum + loc.lng, 0) / locations.length,
              }
            : { lat: 23.685, lng: 90.3563 };

    if (loadError) return <div className="py-8 text-center">Error loading map.</div>;
    if (!isLoaded) return <div className="py-8 text-center">Loading map...</div>;

    return (
        <>
            <Head title="Contact Us" />
            <PageLayout>
                {/* Hero */}
                <PageBanner title="Contact Us" subtitle="We’d love to hear from you—reach out for support, partnerships, or just to say hi!" />

                {/* Contact Info & Form */}
                <section className="mx-auto max-w-6xl px-6 py-16">
                    <div className="grid gap-12 md:grid-cols-2">
                        {/* Info */}
                        <div>
                            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">Get in Touch</h2>
                            <p className="mb-8 text-gray-600 dark:text-gray-300">
                                Our team is here to answer your questions. Choose the channel that suits you best.
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <MapPin className="h-6 w-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Office</h3>
                                        <p className="text-gray-600 dark:text-gray-400">123 Main St, Dhaka, Bangladesh</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Phone className="h-6 w-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Phone</h3>
                                        <p className="text-gray-600 dark:text-gray-400">+880 1234 567 890</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <Mail className="h-6 w-6 text-primary" />
                                    <div>
                                        <h3 className="font-semibold text-gray-800 dark:text-gray-200">Email</h3>
                                        <p className="text-gray-600 dark:text-gray-400">contact@yourdomain.com</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <div className="rounded-xl bg-white p-8 shadow dark:bg-gray-800">
                            <h2 className="mb-6 text-2xl font-semibold text-gray-900 dark:text-gray-100">Send a Message</h2>
                            <form className="space-y-5">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                                    <Input type="text" placeholder="Your Name" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                    <Input type="email" placeholder="you@example.com" />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                                    <Textarea rows={4} placeholder="Your message..." />
                                </div>
                                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </section>

                {/* Map */}
                <section className="w-full">
                    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={8}>
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
                                position={{
                                    lat: Number(selectedContact.latitude),
                                    lng: Number(selectedContact.longitude),
                                }}
                                onCloseClick={() => setSelectedContact(null)}
                            >
                                <div className="space-y-1 text-gray-100 dark:text-gray-800">
                                    <p className="font-semibold">{selectedContact.title}</p>
                                    <p>{selectedContact.address}</p>
                                    <p>📞 {selectedContact.phone || 'N/A'}</p>
                                    <p>✉ {selectedContact.email || 'N/A'}</p>
                                </div>
                            </InfoWindow>
                        )}
                    </GoogleMap>
                </section>
            </PageLayout>
        </>
    );
};

export default ContactPage;
