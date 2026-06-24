import SignIn from '@/components/auth/SignIn.vue';
import SignUp from '@/components/auth/SignUp.vue';
import SignOut from '@/components/auth/SignOut.vue';    
import Dashboard from '@/components/pages/Dashboard.vue';
import Profile from '@/components/auth/Profile.vue';

import Navbar from '@/components/includes/Navbar.vue';
import Sidebar from '@/components/includes/Sidebar.vue';
import ControlSidebar from '@/components/includes/Controlsidebar.vue';
import Footer from '@/components/includes/Footer.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'SignIn',
        component: SignIn,
        meta: { requiresGuest: true }
    },
    {
        path: '/signUp',
        name: 'SignUp',
        component: SignUp,
        meta: { requiresGuest: true }
    },
    {
        path: '/signOut',
        name: 'SignOut',
        component: SignOut,
        meta: { requiresAuth: true }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        components: {
            Navbar: Navbar,
            Sidebar: Sidebar,
            ControlSidebar: ControlSidebar,
            Footer: Footer,
            default: Dashboard,
        },
        meta: { requiresAuth: true }
    },
    {
        path: '/profile',
        name: 'Profile',
        components: {
            Navbar: Navbar,
            Sidebar: Sidebar,
            ControlSidebar: ControlSidebar,
            Footer: Footer,
            default: Profile,
        },
        meta: { requiresAuth: true }
    },
    {
        path: '/:about(.*)*',
        redirect: { name: 'SignIn' }
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes: routes
});
export default router; 