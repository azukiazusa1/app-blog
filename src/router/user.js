import BlogHome from '@/views/BlogHome.vue'
import UserRoot from '@/views/UserRoot'
import ArticleShow from '@/views/ArticleShow'

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
    }
  ]
}