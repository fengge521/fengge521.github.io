import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/'
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish'
import Image from '@/views/image'
import Comment from '@/views/comment'
import Setting from '@/views/settings'
import Fan from '@/views/fans'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '', // path 为空，会作为默认子路由渲染
        // 路由的名字是干啥的？
        // 参考：https://gitee.com/lipengzhou/toutiao-publish-admin/issues/I1F1BA
        name: 'home',
        component: Home
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/image',
        name: 'image',
        component: Image
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      },
      {
        path: '/settings',
        name: 'settings',
        component: Setting
      },
      {
        path: '/fans',
        name: 'fans',
        component: Fan
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()

  const user = JSON.parse(window.localStorage.getItem('user'))

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})
export default router
