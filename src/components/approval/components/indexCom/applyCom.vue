<template>
  <div class="content-box">
    <div class="row_01 row">
      <oa-iconBtn :class="{v: item.status === 0}" :item='item' attr='content' itemWidth='55' v-for="(item,index) in itemArr[0]" :key="index" @action='(item)=>itemArrAction(item, "0")'></oa-iconBtn>
    </div>
    <div class="row_02 row">
      <oa-iconBtn :class="{v: item.status === 0}" :item='item' attr='content' itemWidth='55' v-for="(item,index) in itemArr[1]" :key="index" @action='(item)=>itemArrAction(item, "0")'></oa-iconBtn>
    </div>
    <div class="row_03 row">
      <oa-iconBtn :class="{v: item.status === 0}" :item='item' attr='content' itemWidth='55' v-for="(item,index) in itemArr[2]" :key="index" @action='(item)=>itemArrAction(item, "0")'></oa-iconBtn>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      itemArr: [
        [
          { content: '请假', icon: '&#xe61d;', iconClass: 'icon-qingjia iconfont-approval', bg: '#fbc639', routeName: 'qingjia', status: 1 },
          { content: '外出', icon: '&#xe6f3;', iconClass: 'icon-waichu iconfont-approval', bg: '#00bb54', routeName: 'waichu', status: 1 },
          { content: '换课', icon: '&#xe767;', iconClass: 'icon-tiaoke iconfont-approval', bg: '#01c095', routeName: 'tiaoke', status: 1 }
        ],
        [
          { content: '顶课', icon: '&#xe600;', iconClass: 'icon-dingke iconfont-approval', bg: '#ef7d0a', routeName: 'dingke', status: 1 },
          { content: '经费', icon: '&#xe61b;', iconClass: 'icon-jingfei iconfont-approval', bg: '#4da5e5', routeName: 'jingfei', status: 1 },
          { content: '用车', icon: '&#xe629;', iconClass: 'icon-yongche iconfont-approval', bg: '#20d2aa', routeName: 'yongche', status: 1 }
        ],
        [
          { content: '采购', icon: '&#xe60a;', iconClass: 'icon-caigou iconfont-approval', bg: '#7a9cf7', routeName: 'caigou', status: 1 },
          { content: '报修', icon: '&#xe660;', iconClass: 'icon-baoxiu iconfont-approval', bg: '#be7ccc', routeName: 'baoxiu', status: 0 },
          { content: '', icon: '', iconClass: '', routeName: '', status: 0 }
        ]
      ]
    }
  },
  methods: {
    itemArrAction (item, id) {
      if (item.status === 0) return
      this.$router.push({ name: item.routeName, params: { id: id } })
    }
  }
}
</script>

<style lang='scss' scoped>
.approval {
  .content-box {
    .row {
      display: flex;
      justify-content: space-around;
    }
    .row.row_01 {
      margin-top: 62px;
    }
    .row.row_02 {
      margin-top: 78px;
    }
    .row.row_03 {
      margin-top: 78px;
    }
  }
}
.v {
  visibility: hidden;
}
</style>


