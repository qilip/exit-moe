import { createApp, h } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './index.css';

const routes = [
  { path: '/', component: () => import('./Home.vue') },
  {
    path: '/:slug',
    component: () => import('./Redirect.vue'),
    beforeEnter(to, from, next) {
      window.location.href = `https://api.exit.moe/${to.params.slug}`;
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
