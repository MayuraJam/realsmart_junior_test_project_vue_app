import { createRouter, createWebHistory} from 'vue-router'
import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";

const routes = [
  { path: '/', redirect: '/login' }, // redirect หน้าแรก
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
