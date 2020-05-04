import Empty from '@/layouts/Empty.vue'

const Dashboard = () => import(/* webpackChunkName: "Dashboard" */ './views/Dashboard.vue')

export default {
  path: '/dashboard',
  component: Empty,
  children: [
    {
      name: 'Dashboard',
      path: '',
      component: Dashboard
    }
  ]
}
