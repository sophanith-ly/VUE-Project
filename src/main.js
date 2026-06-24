import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'admin-lte/dist/js/adminlte.min.js';


import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js';
import { useUserStore } from './stores/user';
import { apiVerify } from '@/functions/api/auth';
import { createPinia } from 'pinia';
import axios from 'axios';


const pinia = createPinia();

const app = createApp(App);
app.use(router);
app.use(pinia);


createApp(App).use(router).mount('#app')

const userStore = useUserStore();

axios.interceptors.request.use((config) => {
    const token = userStore.getSanctumToken();
    if (token && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

router.beforeEach(async (to, from, next) => {
    const { requiresAuth, requiresGuest } = to.meta;
    const userStore = useUserStore();

    // Verify user only if the auth state is not yet known
    if (requiresAuth && userStore.isAuthenticated === null) {
        try {
            const response = await apiVerify();
            userStore.setState(response.data.user);
        } catch (error) {
            userStore.reset();
        }
    }

    if (requiresAuth && !userStore.isAuthenticated) {
        next({ name: 'SignIn' });
    } else if (requiresGuest && userStore.isAuthenticated) {
        next({ name: 'Dashboard' });
    } else {
        next();
    }
});