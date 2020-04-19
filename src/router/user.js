import BlogHome from '@/views/BlogHome.vue'
import UserRoot from '@/views/UserRoot'
import ArticleShow from '@/views/ArticleShow'
import AboutPage from '@/views/AboutPage'
import TagList from '@/views/TagList'
import TagShow from '@/views/TagShow'

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
  ]
}