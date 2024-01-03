import { createRouter, createWebHistory } from 'vue-router'
import LayoutMain from '../components/layout/LayoutMain.vue'
import Error from '../views/Error.vue'
import Home from '../views/Home.vue'
import Gryffindor from '../views/Gryffindor.vue'
import CharacterDetails from '../views/CharacterDetails.vue'

const mainRoutes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: Home,
  },
  {
    path: '/gryffindor',
    name: 'Gryffindor',
    props: true,
    component: Gryffindor,
  },
  {
    path: '/character/:characterId',
    name: 'CharacterDetails',
    props: true,
    component: CharacterDetails,
  },
]

const routes = [
  {
    path: '/error',
    alias: '/:pathMatch(.*)*',
    name: 'Error',
    props: true,
    component: Error,
  },
  {
    path: '/',
    component: LayoutMain,
    children: mainRoutes,
  },
]

export default function initializeRouter(app) {
  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  app.use(router)

  return router
}
