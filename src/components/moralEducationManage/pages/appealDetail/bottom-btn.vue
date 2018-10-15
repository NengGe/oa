<template>
  <div class="bottom-btn top-one-px">
    <div class="btn clickActive" @click="action('reject')">驳回</div>
    <div class="btn clickActive" @click="action('delete')">删除</div>
    <div class="btn clickActive" @click="action('edit')">编辑</div>
    <confirmBox v-show="isShowConfirmBoxCom" title="提示" :content='content' @confirmAction="$emit(event)" @cancelAction="isShowConfirmBoxCom = false"></confirmBox>
  </div>
</template>

<script>
import confirmBox from '@/modules/message-box/confirmBox'
export default {
  components: {
    confirmBox
  },
  data () {
    return {
      isShowConfirmBoxCom: false,
      event: '',
      content: ''
    }
  },
  methods: {
    action (event) {
      if (event === 'edit') {
        this.$emit('edit')
        return
      }
      this.event = event
      this.content = event === 'reject' ? '确定驳回?' : '确定删除?'
      this.isShowConfirmBoxCom = true
    }
  }
}
</script>


<style lang="scss" scoped>
.bottom-btn {
  display: flex;
  text-align: center;
  height: 54px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}
.btn {
  font-weight: bold;
  flex: 1;
  line-height: 54px;
  border-left: 1px solid #ddd;
  color: #666;
}
.btn:first-child {
  border-left: 0;
}
.blue {
  color: #88b8f8;
}
</style>

