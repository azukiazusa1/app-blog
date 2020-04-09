import Vue from 'vue'
import VueRouter from 'vue-router'
import User from './user'
import Admin from './admin'

Vue.use(VueRouter)

const routes = [User, Admin]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
