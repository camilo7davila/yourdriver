import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'Main screen',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/dashboard/dashboard1',
    title: 'Dashboard',
    icon: 'icon-Car-Wheel',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Tables',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '',
    title: 'People',
    icon: 'mdi mdi-account',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/tables/usertable',
        title: 'Users table',
        icon: 'icon-Receipt-4',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/drivertable',
        title: 'Drivers table',
        icon: 'icon-Receipt-4',
        class: '',
        extralink: false,
        submenu: []
      },
    ]
  },

  {
    path: '',
    title: 'Trips',
    icon: 'mdi mdi-airplane',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/tables/historytripstable',
        title: 'History trips table',
        icon: 'icon-Receipt-4',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/canceltriptable',
        title: 'Cancel Trips By Drivers',
        icon: 'icon-Receipt-4',
        class: '',
        extralink: false,
        submenu: []
      },
      {
        path: '/tables/cancelusertriptable',
        title: 'Cancel Trips By Passengers',
        icon: 'icon-Receipt-4',
        class: '',
        extralink: false,
        submenu: []
      }
    ]
  },
  {
    path: '',
    title: 'management',
    icon: 'mdi mdi-access-point',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/tables/pendingdriverstrable',
        title: 'Pending Drivers table',
        icon: 'icon-Receipt-4',
        class: '',
        extralink: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Apps',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/apps/email',
    title: 'Email',
    icon: 'icon-Mailbox-Empty',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/apps/messaging',
    title: 'Messaging',
    icon: 'mdi mdi-message',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Maps',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/maps/google',
    title: 'Google Maps',
    icon: 'icon-Location-2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '',
    title: 'Pages',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '',
    title: 'Authentication',
    icon: 'icon-Administrator',
    class: 'has-arrow',
    extralink: false,
    submenu: [
      {
        path: '/authentication/signup',
        title: 'Register',
        icon: '',
        class: '',
        extralink: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Tariffs',
    icon: 'mdi mdi-dots-horizontal',
    class: 'nav-small-cap',
    extralink: true,
    submenu: []
  },
  {
    path: '/apps/tariff',
    title: 'Form',
    icon: 'icon-Location-2',
    class: '',
    extralink: false,
    submenu: []
  },
];