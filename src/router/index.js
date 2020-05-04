import Vue from 'vue'
import VueRouter from 'vue-router'
import beforeEach from './beforeEach'
import { routes as app } from '../templates'

Vue.use(VueRouter)

const routes = [
  {
    name: 'app',
    path: '/'
  },
  ...app
]

const router = new VueRouter({
  routes
})

router.beforeEach(beforeEach)

export default router
