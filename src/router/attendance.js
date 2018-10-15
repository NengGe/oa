const Attendance = () => import(/* webpackChunkName: "attendance" */ '@/components/attendance/Attendance')
const AttendanceIndex = () => import(/* webpackChunkName: "attendance" */ '@/components/attendance/pages/Index.vue')

const Appeal = () => import(/* webpackChunkName: "attendance" */ '@/components/attendance/pages/Appeal.vue')
const ClockHistory = () => import(/* webpackChunkName: "attendance" */ '@/components/attendance/pages/ClockHistory.vue')

export default [
  {
    path: '/attendance',
    component: Attendance,
    children: [
      {
        path: '',
        name: 'attendanceIndex',
        meta: {title: '考勤'},
        component: AttendanceIndex
      },
      {
        path: 'clockHistory',
        name: 'clockHistory',
        meta: {title: '考勤历史'},
        component: ClockHistory,
        children: [
          {
            path: 'appeal',
            name: 'appeal',
            meta: {title: '申诉'},
            component: Appeal
          }
        ]
      }
    ]
  }
]
