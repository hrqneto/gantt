import Empty from '@/layouts/Empty.vue'

const Login = () => import(/* webpackChunkName: "Login" */ './views/Login.vue')

export default {
  path: '/',
  component: Empty,
  children: [
    {
      name: 'Login',
      path: 'login',
      component: Login
    }
  ]
}
