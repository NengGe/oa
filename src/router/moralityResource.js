const srcIndex = () => import(/* webpackChunkName: "resource" */ '@/components/moralityResource/index.vue')
const resourceIndex = () => import(/* webpackChunkName: "resource" */ '@/components/moralityResource/resoureIndex.vue')
const resourceDetail = () => import(/* webpackChunkName: "resource" */ '@/components/moralityResource/resourceDetail.vue')

const resouceArr = [
  {
    path: '/dysource',
    // name: 'srcIndex',
    component: srcIndex,
    meta: {
      title: '德育资源'
    },
    children: [
      // {
      //   path: 'resourceIndex',
      //   name: 'resourceIndex',
      //   component: resourceIndex
      // },
      {
        path: '',
        name: 'dyresourceIndex',
        component: resourceIndex
      },
      // {
      //   path: 'aaa',
      //   name: 'aaa',
      //   components: aaa
      // },
      {
        path: 'dyresourceDetail',
        name: 'dyresourceDetail',
        component: resourceDetail
      }
    ]
  }
]
export default resouceArr
