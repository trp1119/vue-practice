import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: '',
        redirect: '/chats'
      },
      {
        path: '/chats',
        name: 'chats',
        component: () => import('../views/Chats')
      },
      {
        path: '/contacts',
        name: 'contacts',
        component: () => import('../views/Contacts')
      },
      {
        path: '/discover',
        name: 'discover',
        component: () => import('../views/Discover')
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('../views/Me')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register')
  },
  {
    path: '/moments',
    name: 'moments',
    component: () => import('../views/Moments')
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import('../views/Publish')
  },
  {
    path: '/information',
    name: 'information',
    component: () => import('../views/Information')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/Chat')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.wxToken ? true : false
  if (to.path === '/login' || to.path === '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
