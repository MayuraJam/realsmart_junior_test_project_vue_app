import { createRouter, createWebHistory} from 'vue-router'
import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import ForgetPassword from './components/forgetPassword.vue';
import SetNewPassword from './components/SetNewPassword.vue';

const routes = [
  { path: '/login', component: Login ,name:"login"},
  { path: '/forgetpassword', component: ForgetPassword ,name:"forgetpassword"},
  { path: '/resetpassword', component: SetNewPassword ,name:"resetpassword"},
  { path: '/dashboard', component: Dashboard ,name:"dashboard"},
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
