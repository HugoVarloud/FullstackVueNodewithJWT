import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
// import Home from '../views/Home.vue'
import Profil from '../views/Dashboard.vue'
import Register from '../components/register.vue'
import Login from '../components/login.vue'
import Challenge from '../views/Challenge.vue'

Vue.use(Vuex)
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/inscription',
    name: 'Register',
    component: Register
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/challenge',
    name: 'Challenge',
    component: Challenge
  },
  {
    path: '*',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/inscription'];
  const authRequired = !publicPages.includes(to.path);
  const token = localStorage.getItem('auth-token');

  // redirect to login page if trying to access a restricted page
  if (authRequired && !token) {
    next('/');
  } else {
    next();
  }
});

export default router
