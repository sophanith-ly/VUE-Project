import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'admin-lte/dist/js/adminlte.min.js';


import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js';

createApp(App).use(router).mount('#app')
