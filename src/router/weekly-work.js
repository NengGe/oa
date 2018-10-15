const weeklyWork = () => import(/* webpackChunkName: "dy-inform" */ '@/components/weekly-work/weeklyWork.vue')
const index = () => import(/* webpackChunkName: "dy-inform" */ '@/components/weekly-work/pages/index.vue')
const approve = () => import(/* webpackChunkName: "dy-inform" */ '@/components/weekly-work/pages/approve.vue')

export default [
  {
    path: '/weeklyWork',
    component: weeklyWork,
    meta: { title: '周工作' },
    children: [
      {
        path: '',
        name: 'weeklyWork_index',
        meta: { title: '周工作', zIndex: 1 },
        component: index
      },
      {
        path: 'approve',
        name: 'weeklyWork_approve',
        meta: { title: '周工作审核', zIndex: 2 },
        component: approve
      }
    ]
  }
]
