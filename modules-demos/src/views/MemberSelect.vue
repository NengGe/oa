<template>
  <div id="app">
    <p><a class="t-close" @click="close">手动关闭</a></p>
    <p><a @click="show">弹出单选</a></p>
    <p><a @click="showMultiple">弹出多选</a></p>
    <MemberSelect ref="vMemberSelect"></MemberSelect>
  </div>
</template>

<script>
  import MemberSelect from '@/modules/member-select'
  export default {
    data () {
      return {
        num: 0
      }
    },
    components: {
      MemberSelect
    },
    methods: {
      show () {
        this.$refs.vMemberSelect.show({
          // 类型：单选(single)(默认)、多选(multiple)
          // type: 'multiple',
          // 已选项。初始选中。直接把确认拿到的数据丢过来即可
          selectedData: [++this.num > 1 ? {user_id: '492594'} : {user_id: '492691'}],
          // 确认事件
          onConfirm (selectedData) {
            console.log(selectedData)
            // 进行是否关闭判断
            // return false // 阻止自动关闭
          }
        })
      },
      showMultiple () {
        this.$refs.vMemberSelect.show({
          type: 'multiple',
          selectedData: [],
          // 确认事件
          onConfirm (selectedData) {
            console.log(JSON.stringify(selectedData))
            console.log(selectedData)
            // 进行是否关闭判断
            // return false // 阻止自动关闭
          }
        })
      },
      close () {
        // 手动关闭
        this.$refs.vMemberSelect.close()
      }
    }
  }
</script>

<style scoped>
p{
  text-align: center;
  line-height: 2;
}
a {
  text-decoration: underline;
}
.t-close {
  position: relative;
  z-index: 9;
}
</style>
