import { createRouter, createWebHashHistory } from 'vue-router'
import Settings from '../views/Settings.vue'
import Play from '../views/Play.vue'

const routes = [
  {
    path: '/',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/play',
    name: 'Play',
	component: Play
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
