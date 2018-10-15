const LeaveSchool = () => import(/* webpackChunkName: "attendance" */ '@/components/leave-school/LeaveSchool')
const LeaveSchoolIndex = () => import(/* webpackChunkName: "attendance" */ '@/components/leave-school/pages/index')

export default [
  {
    path: '/leaveschool',
    component: LeaveSchool,
    children: [
      {
        path: '',
        name: 'leaveSchoolIndex',
        meta: { title: '离校状态' },
        component: LeaveSchoolIndex
      }
    ]
  }
]
