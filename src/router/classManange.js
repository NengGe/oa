const index = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/index.vue')
const managerIndex = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/managerIndex.vue')
const entryIndex = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/entryBehavior/entryIndex.vue')
const acordObject = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/entryBehavior/acordObject.vue')
const statisticIndex = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/statistic/statisticIndex.vue')
const indexMore = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/pages/more.vue')
// const entryDetails = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/entryBehavior/entryDetails.vue')
const classBehavior = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/classBehavior/classBehaviorDetail.vue')
const classDetailPage = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/classBehavior/detailPage.vue')
const classBehaviorEdit = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/classBehavior/classBehaviorEdit.vue')
const evaluationIndex = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/evaluation/evaluationIndex.vue')
const acordStudent = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/evaluation/acordStudent.vue')
const acordGroup = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/evaluation/acordGroup.vue')
// const entryBehaviorEdit = () => import(/* webpackChunkName: "classManager" */ '@/components/classManager/entryBehavior/entryBehaviorEdit.vue')
const classArr = [
  {
    path: '/classManagerindex',
    component: index,
    meta: {
      title: '班级自我管理'
    },
    children: [
      {
        path: 'managerIndex',
        name: 'managerIndex',
        component: managerIndex,
        meta: {
          title: '班级自我管理'
        }
      },
      {
        path: '',
        redirect: 'managerIndex',
        meta: {
          title: '班级自我管理'
        }
      },
      {
        path: 'entryIndex',
        name: 'bjEntryIndex',
        component: entryIndex,
        meta: {
          title: '班级自我管理'
        }
      },
      {
        path: 'acordObject',
        name: 'acordObject',
        component: acordObject,
        meta: {
          title: '班级自我管理'
        }
      },
      {
        path: 'statisticIndex',
        name: 'statisticIndex',
        component: statisticIndex,
        meta: {
          title: '班级自我管理'
        }
      },
      {
        path: 'indexMore/:class_id',
        name: 'indexMore',
        component: indexMore,
        meta: {
          title: '班级自我管理'
        }
      },
      {
        path: 'classBehavior',
        name: 'classBehavior',
        component: classBehavior,
        meta: {
          title: '班级自我管理'
        }
      },
      {
        path: 'classDetailPage/:from',
        name: 'classDetailPage',
        component: classDetailPage,
        meta: {
          title: '班级自我管理'
        }
      },
      {
        path: 'classBehaviorEdit',
        name: 'classBehaviorEdit',
        component: classBehaviorEdit,
        meta: {
          title: '班级自我管理'
        }
      },
      {
        path: 'evaluationIndex',
        component: evaluationIndex,
        children: [
          {
            path: 'acordStudent',
            name: 'acordStudent',
            component: acordStudent,
            meta: {
              title: '班级自我管理'
            }
          },
          {
            path: 'acordGroup',
            name: 'acordGroup',
            component: acordGroup,
            meta: {
              title: '班级自我管理'
            }
          },
          {
            path: '',
            redirect: 'acordStudent',
            meta: {
              title: '班级自我管理'
            }
          }
        ]
      }
    ]
  }
]
export default classArr
