import AdminRoot from '@/views/AdminRoot'
import Login from '@/views/Login'

export default {
  path: '/admin',
  name: 'admin-root',
  component: AdminRoot,
  children: [
    {
      name: 'login',
      path: 'login',
      component: Login
    },
  ]
}