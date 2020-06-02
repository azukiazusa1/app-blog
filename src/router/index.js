import Vue from 'vue'
import VueRouter from 'vue-router'
import VueGtag from 'vue-gtag'
import User from './user'
import Admin from './admin'
import Login from '@/views/Login'
import NotFound from '@/views/NotFound'
import { auth } from '@/plugins/auth'

Vue.use(VueRouter)

const routes = [User, Admin,
  {
    name: 'login',
    path: '/admin/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      auth().then(user => {
        // すでにログイン済
        if (user) {
          next({ path: '/admin' })
        } else {
          next()
        }
      })
    }
  },
  {
    name: 'not-found',
    path: '/*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes
})

if (process.env.NODE_ENV === 'production') {
  // トラッキング
  Vue.use(VueGtag, {
    config: { id: process.env.VUE_APP_MEASUREMENTID }
  }, router)
}

export default router
