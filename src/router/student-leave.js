const studentLeave = () => import(/* webpackChunkName: "studentLeave" */ '@/components/student-leave/studentLeave.vue')
const approval = () => import(/* webpackChunkName: "studentLeave" */ '@/components/student-leave/pages/approval.vue')
const newLeave = () => import(/* webpackChunkName: "studentLeave" */ '@/components/student-leave/pages/newLeave.vue')
const myLeave = () => import(/* webpackChunkName: "studentLeave" */ '@/components/student-leave/pages/myLeave.vue')
const schoolLeave = () => import(/* webpackChunkName: "studentLeave" */ '@/components/student-leave/pages/schoolLeave.vue')
const detail = () => import(/* webpackChunkName: "studentLeave" */ '@/components/student-leave/pages/detail.vue')

export default [
  {
    path: '/studentleave',
    name: 'studentLeave',
    component: studentLeave,
    meta: { title: '请假' },
    children: [
      {
        path: 'approval',
        name: 'approval',
        meta: { title: '请假审批', zIndex: 1 },
        component: approval,
        children: [
          {
            path: 'detail/:id',
            name: 'detailApproval',
            meta: { title: '请假详情' },
            component: detail
          }
        ]
      },
      {
        path: 'newleave',
        name: 'newLeave',
        meta: { title: '添加请假', zIndex: 2 },
        component: newLeave
      },
      {
        path: 'myleave',
        name: 'myLeave',
        meta: { title: '我添加的', zIndex: 3 },
        component: myLeave,
        children: [
          {
            path: 'detail/:id',
            name: 'detailMyLeave',
            meta: { title: '请假详情' },
            component: detail
          }
        ]
      },
      {
        path: 'schoolleave',
        name: 'schoolLeave',
        meta: { title: '全校请假', zIndex: 4 },
        component: schoolLeave,
        children: [
          {
            path: 'detail/:id',
            name: 'detailSchoolLeave',
            meta: { title: '请假详情' },
            component: detail
          }
        ]
      }
    ]
  }
]
