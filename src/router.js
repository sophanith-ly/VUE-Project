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
        component: SignIn
    },
    {
        path: '/signUp',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/signOut',
        name: 'SignOut',
        component: SignOut
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        components: {
            Navbar: Navbar,
            Sidebar: Sidebar,
            ControlSidebar: ControlSidebar,
            Footer: Footer,
            default: Dashboard
        }
    },
    {
        path: '/profile',
        name: 'Profile',
        components: {
            Navbar: Navbar,
            Sidebar: Sidebar,
            ControlSidebar: ControlSidebar,
            Footer: Footer,
            default: Profile
        }
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