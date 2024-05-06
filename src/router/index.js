import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import TrackingView from '../views/TrackingView.vue'

import ConfigView from '../views/ConfigView.vue'
import ConfigGroupView from '../views/ConfigGroupView.vue'
import ConfigVehicleView from '../views/ConfigVehicleView.vue'
import ConfigOperatorView from '../views/ConfigOperatorView.vue'

import StatisticsView from '../views/StatisticsView.vue'
import StatisticsGraphicView from '../views/StatisticsGraphicView.vue'
import StatisticsDespatchView from '../views/StatisticsDespatchView.vue'
//import StatisticsRouteView from '../views/StatisticsRouteView.vue'
import RouteView from '../views/RouteView.vue'
import RouteTableView from '../views/RouteTableView'
import RouteGraphicView from '../views/RouteGraphicView'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/tracking',
    name: 'tracking',
    component: TrackingView,
  },
  {
    path: '/config',
    name: 'config',
    component: ConfigView,
    children: [
      {
        path: '',
        name: '',
        component: ConfigGroupView,
      },
      {
        path: 'groups',
        name: 'groups',
        component: ConfigGroupView,
      },
      {
        path: 'vehicles',
        name: 'vehicles',
        component: ConfigVehicleView,
      },
      {
        path: 'operators',
        name: 'operators',
        component: ConfigOperatorView,
      },
    ],
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: StatisticsView,
    children: [
      {
        path: '',
        name: '',
        component: StatisticsGraphicView,
      },
      {
        path: 'graphic',
        name: 'graphic',
        component: StatisticsGraphicView,
      },
      {
        path: 'despatch',
        name: 'despatch',
        component: StatisticsDespatchView,
      },
    ],
  },
  {
    path: '/routes',
    name: 'routes',
    component: RouteView,
    children: [
      {
        path: '',
        name: '',
        component: RouteTableView,
      },
      {
        path: 'routes-table',
        name: 'routes-table',
        component: RouteTableView,
      },
      {
        path: 'routes-graphic',
        name: 'routes-graphic',
        component: RouteGraphicView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
