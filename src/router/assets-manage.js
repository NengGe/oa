// import AssetsManage from '@/components/assets-manage/AssetsManage'
const AssetsManage = () => import(/* webpackChunkName: "assets-manage" */ '@/components/assets-manage/AssetsManage')
const AssetsIndex = () => import(/* webpackChunkName: "assets-manage" */ '@/components/assets-manage/pages/Index.vue')
const AssetsList = () => import(/* webpackChunkName: "assets-manage" */ '@/components/assets-manage/pages/List.vue')
// const AssetsManageIndex = () => import(/* webpackChunkName: "assets-manage" */ '@/components/assets-manage/pages/Index.vue')

export default [
  {
    path: '/assets',
    component: AssetsManage,
    children: [{
      path: '',
      name: 'assetsIndex',
      meta: {title: '资产管理'},
      component: AssetsIndex
    }, {
      path: 'list',
      name: 'assetsList',
      meta: {title: '资产列表'},
      component: AssetsList
    }]
  }
]
