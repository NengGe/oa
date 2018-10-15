// import AssetsManage from '@/components/assets-manage/AssetsManage'
const Approval = () => import(/* webpackChunkName: "approval" */ '@/components/approval/Approval')
const approvalIndex = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/Index.vue')
const approvalCom = () => import(/* webpackChunkName: "approval" */ '@/components/approval/components/indexCom/approvalCom.vue')
const commitCom = () => import(/* webpackChunkName: "approval" */ '@/components/approval/components/indexCom/commitCom.vue')
const sendCom = () => import(/* webpackChunkName: "approval" */ '@/components/approval/components/indexCom/sendCom.vue')

// const Approvaling = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/Approvaling.vue')
// const Approvaled = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/Approvaled.vue')

const Qingqiu = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/childPage/Qingjia.vue')
const Baoxiu = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/childPage/Baoxiu.vue')
const Caigou = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/childPage/Caigou.vue')
const Tiaoke = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/childPage/Tiaoke.vue')
const Dingke = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/childPage/Dingke.vue')
const Waichu = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/childPage/Waichu.vue')
const Yongche = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/childPage/Yongche.vue')
const Jingfei = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/childPage/Jingfei.vue')
const ApprovalDetail = () => import(/* webpackChunkName: "approval" */ '@/components/approval/pages/childPage/approvalDetail.vue')
export default [
  {
    path: '/approval',
    component: Approval,
    children: [
      {
        path: '',
        name: 'approvalIndex',
        meta: {title: '审批'},
        component: approvalIndex
      },
      {
        path: 'approvalcom',
        name: 'approvalCom',
        meta: {title: '审批', zIndex: 1},
        component: approvalCom
      },
      {
        path: 'commitcom',
        name: 'commitCom',
        meta: {title: '审批', zIndex: 2},
        component: commitCom
      },
      {
        path: 'sendcom',
        name: 'sendCom',
        meta: {title: '审批', zIndex: 3},
        component: sendCom
      },

      {
        path: 'qingjia',
        name: 'qingjia',
        meta: {title: '请假申请'},
        component: Qingqiu
      },
      {
        path: 'baoxiu',
        name: 'baoxiu',
        meta: {title: '报修申请'},
        component: Baoxiu
      },
      {
        path: 'baoxiu/1',
        name: 'baoxiu1',
        meta: {title: '报修申请'},
        component: Baoxiu
      },
      {
        path: 'baoxiu/2',
        name: 'baoxiu2',
        meta: {title: '报修申请'},
        component: Baoxiu
      },
      {
        path: 'caigou',
        name: 'caigou',
        meta: {title: '采购申请'},
        component: Caigou
      },
      {
        path: 'tiaoke',
        name: 'tiaoke',
        meta: {title: '调课申请'},
        component: Tiaoke
      },
      {
        path: 'dingke',
        name: 'dingke',
        meta: {title: '顶课申请'},
        component: Dingke
      },
      {
        path: 'waichu',
        name: 'waichu',
        meta: {title: '外出申请'},
        component: Waichu
      },
      {
        path: 'yongche',
        name: 'yongche',
        meta: {title: '用车'},
        component: Yongche
      },
      {
        path: 'jingfei',
        name: 'jingfei',
        meta: {title: '公用经费'},
        component: Jingfei
      },
      {
        path: 'approvalDetail/:id/:type',
        name: 'approvalDetail',
        meta: {title: '审批详情'},
        component: ApprovalDetail
      }
    ]
  }
]
