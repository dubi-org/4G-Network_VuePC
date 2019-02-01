import Main from '@/view/main'
// 页面
const Login = r => require.ensure([], () => r(require('@/view/login/login.vue')), 'Login')
const Home = r => require.ensure([], () => r(require('@/view/single-page/home')), 'Home')
// 子页面模块
// 4G网络日志模块
const NetworkAnalyze = r => require.ensure([], () => r(require('@/view/4G-analyze/network-analyze')), 'NetworkAnalyze')
const NetworkLog = r => require.ensure([], () => r(require('@/view/4G-analyze/network-log')), 'NetworkLog')
// 网络异常分析模块
const ErrorAnalyze = r => require.ensure([], () => r(require('@/view/network-error/analyze')), 'ErrorAnalyze')
const NetworkCalculate = r => require.ensure([], () => r(require('@/view/network-error/calculate')), 'NetworkCalculate')
// 投诉用户画像
const userPortrait = r => require.ensure([], () => r(require('@/view/complaint-user-portrait')), 'userPortrait')
export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: Login
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true
        },
        component: Home
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'ios-list-box-outline',
      title: '用户网络日志'
    },
    component: Main,
    children: [
      {
        path: 'network-analyze',
        name: 'network-analyze',
        meta: {
          icon: 'ios-people-outline',
          title: '用户4G上网'
        },
        component: NetworkLog
      },
      {
        path: 'network-log',
        name: 'network-log',
        meta: {
          icon: 'ios-pie-outline',
          title: '网络日志分析'
        },
        component: NetworkAnalyze
      }
    ]
  },
  {
    path: '/error-network',
    name: 'error-network',
    meta: {
      icon: 'md-funnel',
      title: '用户网络异常分析'
    },
    component: Main,
    children: [
      {
        path: 'error-analyze',
        name: 'error-analyze',
        meta: {
          icon: 'md-funnel',
          title: '异常分析'
        },
        component: ErrorAnalyze
      },
      {
        path: 'network-calculate',
        name: 'network-calculate',
        meta: {
          // access: ['super_admin'],
          icon: 'md-funnel',
          title: '流量使用预测'
        },
        component: NetworkCalculate
      }
    ]
  },
  {
    path: '/complaint',
    meta: {
      icon: 'md-funnel',
      showAlways: false
    },
    component: Main,
    children: [
      {
        path: 'userPortrait',
        name: 'userPortrait',
        meta: {
          icon: 'md-funnel',
          title: '投诉用户画像'
        },
        component: userPortrait
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: resolve => require(['@/view/error-page/401.vue'], resolve)
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: resolve => require(['@/view/error-page/500.vue'], resolve)
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: resolve => require(['@/view/error-page/404.vue'], resolve)
  }
]
