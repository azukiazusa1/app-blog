import AdminRoot from '@/views/AdminRoot'
import { auth } from '@/plugins/auth'
import AdminHome from '@/views/Admin/AdminHome'
import ArticleEdit from '@/views/Admin/ArticleEdit'

export default {
  path: '/admin',
  name: 'admin-root',
  component: AdminRoot,
  beforeEnter: ((to, from, next) => {
    auth().then(user => {
      if (!user) {
        next({ path: '/admin/login', query: { redirect: to.fullPath }})
      } else {
        next()
      }
    })
  }),
  children: [
    {
      path: '/',
      name: 'admin-home',
      component: AdminHome
    },
    {
      path: '/article/edit/:id',
      name: 'article-edit',
      component: ArticleEdit
    }
  ]
}