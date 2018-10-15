const outMine = () => import(/* webpackChunkName: "outMine" */ '@/components/out-mine/out-mine.vue')
const index = () => import(/* webpackChunkName: "outMine" */ '@/components/out-mine/pages/index.vue')
const detail = () => import(/* webpackChunkName: "outMine" */ '@/components/out-mine/pages/detail.vue')
const indexAdmin = () => import(/* webpackChunkName: "outMine" */ '@/components/out-mine/pages/index-admin.vue')
const detailAdmin = () => import(/* webpackChunkName: "outMine" */ '@/components/out-mine/pages/detail-admin.vue')
const newbuildAdmin = () => import(/* webpackChunkName: "outMine" */ '@/components/out-mine/pages/newbuild-admin.vue')
export default [
  {
    path: '/outmine',
    component: outMine,
    children: [
      {
        path: '',
        name: 'index_outMine',
        meta: { title: '我的外出' },
        component: index,
        children: [
          {
            path: 'detail/:id',
            name: 'detail_outMine',
            meta: { title: '外出详情' },
            component: detail
          }
        ]
      },
      {
        path: 'indexadmin',
        name: 'index_admin',
        meta: { title: '外出安排' },
        component: indexAdmin,
        children: [
          {
            path: 'detail/:id',
            name: 'detail_admin',
            meta: { title: '外出详情' },
            component: detailAdmin
          }
        ]
      },
      {
        path: 'newbuild',
        name: 'newbuild_out_admin',
        meta: { title: '外出安排' },
        component: newbuildAdmin
      }
    ]
  }
]
