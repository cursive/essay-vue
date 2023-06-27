import { createRouter, createWebHashHistory } from 'vue-router'
import Review from '../views/ReviewView.vue'
import List from '../views/ListView.vue'

const routes = [
  {
    path: '/',
    name: 'list',
    component: List
  },
  {
    path: '/essay',
    name: 'essay',
    component: Review
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
