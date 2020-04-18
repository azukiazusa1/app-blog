import AdminRoot from '@/views/AdminRoot'
import { auth } from '@/plugins/auth'
import AdminHome from '@/views/Admin/AdminHome'
import ArticleEdit from '@/views/Admin/ArticleEdit'
import ArticleList from '@/views/Admin/ArticleList'
import DraftList from '@/views/Admin/DraftList'
import AdminSetting from '@/views/Admin/AdminSetting'
import UserSetting from '@/views/Admin/UserSetting'

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
      path: '/admin',
      name: 'admin-home',
      component: AdminHome
    },
    {
      path: '/admin/article/edit/:id',
      name: 'article-edit',
      component: ArticleEdit
    },
    {
      path: '/admin/articles',
      name: 'article-list',
      component: ArticleList
    },
    {
      path: '/admin/drafts',
      name: 'draft-list',
      component: DraftList
    },
    {
      path: '/admin/setting',
      name: 'admin-setting',
      component: AdminSetting
    },
    {
      path: '/admin/user',
      name: 'user-setting',
      component: UserSetting
    },
  ]
}