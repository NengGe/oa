<template>
  <div class="resource-index">
    <indexItem @loadData="loadData" :resourceList="resourceList"></indexItem>
  </div>
</template>
<script>
import indexItem from '@/components/moralityResource/components/indexItem'
export default {
  name: 'resourceWrapper',
  components: {
    indexItem
  },
  data () {
    return {
      pageSize: 0,
      resourceList: []
    }
  },
  methods: {
    getData (url) {
      this.$preloaderFull.show({ mask: true })
      return this.$axios.get(url).then(({ data }) => {
        // console.log(data)
        this.$preloaderFull.close()
        if (data.status === 200) {
          return data.result
        } else {
          return Promise.reject(new Error(data.message))
        }
      }).catch((erro) => {
        this.$preloaderFull.close()
        console.log(erro)
      })
    },
    getResourceList (url) {
      return this.getData(url)
    },
    loadData ({ type, complete, vLoaderBottom } = {}) {
      this.pageSize++
      type === 'refresh' && (this.pageSize = 1)
      this.getResourceList('/palm/v2/resource?page=' + this.pageSize + '&size=5', true).then((data) => {
        console.log(data)
        if (type === 'refresh') {
          this.resourceList = data.moral_resource
          // 刷新完成
          complete()
          // 底部加载重置并检测
          vLoaderBottom.reset() // 重置激活
          vLoaderBottom.tryLoad() // 检测是否执行加载
        } else {
          const arr = this.resourceList.concat(data.moral_resource)
          this.resourceList = arr
          complete(data.moral_resource.length < 5)
        }
      })
    }
  }
}
</script>