import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition){
    if(to.hash){
      return {
        el: to.hash,
      }
    }
    if(from){
      return ''
    }
    if(savedPosition){
      return ''
    }
  }
})

export default router
