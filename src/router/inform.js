// import AssetsManage from '@/components/assets-manage/AssetsManage'
const Inform = () => import(/* webpackChunkName: "inform" */ '@/components/inform/Inform')
const InformIndex = () => import(/* webpackChunkName: "inform" */ '@/components/inform/pages/Index.vue')
// const AssetsList = () => import(/* webpackChunkName: "inform-manage" */ '@/components/assets-manage/pages/List.vue')
// const AssetsManageIndex = () => import(/* webpackChunkName: "assets-manage" */ '@/components/assets-manage/pages/Index.vue')

const InformDetail = () => import(/* webpackChunkName: "inform" */ '@/components/inform/pages/informDetail.vue')
const InformSend = () => import(/* webpackChunkName: "inform" */ '@/components/inform/pages/InformSend.vue')
const MyReceive = () => import(/* webpackChunkName: "inform" */ '@/components/inform/pages/MyReceive.vue')
const MySend = () => import(/* webpackChunkName: "inform" */ '@/components/inform/pages/MySend.vue')

export default [
  {
    path: '/inform',
    component: Inform,
    children: [
      {
        path: '',
        name: 'informIndex',
        meta: {title: '公告'},
        component: InformIndex
      },
      {
        path: 'informDetail/:status/:id',
        name: 'informDetail',
        meta: {title: '公告详情'},
        component: InformDetail
      },
      {
        path: 'myreceive',
        name: 'myReceive',
        meta: {title: '公告', zIndex: 1},
        component: MyReceive
      },
      {
        path: 'informsend/:id',
        name: 'informSend',
        meta: {title: '发布公告', zIndex: 2},
        component: InformSend
      },
      {
        path: 'mysend',
        name: 'mySend',
        meta: {title: '公告', zIndex: 3},
        component: MySend
      }
    ]
  }
]
