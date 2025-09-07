import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Head, router } from '@inertiajs/react';
import { PlusCircleIcon, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import HeadingSmall from '../../components/heading-small';
import InputError from '../../components/input-error';
import { MediaSelector } from '../../components/media-selector';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/text-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip';
import AppLayout from '../../layouts/app-layout';
import { BreadcrumbItem } from '../../types';
import { Media } from '../../types/media';
import { PageSection } from '../../types/page_section';
import { PaginatedData } from '../../types/paginated_meta';
import MediaBrowserModal from '../media/media_browser_modal';

interface CreateProps {
    media: PaginatedData<Media>;
}

interface PageForm {
    title: string;
    meta_title?: string | null;
    meta_description?: string | null;
}

const Create: React.FC<CreateProps> = ({ media }) => {
    const [pageForm, setPageForm] = useState<PageForm>({
        title: '',
        meta_title: '',
        meta_description: '',
    });

    const [pageSections, setPageSections] = useState<PageSection[]>([]);
    const [selectedSectionIndex, setSelectedSectionIndex] = useState<number | null>(null);
    const [mediaModalOpen, setMediaModalOpen] = useState(false);
    const [errors, setErrors] = useState<any>({});

    // --- Create Page Submit ---
    const handlePageSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(
            `/admin/pages`,
            {
                ...pageForm,
                sections: pageSections.map((s, idx) => ({
                    id: s.id,
                    heading: s.heading || '',
                    sub_heading: s.sub_heading || '',
                    button_text: s.button_text || '',
                    button_link: s.button_link || '',
                    content: s.content || '',
                    json_array: s.json_array || '',
                    gallery: Array.isArray(s.gallery) ? s.gallery : [],
                    media_id: s.media_id || null,
                    sort_order: s.sort_order ?? idx + 1,
                })),
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    toast.success('Page created successfully.');
                    router.visit('/admin/pages');
                },
                onError: (err) => {
                    const newErrors: any = {};

                    // Page-level errors
                    if (err.title) newErrors.title = err.title;
                    if (err.meta_title) newErrors.meta_title = err.meta_title;
                    if (err.meta_description) newErrors.meta_description = err.meta_description;

                    // Section-level errors
                    if (err.sections) {
                        newErrors.sections = {};
                        Object.keys(err.sections).forEach((key) => {
                            const idxMatch = key.match(/^sections\.(\d+)\.(.+)$/);
                            if (idxMatch) {
                                const idx = parseInt(idxMatch[1], 10);
                                const field = idxMatch[2];
                                if (!newErrors.sections[idx]) newErrors.sections[idx] = {};
                                newErrors.sections[idx][field] = err.sections[key];
                            }
                        });
                    }

                    setErrors(newErrors);
                },
            },
        );
    };

    // --- Section Handlers ---
    const addSection = () => {
        setPageSections((prev) => [
            ...prev,
            {
                id: null,
                heading: '',
                sub_heading: '',
                button_text: '',
                button_link: '',
                content: '',
                gallery: [],
                media_id: null,
                media: null,
                content_type: 'custom_html',
                sort_order: prev.length + 1,
            },
        ]);
    };

    const updateSectionField = (index: number, keyOrFields: keyof PageSection | Record<string, any>, value?: any) => {
        setPageSections((prev) => {
            const updated = [...prev];
            if (typeof keyOrFields === 'string') {
                updated[index] = { ...updated[index], [keyOrFields]: value };
            } else {
                updated[index] = { ...updated[index], ...keyOrFields };
            }
            return updated;
        });
    };

    const removeSection = (index: number) => {
        const isDark = document.documentElement.classList.contains('dark');

        Swal.fire({
            title: 'Are you sure?',
            text: 'This section will be removed.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: isDark ? '#ef4444' : '#d33',
            cancelButtonColor: isDark ? '#3b82f6' : '#3085d6',
            background: isDark ? '#1f2937' : '#fff',
            color: isDark ? '#f9fafb' : '#111827',
            confirmButtonText: 'Yes, remove it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setPageSections((prev) => {
                    const updated = [...prev];
                    updated.splice(index, 1);
                    return updated;
                });
            }
        });
    };

    const openMediaModal = (sectionIndex: number) => {
        setSelectedSectionIndex(sectionIndex);
        setMediaModalOpen(true);
    };

    const handleMediaSelect = (mediaItem: Media) => {
        if (selectedSectionIndex !== null) {
            updateSectionField(selectedSectionIndex, {
                media: mediaItem,
                media_id: mediaItem.id,
            });
        }
        setMediaModalOpen(false);
        setSelectedSectionIndex(null);
    };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Pages', href: '/admin/pages' },
        { title: `Create Page`, href: '' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Page" />
            <div className="h-[calc(100vh-100px)] space-y-8 overflow-auto p-6">
                {/* --- Page Metadata --- */}
                <HeadingSmall title="Create Page" description="Add page title, meta title, and meta description" />

                <form onSubmit={handlePageSubmit} className="w-full md:w-4xl">
                    <div className="space-y-6 rounded-lg border bg-white p-6 md:w-4xl dark:bg-gray-900">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    value={pageForm.title}
                                    onChange={(e) => setPageForm({ ...pageForm, title: e.target.value })}
                                    placeholder="Page title"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="meta_title">Meta Title</Label>
                                <Input
                                    id="meta_title"
                                    type="text"
                                    value={pageForm.meta_title || ''}
                                    onChange={(e) => setPageForm({ ...pageForm, meta_title: e.target.value })}
                                    placeholder="Meta title"
                                />
                                <InputError message={errors.meta_title} />
                            </div>

                            <div className="flex flex-col gap-2 md:col-span-3">
                                <Label htmlFor="meta_description">Meta Description</Label>
                                <Textarea
                                    id="meta_description"
                                    value={pageForm.meta_description || ''}
                                    onChange={(e) => setPageForm({ ...pageForm, meta_description: e.target.value })}
                                    rows={3}
                                />
                                <InputError message={errors.meta_description} />
                            </div>
                        </div>
                    </div>

                    {/* --- Page Sections --- */}
                    <div className="mt-6 space-y-6">
                        <HeadingSmall title="Page Sections" description="Add or remove page sections" />
                        {pageSections.map((section, index) => (
                            <div key={index} className="space-y-6 rounded-lg border bg-white p-6 dark:bg-gray-900">
                                <div className="flex items-center justify-between">
                                    <HeadingSmall title={`Section ${index + 1}`} description="Edit section details" />
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                type="button"
                                                onClick={() => removeSection(index)}
                                                variant="outline"
                                                className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Remove Section</TooltipContent>
                                    </Tooltip>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <Label>Heading</Label>
                                        <Input
                                            type="text"
                                            value={section.heading || ''}
                                            onChange={(e) => updateSectionField(index, 'heading', e.target.value)}
                                            placeholder="Heading"
                                        />
                                        <InputError message={errors.sections?.[index]?.heading} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>Sub Heading</Label>
                                        <Input
                                            type="text"
                                            value={section.sub_heading || ''}
                                            onChange={(e) => updateSectionField(index, 'sub_heading', e.target.value)}
                                            placeholder="Sub Heading"
                                        />
                                        <InputError message={errors.sections?.[index]?.sub_heading} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>Button Text</Label>
                                        <Input
                                            type="text"
                                            value={section.button_text || ''}
                                            onChange={(e) => updateSectionField(index, 'button_text', e.target.value)}
                                            placeholder="Button Text"
                                        />
                                        <InputError message={errors.sections?.[index]?.button_text} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <Label>Button Link</Label>
                                        <Input
                                            type="text"
                                            value={section.button_link || ''}
                                            onChange={(e) => updateSectionField(index, 'button_link', e.target.value)}
                                            placeholder="Button Link"
                                        />
                                        <InputError message={errors.sections?.[index]?.button_link} />
                                    </div>
                                </div>

                                <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <Label>Sort Order</Label>
                                        <Input
                                            type="number"
                                            value={section.sort_order || 0}
                                            onChange={(e) => updateSectionField(index, 'sort_order', parseInt(e.target.value, 10))}
                                        />
                                        <InputError message={errors.sections?.[index]?.sort_order} />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <Label>Json Array</Label>
                                    <Textarea
                                        rows={5}
                                        value={section.json_array || ''}
                                        onChange={(e) => updateSectionField(index, 'json_array', e.target.value)}
                                        placeholder='[{"title":"", "subtitle":"", "image":"", "icon":"", "question":"", "answer":""}]'
                                    />

                                    <InputError message={errors.sections?.[index]?.json_array} />
                                </div>

                                <div className="mt-2">
                                    <Label>Content</Label>
                                    <CKEditor
                                        editor={ClassicEditor as any}
                                        data={section.content || ''}
                                        onChange={(_, editor) => updateSectionField(index, 'content', editor.getData())}
                                    />

                                    <InputError message={errors.sections?.[index]?.content} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label>Gallery URLs (comma separated)</Label>
                                    <Input
                                        type="text"
                                        value={Array.isArray(section.gallery) ? section.gallery.join(',') : ''}
                                        onChange={(e) => updateSectionField(index, 'gallery', e.target.value.split(','))}
                                    />
                                    <InputError message={errors.sections?.[index]?.gallery} />
                                </div>

                                <div className="mt-2 flex flex-col">
                                    <MediaSelector
                                        media={section.media}
                                        onSelect={() => openMediaModal(index)}
                                        onRemove={() => updateSectionField(index, { media: null, media_id: null })}
                                    />
                                    <InputError message={errors.sections?.[index]?.media_id} />
                                </div>
                            </div>
                        ))}
                        <Button type="button" onClick={addSection} variant="outline" className="flex items-center gap-2">
                            <PlusCircleIcon className="h-5 w-5" /> Add Section
                        </Button>

                        <div className="flex w-full gap-6">
                            <Button type="submit">Create Page</Button>
                        </div>
                    </div>
                </form>

                <MediaBrowserModal isOpen={mediaModalOpen} onClose={() => setMediaModalOpen(false)} media={media} onSelect={handleMediaSelect} />
            </div>
        </AppLayout>
    );
};

export default Create;
