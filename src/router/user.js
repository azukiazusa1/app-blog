import BlogHome from '@/views/BlogHome.vue'
import UserRoot from '@/views/UserRoot'

export default {
  path: '/',
  name: 'user-root',
  component: UserRoot,
  children: [
    {
      path: '',
      component: BlogHome
    },
  ]
}