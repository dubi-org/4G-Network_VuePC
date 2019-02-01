import Main from '@/view/main'
import parentView from '@/components/main/parent-view'
// 页面
import Login from '@/view/login/login.vue'
import Home from '@/view/single-page/home'
import Lever1 from '@/view/error-network-log/level-1.vue'
import Lever2 from '@/view/error-network-log/network-log/network-log-1.vue'

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录'
    },
    component: Login
  },
  {
    path: '/',
    name: 'index',
    // redirect: '/home',
    component: Main,
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home
      },
      {
        path: 'error-network-log',
        name: 'error-network-log',
        component: parentView,
        children: [
          {
            path: 'level_1',
            name: 'level_1',
            component: Lever1
          },
          {
            path: 'level_2',
            name: 'level_2',
            component: parentView,
            children: [
              {
                path: 'level_2_1',
                name: 'level_2_1',
                component: Lever2
              }
            ]
          }
        ]
      }
    ]
  }
]
