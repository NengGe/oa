<template>
  <LoaderRefresh ref="vLoaderRefresh" @bottomLoad="onBottomLoad" @refreshLoad="onRefreshLoad" colorTop="black" colorBottom="black">
    <div class="list-box">
      <List :isNeedStatus='isNeedStatus' :data="data" @action="(item, i) =>$emit('action', item, i)"></List>
    </div>
    <!-- 背景图片 -->
    <oa-bg-nodata v-show="showBg"></oa-bg-nodata>
  </LoaderRefresh>
</template>

<script>
import List from '@/components/dy-inform/com/list'
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh2.vue'

export default {
  components: {
    LoaderRefresh,
    List
  },
  props: {
    data: Array,
    getData: Function,
    isNeedStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showBg: false,
      status: [
        {content: '待审核', className: 'bg-blue'},
        {content: '已通过', className: 'bg-green'},
        {content: '已驳回', className: 'bg-red'},
        {content: '已删除', className: 'bg-grad'}
      ]
    }
  },
  computed: {
    page () {
      return Math.ceil(this.data.length / 10)
    }
  },
  created () {
    // console.log('created', this.$attrs['list'])
  },
  methods: {
    // 加载
    onBottomLoad ({ isRefresh, complete, vLoaderBottom }) {
      // console.log('加载', this.$attrs['list'])
      this.getData(this.page + 1).then(d => {
        d = d || []
        this.data.push(...d)
        complete(d.length === 0)
        this.showBg = !this.page && !d.length
        this.showBg && vLoaderBottom.hide()
      })
    },
    // 刷新
    onRefreshLoad ({ isRefresh, complete, vLoaderBottom }) {
      // console.log('刷新', this.$attrs['list'])
      this.getData(1).then(d => {
        d = d || []
        this.data.splice(0, this.data.length, ...d)
        complete(false)
        this.showBg = !this.page && !d.length
        this.showBg && vLoaderBottom.hide()
      })
    },
    reStart () {
      console.log('********    reStart   *******', this.$attrs.aaa)
      this.$refs.vLoaderRefresh.reStart()
    }
  }

}
</script>


