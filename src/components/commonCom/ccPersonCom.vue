<template>
  <FormCom class="form-com">
    <div class="cc-box">
      <div class="l">{{title}}</div>
      <div class="r" :class="{active: noticePersonText}" @click="$emit('addPerson')">
        <span>{{noticePersonText||'请选择'}}</span>
        <!-- <span>{{ccPersonArr.length ? `${this.ccPersonArr[0].user_name}等${this.ccPersonArr.length}人` : '请选择'}}</span> -->
        <i class="iconfont">&#xe616;</i>
      </div>
    </div>
  </FormCom>
</template>

<script>
import FormCom from '@/components/commonCom/formCom'
export default {
  components: {
    FormCom
  },
  props: {
    'title': {
      type: String,
      default: '抄送人'
    },
    'ccPersonArr': Array
  },
  data () {
    return {

    }
  },
  computed: {
    'noticePersonText': function () {
      let arrLength = this.ccPersonArr.length
      if (arrLength) {
        return `${this.ccPersonArr[arrLength - 1].user_name}等${arrLength}人`
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
.form-com {
  margin-top: 12px;
}
.cc-box {
  background-color: #fff;
  border-radius: 9px;
  box-sizing: border-box;
  padding: 0 10px 0 15px;
  line-height: 52px;
  display: flex;
  justify-content: space-between;
  .l {
    font-size: 15px;
    color: #666;
    font-weight: bold;
  }
  .r {
    padding-left: 30px;
    font-size: 14px;
    color: #ccc;
    &.active {
      color: #333;
    }
  }
}
</style>
