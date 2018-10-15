<template>
  <div class="appealDetail page-fixed page-bg">
    <FormCom class="FormCom">
      <cell text title="对象" :content="person"></cell>
    </FormCom>
    <FormCom class="FormCom">
      <cell text title="制度" :content="ruleName"></cell>
    </FormCom>
    <textareaAndAttach readonly placeholder="" :imgList='imgList' :content.sync='textareaTextA'></textareaAndAttach>
    <!-- 理由 -->
    <TextareaCom placeholder="" :content.sync='textareaTextB'></TextareaCom>
    <bottomBtn v-if="this.$route.params.state===0" @delete='ondelete' @edit='onedit' @reject='onreject'></bottomBtn>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import textareaAndAttach from './behaviorEntry/TextareaCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import bottomBtn from './appealDetail/bottom-btn'
export default {
  components: {
    FormCom,
    Cell,
    textareaAndAttach,
    TextareaCom,
    bottomBtn
  },
  data () {
    return {
      person: '张三三',
      ruleName: '上课睡觉',
      textareaTextA: '123',
      imgList: [],
      textareaTextB: '456',
      eventId: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    onreject () {
      this.post('reject').then(d => {
        d === 200 && this.$simpleMsg('已驳回')
      })
    },
    ondelete () {
      this.post('pass').then(d => {
        d === 200 && this.$simpleMsg('已删除')
      })
    },
    onedit () {
      this.$router.push({ name: 'behaviorEntry' })
    },
    getData () {
      this.$preloaderFull.show()
      return this.$axios.get(`palm/v2/appeal?appeal_id=${this.$route.params.id}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('申诉详情', data)
          let d = data.result.appeal_events[0]
          let { grade_name, class_name, user_name, rule_item_name, event_desc, appeal_desc, image_url, event_id } = d
          this.person = `${grade_name}${class_name} ${user_name}`
          this.ruleName = rule_item_name
          this.textareaTextA = event_desc
          this.imgList = image_url ? image_url.split(',') : []
          this.textareaTextB = appeal_desc
          this.eventId = event_id
          console.log('image_url', image_url)
          console.log(this.imgList)
        }
      })
    },
    post (status) {
      let d = {
        rule_event_id: this.eventId,
        approve_type: status
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/palm/v2/appeal/approve`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$router.back()
        } else {
          this.$simpleMsg('提交失败')
        }
        return data.status
      })
    }
  }
}
</script>

<style scoped>
.FormCom {
  margin-top: 12px;
}
</style>


