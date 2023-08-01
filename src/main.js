import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import router from './routers'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
app.use(router)
app.use(Antd)
app.use(VueAxios, axios)
Promise.all([
    import("./utils/toast"),
])
    .then(([{ Toast, options }]) => {
        app.use(Toast, options);
    })
    .then(() => {
        app.mount("#app");
    });
