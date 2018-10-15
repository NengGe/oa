// import AssetsManage from '@/components/assets-manage/AssetsManage'
const file = () => import(/* webpackChunkName: "file" */ '@/components/file/file.vue')
const FileIndex = () => import(/* webpackChunkName: "file" */ '@/components/file/pages/Index.vue')
const Upload = () => import(/* webpackChunkName: "file" */ '@/components/file/pages/upload.vue')
const Lookup = () => import(/* webpackChunkName: "file" */ '@/components/file/pages/lookup.vue')

const fileApprovalIndex = () => import(/* webpackChunkName: "file" */ '@/components/file/pages/approvalIndex.vue')
const approvalLookup = () => import(/* webpackChunkName: "file" */ '@/components/file/pages/approvalLookup.vue')
export default [
  {
    path: '/file',
    component: file,
    children: [
      {
        path: '',
        name: 'fileIndex',
        meta: {title: '文件管理'},
        component: FileIndex,
        children: [
          {
            path: 'lookup',
            name: 'lookup',
            meta: {title: '文件查看'},
            component: Lookup
          }
        ]
      },
      {
        path: 'upload',
        name: 'upload',
        meta: {title: '文件上传'},
        component: Upload
      },
      {
        path: 'fileApprovalIndex',
        name: 'fileApprovalIndex',
        meta: {title: '文件管理'},
        component: fileApprovalIndex,
        children: [
          {
            path: 'approvalLookup',
            name: 'approvalLookup',
            meta: {title: '文件查看'},
            component: approvalLookup
          }
        ]
      }
    ]
  }
]
