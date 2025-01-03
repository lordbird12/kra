/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
const storedPermission = JSON.parse(localStorage.getItem('permission'));
export const defaultNavigation: FuseNavigationItem[] = [
    // {
    //     id: 'admin',
    //     title: 'จัดการระบบ',
    //     subtitle: 'ขัอมูลเกี่ยวกับระบบ',
    //     type: 'group',
    //     icon: 'heroicons_outline:home',
    //     hidden: () => {
    //         // const storedPermission = JSON.parse(localStorage.getItem('permission'));
    //         const menu = storedPermission?.find((e) => e.menu_id == 1);
    //         if (menu?.view == 0) {
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     },
    //     children: [

    //         {
    //             id: 'admin.department',
    //             title: 'แผนกงาน',
    //             type: 'basic',
    //             icon: 'heroicons_outline:list-bullet',
    //             link: '/admin/department/list',
    //         },
    //         {
    //             id: 'admin.position',
    //             title: 'ตำแหน่งงาน',
    //             type: 'basic',
    //             icon: 'heroicons_outline:list-bullet',
    //             link: '/admin/position/list',
    //         },
    //         {
    //             id: 'admin.employee',
    //             title: 'ข้อมูลพนักงาน',
    //             type: 'basic',
    //             icon: 'heroicons_outline:list-bullet',
    //             link: '/admin/employee/list',
    //         },
    //     ],
    // },


    // {
    //     id: 'apps',
    //     title: 'จัดการโปรแกรมระบบ',
    //     subtitle: 'ขัอมูลเกี่ยวกับระบบ',
    //     type: 'group',
    //     icon: 'heroicons_outline:home',
    //     children: [
    //         {
    //             id: 'apps.report',
    //             title: 'รายงาน',
    //             type: 'collapsable',
    //             icon: 'heroicons_outline:document-text',
    //             children: [
    //                 {
    //                     id: 'apps.report.stock-vat',
    //                     title: 'สต๊อครวมภาษี',
    //                     type: 'basic',
    //                     link: '/admin/report-stock-vat/list',
    //                     exactMatch: true,
    //                 },
    //                 {
    //                     id: 'apps.report.stock-card',
    //                     title: 'สินค้าคงเหลือ',
    //                     type: 'basic',
    //                     link: '/admin/report-stock-card/list',
    //                     exactMatch: true,
    //                 },
    //             ],
    //         },
    //         // {
    //         //     id: 'apps.file-manager',
    //         //     title: 'ไฟล์เอกสาร',
    //         //     type: 'basic',
    //         //     icon: 'heroicons_outline:cloud',
    //         //     link: '/apps/file-manager',
    //         // },
    //         // {
    //         //     id: 'apps.help-center',
    //         //     title: 'ศูนย์ช่วยเหลือ',
    //         //     type: 'collapsable',
    //         //     icon: 'heroicons_outline:information-circle',
    //         //     link: '/apps/help-center',
    //         //     children: [
    //         //         {
    //         //             id: 'apps.help-center.home',
    //         //             title: 'Home',
    //         //             type: 'basic',
    //         //             link: '/apps/help-center',
    //         //             exactMatch: true,
    //         //         },
    //         //         {
    //         //             id: 'apps.help-center.faqs',
    //         //             title: 'FAQs',
    //         //             type: 'basic',
    //         //             link: '/apps/help-center/faqs',
    //         //         },
    //         //         {
    //         //             id: 'apps.help-center.guides',
    //         //             title: 'Guides',
    //         //             type: 'basic',
    //         //             link: '/apps/help-center/guides',
    //         //         },
    //         //         {
    //         //             id: 'apps.help-center.support',
    //         //             title: 'Support',
    //         //             type: 'basic',
    //         //             link: '/apps/help-center/support',
    //         //         },
    //         //     ],
    //         // },
    //         // {
    //         //     id: 'apps.mailbox',
    //         //     title: 'กล่องจดหมาย',
    //         //     type: 'basic',
    //         //     icon: 'heroicons_outline:envelope',
    //         //     link: '/apps/mailbox',
    //         //     badge: {
    //         //         title: '27',
    //         //         classes: 'px-2 bg-pink-600 text-white rounded-full',
    //         //     },
    //         // },
    //     ],
    // },
    {
        id: 'products',
        title: 'จัดการประเภทรายการ',
        subtitle: 'ขัอมูลเกี่ยวกับระบบ',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'products.banner',
                title: 'ประเภทแบนเนอร์',
                type: 'basic',
                icon: 'heroicons_outline:cube',
                link: '/admin/banner/list',
            },
            {
                id: 'products.category-item',
                title: 'ประเภทหน้าเว็บเพจ',
                type: 'basic',
                icon: 'heroicons_outline:cube',
                link: '/admin/category-item/list',
            },
            {
                id: 'products.product',
                title: 'หน้าเว็บเพจ',
                type: 'basic',
                icon: 'heroicons_outline:cube',
                link: '/admin/order/list',
            },
            {
                id: 'products.category-game',
                title: 'ประเภท Game',
                type: 'basic',
                icon: 'heroicons_outline:wrench-screwdriver',
                link: '/admin/category-game/list',
            },
            {
                id: 'game.list',
                title: 'Game',
                type: 'basic',
                icon: 'heroicons_outline:puzzle-piece',
                link: '/admin/game/list',
            },
            {
                id: 'admin.contact',
                title: 'ติดต่อเรา',
                type: 'basic',
                icon: 'heroicons_outline:phone-arrow-down-left',
                link: '/admin/contact/form',
            },
        ],
    },
    {
        id: 'self',
        title: 'ส่วนตัว',
        subtitle: 'จัดการโปรไฟล์',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                id: 'admin.activity',
                title: 'ประวัติการใช้งาน',
                type: 'basic',
                icon: 'heroicons_outline:clock',
                link: '/admin/activity/list',
            },
            {
                id: 'admin.logout',
                title: 'ออกจากระบบ',
                type: 'basic',
                icon: 'heroicons_outline:arrow-left-on-rectangle',
                link: '/sign-out',
            },
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        tooltip: 'Dashboards',
        type: 'aside',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        tooltip: 'Apps',
        type: 'aside',
        icon: 'heroicons_outline:qr-code',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        tooltip: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        tooltip: 'UI',
        type: 'aside',
        icon: 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation',
        tooltip: 'Navigation',
        type: 'aside',
        icon: 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'APPS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'others',
        title: 'OTHERS',
        type: 'group',
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'User Interface',
        type: 'aside',
        icon: 'heroicons_outline:rectangle-stack',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation Features',
        type: 'aside',
        icon: 'heroicons_outline:bars-3',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'แดชบอร์ด',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id: 'apps',
    //     title: 'Apps',
    //     type: 'group',
    //     icon: 'heroicons_outline:qr-code',
    //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id: 'pages',
    //     title: 'Pages',
    //     type: 'group',
    //     icon: 'heroicons_outline:document-duplicate',
    //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id: 'user-interface',
    //     title: 'UI',
    //     type: 'group',
    //     icon: 'heroicons_outline:rectangle-stack',
    //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    // {
    //     id: 'navigation-features',
    //     title: 'Misc',
    //     type: 'group',
    //     icon: 'heroicons_outline:bars-3',
    //     children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id: 'purchase',
        title: 'ซื้อ',
        type: 'group',
        icon: 'heroicons_outline:inbox-arrow-down',
        children: [],
    },
    {
        id: 'sale',
        title: 'ขาย',
        type: 'group',
        icon: 'heroicons_outline:shopping-cart',
        children: [],
    },
    {
        id: 'inventory',
        title: 'คลังสินค้า',
        type: 'group',
        icon: 'heroicons_outline:cube',
        children: [],
    },
    {
        id: 'accounting',
        title: 'บัญชี/การเงิน',
        type: 'group',
        icon: 'heroicons_outline:users',
        children: [],
    },
    {
        id: 'delivery-workers',
        title: 'คนส่งของ',
        type: 'group',
        icon: 'heroicons_outline:users',
        children: [],
    },
    {
        id: 'admin',
        title: 'จัดการพนักงาน',
        type: 'group',
        icon: 'heroicons_outline:users',
        children: [],
    },
    {
        id: 'reports',
        title: 'รายงาน',
        type: 'group',
        icon: 'heroicons_outline:clipboard-document-list',
        children: [],
    },
];
