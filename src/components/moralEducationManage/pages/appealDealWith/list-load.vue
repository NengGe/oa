<template>
  <LoaderRefresh ref="vLoaderRefresh" @bottomLoad="onBottomLoad" @refreshLoad="onRefreshLoad" colorTop="black" colorBottom="black">
    <div class="list-box">
      <List :data="data" @action="(item, i) =>$emit('action', item, i)"></List>
    </div>
    <!-- 背景图片 -->
    <oa-bg-nodata v-show="showBg"></oa-bg-nodata>
  </LoaderRefresh>
</template>

<script>
import List from './list'
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh2.vue'

export default {
  components: {
    LoaderRefresh,
    List
  },
  props: {
    data: Array,
    getData: Function,
    needStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showBg: false
    }
  },
  computed: {
    page () {
      return Math.ceil(this.data.length / 10)
    }
  },
  created () {
    console.log('created', this.$attrs['aaa'])
  },
  methods: {
    // 加载
    onBottomLoad ({ isRefresh, complete, vLoaderBottom }) {
      this.getData(this.page).then(d => {
        d = d || []
        this.data.push(...d)
        complete(d.length < 10)
        this.showBg = !this.page && !d.length
        this.showBg && vLoaderBottom.hide()
      })
    },
    // 刷新
    onRefreshLoad ({ isRefresh, complete, vLoaderBottom }) {
      this.getData(0).then(d => {
        d = d || []
        this.data.splice(0, this.data.length, ...d)
        complete(d.length < 10)
        this.showBg = !this.page && !d.length
      })
    },
    reStart () {
      console.log('********    reStart   *******', this.$attrs.aaa)
      this.$refs.vLoaderRefresh.reStart()
    }
  }

}
</script>


