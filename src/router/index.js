import { createWebHistory, createRouter } from "vue-router";
import POS from "@/components/POS.vue";
import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
  {
    path: '/',
    name: 'POS',
    component: POS,
  },
  {
    path: '/Customer',
    name: 'HelloWorld',
    component: HelloWorld,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;