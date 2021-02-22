import { createWebHistory, createRouter } from "vue-router";
import POS from "@/components/POS.vue";
import Customer from "@/components/Customer.vue";

const routes = [
  {
    path: '/',
    name: 'POS',
    component: POS,
  },
  {
    path: '/Customer',
    name: 'Customer',
    component: Customer,
    props: true
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;