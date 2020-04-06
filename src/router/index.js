import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogHome from '@/views/BlogHome.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'blog-home',
    component: BlogHome
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
