import { createRouter, createWebHistory} from 'vue-router'
import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";

const routes = [
  { path: '/', redirect: '/login' }, // redirect หน้าแรก
  { path: '/login', component: Login ,name:"login"},
  { path: '/dashboard', component: Dashboard ,name:"dashboard"},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
