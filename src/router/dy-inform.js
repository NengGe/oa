const inform = () => import(/* webpackChunkName: "dy-inform" */ '@/components/dy-inform/inform.vue')
const whole = () => import(/* webpackChunkName: "dy-inform" */ '@/components/dy-inform/pages/whole.vue')
const newBuild = () => import(/* webpackChunkName: "dy-inform" */ '@/components/dy-inform/pages/newBuild.vue')
const mySend = () => import(/* webpackChunkName: "dy-inform" */ '@/components/dy-inform/pages/mySend.vue')
const detail = () => import(/* webpackChunkName: "dy-inform" */ '@/components/dy-inform/pages/detail.vue')

export default [
  {
    path: '/dyinform',
    component: inform,
    meta: { title: '公告' },
    children: [
      {
        path: 'dyinformwhole',
        name: 'dy-inform-whole',
        meta: { title: '全部公告', zIndex: 1 },
        component: whole,
        children: [
          {
            path: 'detail/:id',
            name: 'detail-whole',
            meta: { title: '公告详情' },
            component: detail
          }
        ]
      },
      {
        path: 'newBuild',
        name: 'newBuild',
        meta: { title: '添加公告', zIndex: 2 },
        component: newBuild
      },
      {
        path: 'mySend',
        name: 'dy-inform-mySend',
        meta: { title: '我添加的', zIndex: 3 },
        component: mySend,
        children: [
          {
            path: 'detail/:id',
            name: 'detail-mySend',
            meta: { title: '公告详情' },
            component: detail
          }
        ]
      }
    ]
  }
]
