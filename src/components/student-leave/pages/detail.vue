<template>
  <div class="detail page-fixed">
    <div class="row">
      <span class="l">请假人：</span>
      <span class="r">{{name}}</span>
    </div>
    <div class="row">
      <span class="l">宿舍信息：</span>
      <span class="r">{{''}}</span>
    </div>
    <div class="row">
      <span class="l">请假事由：</span>
      <span class="r">{{typeName}}</span>
    </div>
    <div class="row">
      <span class="l">请假时间：</span>
      <span class="r">{{`${startTime}~${endTime}`}}</span>
    </div>
    <div class="row">
      <span class="l">备注内容：</span>
      <span class="r">{{reason}}</span>
    </div>
    <bottomBtnCom @agree='onAgree' @reject='onReject' @delete='onDelete' :approve='!!this.$route.params.approve'></bottomBtnCom>
  </div>
</template>
<script>
import bottomBtnCom from '@/components/student-leave/pages/detail/bottomBtnCom'
export default {
  components: {
    bottomBtnCom
  },
  data () {
    return {
      name: '',
      typeName: '',
      reason: '',
      startTime: '',
      endTime: '',
      leaveTypeList: [
        { content: '事假', type: '1' },
        { content: '病假', type: '2' },
        { content: '其他', type: '3' },
        { content: '迟到', type: '4' },
        { content: '早退', type: '5' },
        { content: '旷课', type: '6' }
      ]
    }
  },
  created () {
    this.getData()
    document.body.style.overflowY = 'hidden'
  },
  destroyed () {
    document.body.style.overflowY = ''
  },
  methods: {
    onAgree () {
      console.log('同意')
      this.postAskcheck(1)
    },
    onReject () {
      this.postAskcheck(2)
    },
    onDelete () {
      this.excuDel()
    },
    postAskcheck (states) { // 同意 OR 驳回
      let d = {
        ask_id: this.$route.params.id,
        states
      }
      let msg = states === 1 ? '同意' : '驳回'
      this.$preloaderFull.show()
      return this.$axios.post(`/palm/v2/askcheck`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('if-data', data)
          this.$simpleMsg(`已${msg}`)
          this.$router.back()
        }
      })
    },
    excuDel () {
      let d = {
        ask_id: this.$route.params.id
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/palm/v2/askdel`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$simpleMsg(`已删除`)
          this.$router.back()
          this.$emit('del')
        }
      })
    },
    getData () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/userask?ask_id=${this.$route.params.id}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('详情', data)
          let d = data.result.ask_info[0]
          this.name = d.user_name
          this.reason = d.description
          this.startTime = this.$getTimeStr(d.start_leave_on, 'yy-mm-dd hh:mm', false)
          this.endTime = this.$getTimeStr(d.end_leave_on, 'yy-mm-dd hh:mm', false)
          this.typeName = this.leaveTypeList[parseInt(d.ask_type) - 1].content
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.detail {
  padding: 12px;
  background: #fff;
  z-index: 1;
}
.row {
  line-height: 30px;
  font-size: 13px;
  display: flex;
  color: #999;
  .l {
    width: 75px;
    text-align: right;
  }
  .r {
    flex: 1;
  }
}
</style>



