import BlogHome from '@/views/BlogHome.vue'
import UserRoot from '@/views/UserRoot'
import ArticleShow from '@/views/ArticleShow'
import AboutPage from '@/views/AboutPage'
import TagList from '@/views/TagList'
import TagShow from '@/views/TagShow'
import ArchiveList from '@/views/ArchiveList'
import PrivacyPolicy from '@/views/PrivacyPolicy'

export default {
  path: '/',
  name: 'user-root',
  component: UserRoot,
  children: [
    {
      name: 'blog-home',
      path: '',
      component: BlogHome
    },
    {
      name: 'article-show',
      path: '/article/:id',
      component: ArticleShow
    },
    {
      name: 'about-page',
      path: '/about',
      component: AboutPage
    },
    {
      name: 'tag-list',
      path: '/tags',
      component: TagList
    },
    {
      name: 'tag-show',
      path: '/tags/:name',
      component: TagShow
    },
    {
      name: 'archive-list',
      path: '/archive/:date',
      component: ArchiveList,
      beforeEnter: (to, from, next) => {
        const d = new Date(to.params.date)
        if (d.toString() === 'Invalid Date') {
          next({ name: 'not-found' })
        } else {
          next()
        }
      }
    },
    {
      name: 'privacy-policy',
      path: '/privacy-policy',
      component: PrivacyPolicy
    }
  ]
}
