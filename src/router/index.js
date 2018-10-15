const HomePage = () => import(/* webpackChunkName: "index" */ '@/components/index/homePage')
const Index = () => import(/* webpackChunkName: "index" */ '@/components/index/pages/Index')
const Login = () => import(/* webpackChunkName: "index" */ '@/components/index/pages/Login')
const Whole = () => import(/* webpackChunkName: "index" */ '@/components/index/pages/Whole')
const sysMsgList = () => import(/* webpackChunkName: "index" */ '@/components/index/pages/sysMsgList')
const Personal = () => import(/* webpackChunkName: "index" */ '@/components/index/pages/Personal')

export default [
  {
    path: '/',
    // name: 'home',
    component: HomePage,
    children: [
      {
        path: '',
        name: 'index',
        meta: { keepAlive: true, title: '移动OA' },
        component: Index
      },
      {
        path: 'login',
        name: 'login',
        meta: { title: '登录' },
        component: Login
      },
      {
        path: 'whole',
        name: 'whole',
        meta: { title: '全部应用' },
        component: Whole
      },
      {
        path: 'sysMsgList',
        name: 'sysMsgList',
        meta: { title: '系统消息' },
        component: sysMsgList
      },
      {
        path: 'personal',
        name: 'personal',
        meta: { title: '个人中心' },
        component: Personal
      }
    ]
  }
]
