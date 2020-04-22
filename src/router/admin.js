import AdminRoot from '@/views/AdminRoot'
import { auth } from '@/plugins/auth'
import store from '@/store'
import AdminHome from '@/views/Admin/AdminHome'
import ArticleEdit from '@/views/Admin/ArticleEdit'
import ArticleList from '@/views/Admin/ArticleList'
import DraftList from '@/views/Admin/DraftList'
import AdminTagList from '@/views/Admin/AdminTagList'
import TagEdit from '@/views/Admin/TagEdit'
import AdminSetting from '@/views/Admin/AdminSetting'
import UserSetting from '@/views/Admin/UserSetting'
import { isEmpty } from 'lodash'

export default {
  path: '/admin',
  name: 'admin-root',
  component: AdminRoot,
  beforeEnter: (async (to, from, next) => {
    const user = await auth()
    if (!user) {
      next({ path: '/admin/login', query: { redirect: to.fullPath }})
    } else {
      if (!isEmpty(store.getters['user/getUser'])) {
        next()
      } else {
        try {
          await store.dispatch('user/bindUserById', user.uid)
        } catch {
          store.commit('user/hasError')
        } finally {
          store.commit('user/loaded')
          next()
        }
      }
    }
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
      path: '/admin/tags',
      name: 'admin-tag-list',
      component: AdminTagList
    },
    {
      path: '/admin/tags/:name',
      name: 'tag-edit',
      component: TagEdit
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