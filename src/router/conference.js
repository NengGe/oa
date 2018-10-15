import Conference from '@/components/conference/Conference'
import ConferenceIndex from '@/components/conference/Index.vue'
const ConferenceCreate = () => import(/* webpackChunkName: "conference" */ '@/components/conference/Create.vue')
const ConferenceDetail = () => import(/* webpackChunkName: "conference" */ '@/components/conference/Detail.vue')
const ConferenceJiyao = () => import(/* webpackChunkName: "conference" */ '@/components/conference/Jiyao.vue')
const ConferenceNewJiyao = () => import(/* webpackChunkName: "conference" */ '@/components/conference/NewJiyao.vue')

export default [
  {
    path: '/conference',
    component: Conference,
    children: [{
      path: '',
      // alias: ['/'],
      name: 'ConferenceIndex',
      meta: {title: '会议'},
      component: ConferenceIndex
    }, {
      path: '/conference/create',
      name: 'ConferenceCreate',
      meta: {title: '新建会议'},
      component: ConferenceCreate
    }, {
      path: '/conference/:id',
      name: 'ConferenceDetail',
      meta: {title: '会议详情'},
      component: ConferenceDetail,
      props: true
    }, {
      path: '/conference/detail/jiyao/:id',
      name: 'ConferenceJiyao',
      meta: {title: '会议纪要'},
      component: ConferenceJiyao,
      props: true
    }, {
      path: '/conference/detail/newjiyao/:id',
      name: 'ConferenceNewJiyao',
      meta: {title: '新建会议纪要'},
      component: ConferenceNewJiyao,
      props: true
    }, {
      path: '/conference/detail/editjiyao/:id',
      name: 'ConferenceEditJiyao',
      meta: {title: '编辑会议纪要'},
      component: ConferenceNewJiyao,
      props: true
    }/* {
      path: '/conference/detail/qiandao',
      name: 'ConferenceQianDao',
      meta: {title: '会议纪要'},
      component: ConferenceQianDao
    } {
        path: '/conference/detail/note',
        name: 'ConferenceNote',
        meta: {title: '会议笔记'},
        component: ConferenceNote
      }, */]
  }
]
