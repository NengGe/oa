const Task = () => import(/* webpackChunkName: "task" */ '@/components/task/Task.vue')
const dealwith = () => import(/* webpackChunkName: "task" */ '@/components/task/pages/dealwith.vue')
const newtask = () => import(/* webpackChunkName: "task" */ '@/components/task/pages/newtask.vue')
const copysend = () => import(/* webpackChunkName: "task" */ '@/components/task/pages/copysend.vue')
const sponsor = () => import(/* webpackChunkName: "task" */ '@/components/task/pages/sponsor.vue')
const detail = () => import(/* webpackChunkName: "task" */ '@/components/task/pages/detail.vue')
const excuStatus = () => import(/* webpackChunkName: "task" */ '@/components/task/pages/excuStatus.vue')
const finish = () => import(/* webpackChunkName: "task" */ '@/components/task/pages/finish.vue')

// const InformDetail = () => import(/* webpackChunkName: "task" */ '@/components/task/pages/informDetail.vue')

export default [
  {
    path: '/task',
    component: Task,
    children: [
      {
        path: '',
        name: 'dealwith',
        meta: { title: '任务' },
        component: dealwith,
        children: [
          {
            path: 'detail/:id/:state',
            name: 'detail_dealwith',
            meta: { title: '任务详情' },
            component: detail
          }
        ]
      },
      {
        path: 'sponsor',
        name: 'sponsor',
        meta: { title: '任务', zIndex: 1 },
        component: sponsor,
        children: [
          {
            path: 'detail/:id',
            name: 'detail_sponsor',
            meta: { title: '任务详情' },
            component: detail
          }
        ]
      },
      {
        path: 'copysend',
        name: 'copysend',
        meta: { title: '任务', zIndex: 2 },
        component: copysend,
        children: [
          {
            path: 'detail/:id',
            name: 'detail_copysend',
            meta: { title: '任务详情' },
            component: detail
          }
        ]
      },
      {
        path: 'newtask',
        name: 'newtask',
        meta: { title: '新建任务', zIndex: 3 },
        component: newtask
      },
      {
        path: 'edittask/:id',
        name: 'edittask',
        meta: { title: '编辑任务', zIndex: 3 },
        component: newtask
      },
      {
        path: 'newchildtask/:id',
        name: 'newchildtask',
        meta: { title: '新建子任务', zIndex: 3 },
        component: newtask
      },
      {
        path: 'excustatus/:id',
        name: 'excuStatus',
        meta: { title: '完成情况', zIndex: 3 },
        component: excuStatus
      },
      {
        path: 'finish/:id/:currExeId',
        name: 'finish',
        meta: { title: '完成情况', zIndex: 3 },
        component: finish
      }
    ]
  }
]
