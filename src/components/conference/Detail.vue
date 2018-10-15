<template id="confer-details">
  <div id="confer-main-container" class="main">
    <div class="info-box">
      <div class="row">
        <div class="l">会议名称</div>
        <div class="r">{{detailData.title}}</div>
      </div>
      <div class="row">
        <div class="l">会议时间</div>
        <div class="r">{{detailData.time}}</div>
      </div>
      <div class="row">
        <div class="l">会议地点</div>
        <div class="r">{{detailData.addr}}</div>
      </div>
      <div class="row">
        <div class="l">发起人</div>
        <div class="r">{{detailData.originator}}</div>
      </div>
      <div class="row">
        <div class="l">会议内容</div>
        <div class="r cancel-reset" v-html="detailData.content"></div>
      </div>
      <div class="row person">
        <div class="l">参会人员</div>
        <div class="r">
          <span class="personName" v-for="person in detailData.participantsList" :key="person.user_id">{{person.user_name}}</span>
        </div>
      </div>
    </div>

    <div class="main_header" v-if="!isLoad&&(editable||detailData.hasSummary)">
      <div class="tzheader">
        <h4>
          <template v-if="editable">
            <router-link v-if="hasSummary" :to="{name:'ConferenceEditJiyao',parmas:{id}}">编辑纪要</router-link>
            <router-link v-else :to="{name:'ConferenceNewJiyao',parmas:{id}}">新建纪要</router-link>
          </template>
          <router-link v-else :to="{name:'ConferenceJiyao',parmas:{id}}">纪要</router-link>
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/conference.css'
export default {
  props: ['bus', 'id'],
  data () {
    return {
      editable: '',
      hasSummary: '',
      detailData: {
        title: '',
        time: '',
        addr: '',
        originator: '',
        content: '',
        participantsList: []
      },
      isLoad: true
    }
  },
  mounted () {
    this.loadData()
  },
  computed: {
    // editable () {
    //   let { meeting } = this.detailData
    //   return meeting.curr_user_is_creator === 'true' || meeting.curr_user_is_charger === 'true'
    // }
  },
  methods: {
    loadData () {
      this.isLoad = true
      this.$axios.get('/mobicampus/meeting/v1/getMeetingDetails/' + this.id).then(({ data }) => {
        if (data.status === 200) {
          let dataObj = data.result.data
          let { meeting } = dataObj
          let startTime = meeting.start_time
          let endTime = meeting.end_time
          let startTimeStr = startTime.slice(5, 16).replace('T', ' ')
          let endTimeStr = endTime.slice(5, 16).replace('T', ' ')
          let detailData = {
            title: meeting.title,
            time: `${startTimeStr}~${endTimeStr}`,
            addr: meeting.addr,
            originator: meeting.create_user_name,
            content: meeting.content,
            participantsList: dataObj.meeting_participant_list
          }
          console.log(detailData)
          // 使能编辑
          this.editable = meeting.curr_user_is_creator === 'true' || meeting.curr_user_is_charger === 'true'
          // hasSummary
          this.hasSummary = dataObj.has_summary
          this.detailData = detailData
        }
      }).catch(e => {
        this.$simpleMsg(e)
      }).then(() => {
        this.isLoad = false
      })
    },
    timeBeautify (date) {
      if (date) {
        date = new Date(date)
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
      }
      return ''
    }
  },
  beforeRouteUpdate (to, from, next) {
    next()
    this.loadData()
  }
}
</script>

<style lang="scss" scoped>
.info-box {
  padding: 0 15px;
  background-color: #fff;
  .row {
    display: flex;
    padding: 9px 0;
    border-bottom: 1PX #eee solid;
    &:last-child {
      border-bottom: 0;
    }
    .l {
      line-height: 35px;
      width: 75px;
      font-size: 15px;
      color: #333;
      border-right: 1PX solid #ddd;
    }
    .r {
      word-break: break-all;
      padding-left: 10px;
      line-height: 35px;
      flex: 1;
      font-size: 15px;
      color: #999;
      .personName {
        padding: 0 5px;
        display: inline-block;
      }
    }
    &.person {
      height: 106px;
      .r {
        overflow-y: auto;
      }
    }
  }
}
.main_header {
  margin-top: 20px;
}
</style>

