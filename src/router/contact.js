const Contact = () => import(/* webpackChunkName: "contact" */ '@/components/contacts/Contact')
const ContactIndex = () => import(/* webpackChunkName: "contact" */ '@/components/contacts/pages/Index.vue')
const Group = () => import(/* webpackChunkName: "contact" */ '@/components/contacts/pages/Group.vue')

export default [
  {
    path: '/contacts',
    component: Contact,
    children: [{
      path: '',
      name: 'ContactIndex',
      meta: {title: '通讯录'},
      component: ContactIndex
    }, {
      path: 'group',
      name: 'Group',
      meta: {title: '群组'},
      component: Group
    }]
  }
]
