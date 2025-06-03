import ChargingStation from '@/pages/ChargingStation.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Map from '@/pages/Map.vue'
import Signup from '@/pages/Signup.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/signup', name: 'Signup', component: Signup},
  { path: '/login', name: 'Login', component: Login },
  { path: '/map', name: 'Map', component: Map },
  { path: '/stations', name: 'ChargingStation', component: ChargingStation },
]

const router = createRouter({
  history: createWebHistory(), // use createWebHashHistory() for hash-based routing
  routes
})

export default router
