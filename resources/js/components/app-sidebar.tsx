import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BadgeCheckIcon,
    BarcodeIcon,
    BellDotIcon,
    CalendarCheck2Icon,
    CalendarClockIcon,
    ContactRoundIcon,
    CreditCardIcon,
    GraduationCapIcon,
    HandPlatterIcon,
    HandshakeIcon,
    ImagePlusIcon,
    ImagesIcon,
    LayoutGrid,
    MapPinnedIcon,
    MedalIcon,
    NotebookIcon,
    PickaxeIcon,
    RssIcon,
    ShoppingBasketIcon,
    TagsIcon,
    Tally5Icon,
    TicketPercentIcon,
    TrophyIcon,
    UploadIcon,
    UserRoundCheckIcon,
    UsersRoundIcon,
    ViewIcon,
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Media',
        href: '/admin/media',
        icon: UploadIcon,
    },
    {
        title: 'Pages',
        href: '/admin/pages',
        icon: NotebookIcon,
    },
    {
        title: 'Hero Slides',
        href: '/admin/hero-sliders',
        icon: ImagesIcon,
    },
    {
        title: 'Categories',
        href: '/admin/categories',
        icon: TagsIcon,
    },

    {
        title: 'Services',
        href: '/admin/services',
        icon: HandPlatterIcon,
    },
    {
        title: 'Projects',
        href: '/admin/projects',
        icon: MedalIcon,
    },
    {
        title: 'Notices',
        href: '/admin/notices',
        icon: BellDotIcon,
    },
    {
        title: 'Galleries',
        href: '/admin/galleries',
        icon: ImagePlusIcon,
    },
    {
        title: 'Office Locations',
        href: '/admin/contacts',
        icon: MapPinnedIcon,
    },
    {
        title: 'Events',
        href: '/admin/events',
        icon: CalendarClockIcon,
    },
    {
        title: 'Partners',
        href: '/admin/partners',
        icon: HandshakeIcon,
    },
    {
        title: 'Awards',
        href: '/admin/awards',
        icon: TrophyIcon,
    },
    {
        title: 'Testimonials',
        href: '/admin/testimonials',
        icon: BadgeCheckIcon,
    },
    {
        title: 'Job Circulars',
        href: '/admin/careers',
        icon: PickaxeIcon,
    },
    {
        title: 'Job Applications',
        href: '/admin/job_applications',
        icon: ViewIcon,
    },
    {
        title: 'Teams',
        href: '/admin/teams',
        icon: ContactRoundIcon,
    },
    {
        title: 'Leaders',
        href: '/admin/students',
        icon: GraduationCapIcon,
    },
    {
        title: 'Students',
        href: '/admin/students',
        icon: GraduationCapIcon,
    },
    {
        title: 'Teachers',
        href: '/admin/students',
        icon: GraduationCapIcon,
    },
    {
        title: 'Articles',
        href: '/admin/articles',
        icon: RssIcon,
    },
    {
        title: 'Doctors',
        href: '/admin/students',
        icon: GraduationCapIcon,
    },
    {
        title: 'Appointments',
        href: '/admin/appointments',
        icon: CalendarCheck2Icon,
    },
    {
        title: 'Inventory Logs',
        href: '/admin/inventory_logs',
        icon: Tally5Icon,
    },
    {
        title: 'Products',
        href: '/admin/products',
        icon: BarcodeIcon,
    },
    {
        title: 'Orders',
        href: '/admin/orders',
        icon: ShoppingBasketIcon,
    },
    {
        title: 'Cupons',
        href: '/admin/cupons',
        icon: TicketPercentIcon,
    },
    {
        title: 'Payments',
        href: '/admin/payments',
        icon: CreditCardIcon,
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: UsersRoundIcon,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Developer Profile',
        href: 'https://www.linkedin.com/in/newton-mitro-24229311/',
        icon: UserRoundCheckIcon,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
