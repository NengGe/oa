<template>
  <div class="btn-b top-one-px">
    <ul class="list">
      <li class="item clickActive" v-for="(item, i) in ConfirmBoxData" :key="i" @click="itemAction(item, i)">{{item.title}}</li>
    </ul>
    <confirmBoxCom v-show="isShowConfirmBox" :title='boxData.title' :content='boxData.content' @confirmAction="excu(boxData.excu)" @cancelAction="isShowConfirmBox=false"></confirmBoxCom>
  </div>
</template>

<script>
import confirmBoxCom from '@/modules/message-box/confirmBox'
export default {
  components: {
    confirmBoxCom
  },
  data () {
    return {
      index: 0,
      ConfirmBoxData: [
        { title: '修改', content: '确定要修改该条公告吗？', excu: 'modify' },
        { title: '删除', content: '确定要修改该条公告吗？', excu: 'delete' }
      ],
      isShowConfirmBox: false
    }
  },
  computed: {
    boxData () {
      return this.ConfirmBoxData[this.index]
    }
  },
  created () {
    // this.init()
  },
  methods: {
    itemAction (item, i) {
      this.index = i
      this.isShowConfirmBox = true
    },
    excu (p) { // 同意
      this.isShowConfirmBox = false
      this.$emit(p)
    }
  }
}
</script>

<style lang='scss' scoped>
.btn-b {
  background: #fff;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 54px;
  display: flex;
  line-height: 54px;
  text-align: center;
}
.k-btn {
  width: 65px;
  font-size: 32px;
  transition: transform 0.3s;
  color: #999;
  &.active {
    transform: rotate(180deg);
    color: #88b8f8;
  }
}
.list {
  flex: 1;
  display: flex;
  .item {
    font-weight: bold;
    border-left: 1px solid #e5e5e5;
    flex: 1;
    font-size: 15px;
    color: #88b8f8;
  }
}
</style>

