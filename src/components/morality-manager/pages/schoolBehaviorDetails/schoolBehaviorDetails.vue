
<template>
  <div class="schoolBehaviorDetails">
    <bg></bg>
    <item>
      <div class="right">
        <span class="right-s">{{eventInfo.grade_name}}{{eventInfo.class_name}}</span>
        <span class="right-s" v-if="eventInfo.user_name">， {{eventInfo.user_name}}</span>
      </div>
    </item>
    <item htmlContent="制度">
      <div class="right">
        <span class="right-s">{{eventInfo.rule_item_name}}</span>
      </div>
    </item>
    <!-- <div class="introduction">
      <p class="intro-p">说明：
        <span class="introduction-s">{{eventInfo.event_desc}}</span>
      </p>
      <div class="img-box" v-if="imgUrl.length">
        <img :src="imgUrl" alt="" v-for="(item, index) in ">
      </div>
    </div> -->
    <textareaAndAttach readonly placeholder="" :imgList='imgUrl' :content.sync='eventInfo.event_desc'></textareaAndAttach>
    <item htmlContent="时间">
      <div class="right">
        <span class="right-s">{{eventInfo.event_date}}</span>
      </div>
    </item>
    <div class="appeal-speak" v-if="$route.params.from === '2'">
      <span class="appeal-s">申诉说明：</span>
      <span>{{eventInfo.event_desc}}</span>
    </div>
    <!-- 底部栏 -->
    <div class="bottom-bar">
      <div class="item item1" @click="$router.push({name: 'appealDetail', params:{id: appealId, state: 0}})" v-if="isShowAppealDeal">
        申诉处理
      </div>
      <div class="item item2" @click="deleteBehavior" v-if="behaviorEditOrganization">
        删除
      </div>
      <!-- { name: 'behaviroEntryIndex', params: { type: '4' }, query: { eventId: $route.query.event_id } } -->
      <!-- $router.replace({path: 'schoolBehaviorEdit', quer: {event_id: eventId}} -->
      <div class="item item3" 
        @click="$router.push({name: 'behaviroEntryIndex', params: { type: '4' }, query: { eventId: $route.query.event_id } })" 
        v-if="behaviorDeleteOrganization"
      >
        编辑
      </div>
    </div>
  </div>
</template>
<script>
// 用的班级管理模块的公共组件
import textArea from '@/components/morality-manager/components/textArea'
import bg from '@/components/morality-manager/components/bg'
import item from '@/components/morality-manager/components/item'
import local from '@/components/morality-manager/assets/js/localStore.js'
import $http from '@/components/morality-manager/assets/js/$http.js'
import dateTo from '@/components/morality-manager/assets/js/dateTo.js'
import textareaAndAttach from '@/components/morality-manager/pages/behaviorEntry/TextareaCom'
// import appealPage from '@/components/morality-manager/pages/schoolBehaviorDetails/appealIntrduction'
export default {
  name: 'schoolBehaviorDetails',
  components: {
    textArea,
    bg,
    item,
    textareaAndAttach
  },
  data () {
    return {
      classId: '',
      event_id: '',
      eventInfo: {},
      imgUrl: [],
      appealId: '0'
    }
  },
  methods: {
    getData (url, fn) {
      this.$preloaderFull.show({ mask: true })
      return this.$axios.get(url).then(({ data }) => {
        // console.log(data)
        this.$preloaderFull.close()
        if (data.status === 200) {
          fn && fn()
          // this.$toast.success()
          return data.result
        } else {
          return Promise.reject(new Error(data.message))
        }
      }).catch((erro) => {
        this.$preloaderFull.close()
        console.log(erro)
      })
    },
    getEventInfo () {
      this.eventId = this.$route.query.event_id
      this.getData('/palm/v2/event/details/' + this.eventId).then((data) => {
        // console.log(data)
        this.eventInfo = data.data
        this.appealId = this.eventInfo.appeal_id
        this.imgUrl = this.eventInfo.image_url === '' ? [] : this.eventInfo.image_url.split(',')
        this.eventInfo.event_date = dateTo(this.eventInfo.event_date)
        local.set('eventInfo', this.eventInfo)
        // console.log(this.eventInfo)
      })
    },
    deleteBehavior () { // 删除行为
      let _this = this
      let deleteData = $http.deleteDataPost
      this.$confirm({
        description: '确定删除吗？',
        onConfirm () {
          deleteData(_this, '/palm/v2/ruledel/' + _this.eventId, {}, () => { // 删除请求
            // _this.$router.replace({ path: 'schoolBehaviorIndex' })
            _this.$router.back()
          })
          return true
        },
        onCancel () {
          return true
        }
      })
    },
    getAppealContent ({ text }) { // 得到申诉内容
      // console.log(text)
    },
    showAppeal () {
      // this.$refs.appealPage.show()
    }
  },
  created () {
    this.getEventInfo()
  },
  computed: {
    appealDealOrganization () { // 学校行为申诉处理权限
      return JSON.parse(local.get('schoolRoleOrganization')).appealDealOrganization
    },
    behaviorEditOrganization () { // 学校行为编辑权限
      return JSON.parse(local.get('schoolRoleOrganization')).behaviorEditOrganization
    },
    behaviorDeleteOrganization () { // 学校行为删除权限
      return JSON.parse(local.get('schoolRoleOrganization')).behaviorDeleteOrganization
    },
    isShowAppealDeal () { // 是否显示申诉处理按钮
      return this.appealDealOrganization && this.appealId !== '0'
    }
  }
}
</script>
<style scoped>
.appeal-index {
}
.introduction {
  padding: 21px 16px;
  background: #ffffff;
  margin-top: 10px;
}
.intro-p {
  font-weight: bold;
  color: #666666;
  font-size: 15px;
  margin-bottom: 45px;
}
.introduction-s {
  color: #666666;
  font-weight: normal;
}
.img-box img {
  height: 56px;
  width: 56px;
  border-radius: 5px;
}
.appeal-speak {
  padding: 18px 16px 0px 16px;
  background: #ffffff;
  margin-top: 10px;
  height: 120px;
  font-size: 15px;
  color: #666666;
}
.appeal-s {
  font-size: 15px;
  color: #333333;
  font-weight: bold;
}
.bottom-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 8px 0px;
  border-top: solid 1px #dddddd;
  margin-top: 10px;
  display: flex;
  background: #ffffff;
}
.bottom-bar .item1,
.bottom-bar .item2,
.bottom-bar .item3 {
  /* width: 32.5%; */
  flex: 1 1;
  height: 38px;
  line-height: 38px;
  color: #666666;
  font-size: 18px;
  text-align: center;
}
/* .bottom-bar .item1 {
  border-right: solid 1px #dddddd;
}
.bottom-bar .item2 {
  border-right: solid 1px #dddddd;
}
.bottom-bar .item3 {

} */
.bottom-bar .item {
  border-right: solid 1px #dddddd;
  &:active {
    color: #c75454;
    /* background-color: #8e8080; */
  }
}
.bottom-bar .item:last-of-type {
  border-right: 0;
}
</style>