const Statistics = () => import(/* webpackChunkName: "statistics" */ '@/components/statistics/Statistics')
const StatisticsIndex = () => import(/* webpackChunkName: "statistics" */ '@/components/statistics/pages/Index.vue')
const Attendance = () => import(/* webpackChunkName: "statistics" */ '@/components/statistics/pages/Attendance')
const AttendanceMonth = () => import(/* webpackChunkName: "statistics" */ '@/components/statistics/pages/AttendanceMonth')
const MoralEducation = () => import(/* webpackChunkName: "statistics" */ '@/components/statistics/pages/MoralEducation')
// const Appeal = () => import(/* webpackChunkName: "statistics" */ '@/components/statistics/pages/Appeal.vue')
// const ClockHistory = () => import(/* webpackChunkName: "statistics" */ '@/components/statistics/pages/ClockHistory.vue')
// const AssetsList = () => import(/* webpackChunkName: "assets-manage" */ '@/components/assets-manage/pages/List.vue') appeal

export default [
  {
    path: '/statistics',
    component: Statistics,
    children: [
      {
        path: '',
        name: 'statIndex',
        meta: {title: '统计'},
        component: StatisticsIndex
      },
      // {
      //   path: 'appeal',
      //   name: 'appeal',
      //   meta: {title: '申述'},
      //   component: Appeal
      // },
      {
        path: 'attendance',
        name: 'attendance',
        meta: {title: '日统计', zIndex: 1},
        component: Attendance
      },
      {
        path: 'attendancemonth',
        name: 'attendanceMonth',
        meta: {title: '月统计', zIndex: 2},
        component: AttendanceMonth
      },
      {
        path: 'moralEducation',
        name: 'moralEducation',
        meta: {title: '德育统计'},
        component: MoralEducation
      }
      // {
      //   path: 'clockHistory',
      //   name: 'clockHistory',
      //   meta: {title: '打卡历史'},
      //   component: ClockHistory
      // }
    ]
  }
]
