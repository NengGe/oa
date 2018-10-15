import videoIndex from '@/components/videos/video-index.vue'
// const ConferenceIndex = () => import(/* webpackChunkName: "videos" */ '@/components/videos/Index.vue')
// const videoCheck = () => import(/* webpackChunkName: "videos" */ '@/components/videos/video-check.vue')

export default [
  {
    path: '/video',
    alias: ['/videoIndex'],
    name: 'videoIndex',
    meta: {title: '校园直播'},
    component: videoIndex
  }/* ,
  {
    path: '/videocheck',
    alias: ['/videoforcheck'],
    name: 'videoCheck',
    meta: {title: '直播查看'},
    component: videoCheck
  } */
]
