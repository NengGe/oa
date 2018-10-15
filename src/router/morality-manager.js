const teacherIndex = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/teacherIndex.vue')
const moralityShowIndex = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/moralityShowIndex.vue')
const schoolAppealIndex = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/appealDealWith.vue')
const behaviroEntryIndex = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/behaviorEntry.vue')
const schoolBehaviorIndex = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/schoolBehaviorDetails/schoolBehaviorIndex.vue')
const schoolEvaluationIndex = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/schoolEvaluation/schoolEvaluationIndex.vue')
const schoolStatisticIndex = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/schoolStatistic/schoolStatisticIndex.vue')
const schoolBehaviorDetails = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/schoolBehaviorDetails/schoolBehaviorDetails.vue')
const schoolBehaviorEdit = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/schoolBehaviorDetails/schoolBehaviorEdit.vue')
const acordClass = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/schoolStatistic/acordClass.vue')
const acordDormitory = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/schoolStatistic/acordDormitory.vue')
const acordSchoolSystem = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/schoolStatistic/acordSchoolSystem.vue')
// const schoolEntryDetails = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/schoolEntryDetails/schoolEntryDetails.vue')
const schoolEntryMore = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/schoolEntryDetails/more.vue')
// const schoolEntryBehaviorEdit = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/schoolEntryDetails/schoolEntryBehaviorEdit.vue')
const teacherSchoolactionDetails = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/teacher/schoolBehaviorDetails/detailsPage.vue')
const appealDetail = () => import(/* webpackChunkName: "morality-manager" */ '@/components/morality-manager/pages/appealDetail.vue')

const mobileArr = [
  {
    path: '/schoolTeacherIndex',
    // name: 'schoolTeacherIndex',
    meta: { title: '学校德育管理' },
    component: teacherIndex,
    children: [
      {
        path: 'moralityShowIndex',
        name: 'moralityShowIndex',
        component: moralityShowIndex,
        meta: { title: '学校德育管理' }
      },
      {
        path: '',
        redirect: 'moralityShowIndex'
      },
      {
        path: 'schoolAppealIndex', // 申诉
        name: 'schoolAppealIndex',
        meta: { title: '学校德育管理' },
        component: schoolAppealIndex,
        children: [
          {
            path: 'appealDetail/:id/:state',
            name: 'appealDetail',
            meta: { title: '学校德育管理' },
            component: appealDetail
          }
        ]
      },
      {
        path: 'behaviroEntryIndex/:type', // 行为录入
        name: 'behaviroEntryIndex',
        meta: { title: '学校德育管理' },
        component: behaviroEntryIndex
      },
      {
        path: 'schoolBehaviorIndex', // 学校行为详情
        name: 'schoolBehaviorIndex',
        meta: { title: '学校德育管理' },
        component: schoolBehaviorIndex
      },
      {
        path: 'schoolEvaluationIndex', // 学校行为评比
        name: 'schoolEvaluationIndex',
        component: schoolEvaluationIndex,
        meta: { title: '学校德育管理' }
      },
      {
        path: 'schoolStatisticIndex', // 学校行为统计
        // name: 'schoolStatisticIndex',
        component: schoolStatisticIndex,
        children: [
          {
            path: 'staAcordClass',
            name: 'staAcordClass',
            component: acordClass
          },
          {
            path: '',
            redirect: 'staAcordClass'
          },
          {
            path: 'acordDormitory',
            name: 'acordDormitory',
            component: acordDormitory
          },
          {
            path: 'acordSchoolSystem',
            name: 'acordSchoolSystem',
            component: acordSchoolSystem
          }
        ]
      },
      {
        path: 'schoolBehaviorDetails/:from',
        name: 'schoolBehaviorDetails',
        component: schoolBehaviorDetails,
        meta: { title: '学校德育管理' }
      },
      {
        path: 'schoolBehaviorEdit',
        name: 'schoolBehaviorEdit',
        component: schoolBehaviorEdit,
        meta: { title: '学校德育管理' }
      },
      {
        path: 'schoolEntryMore', // 更多行为
        name: 'schoolEntryMore',
        component: schoolEntryMore,
        meta: { title: '学校德育管理' }
      },
      {
        path: 'teacherSchoolactionDetails', // 学校行为编辑(班主任 科任老师)
        name: 'teacherSchoolactionDetails',
        component: teacherSchoolactionDetails,
        meta: { title: '学校德育管理' }
      }
    ]
  }
]
export default mobileArr
