
<template>
  <div class="classDetailPage">
    <bg></bg>
    <item>
      <div class="right">
        <span class="right-s">{{eventInfo.grade_name}}{{eventInfo.class_name}}，</span>
        <span class="right-s">{{eventInfo.user_name}}</span>
      </div>
    </item>
    <item htmlContent="制度">
      <div class="right">
        <span class="right-s">{{eventInfo.rule_item_name}}</span>
      </div>
    </item>
    <!-- <div class="introduction">
      <p class="intro-p">说明：<span class="introduction-s">{{eventInfo.event_desc}}</span></p>
      <div class="img-box" v-if="eventInfo.image_url"> 
        <img :src="eventInfo.image_url" alt="">
      </div>
    </div> -->
    <introductionBox :content="eventInfo.event_desc" :imgList="imgUrl"></introductionBox>
    <item htmlContent="时间">
      <div class="right">
        <span class="right-s">{{eventInfo.event_date}}</span>
      </div>
    </item>
    <div class="appeal-speak" v-if="$route.params.from === '2'">
       <span class="appeal-s">申诉说明：</span>
       <span >{{eventInfo.appeal_desc}}</span>
    </div>
    <!-- 底部栏 -->
    <div class="bottom-bar">
      <div class="item item1" @click="$toast('功能开发中......')" v-if="false">
        申诉处理
      </div>
      <div class="item item2" @click="deleteBehavior">
        删除
      </div>
      <div class="item item3" @click="$router.push({path: '/classManagerindex/classBehaviorEdit'})">
        编辑
      </div>
    </div>
  </div>
</template>
<script>
import textArea from '@/components/classManager/components/textArea'
import bg from '@/components/classManager/components/bg'
import item from '@/components/classManager/components/item.vue'
import local from '@/components/classManager/assets/js/localStore.js'
import $http from '@/components/classManager/assets/js/$http.js'
import dateTo from '@/components/classManager/assets/js/dateTo.js'
import introductionBox from '@/components/classManager/components/introductionBox'
export default {
  name: 'classDetailPage',
  components: {
    textArea,
    bg,
    item,
    introductionBox
  },
  data () {
    return {
      classId: '',
      event_id: '',
      eventInfo: {},
      imgUrl: []
    }
  },
  methods: {
    getData (url, fn) { // 得到班级数据
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
      this.classId = this.$route.query.class_id
      this.eventId = this.$route.query.event_id
      this.getData('/palm/v2/classeventrecord?class_id=' + this.classId + '&event_id=' + this.eventId).then((data) => {
        // console.log(data)
        this.eventInfo = data.records[0]
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
            // _this.$router.push({path: 'managerIndex'})
            _this.$router.back()
          })
          return true
        },
        onCancel () {
          return true
        }
      })
    }
  },
  created () {
    this.getEventInfo()
  }
}
</script>
<style scoped>
.appeal-index {

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
.bottom-bar .item1,.bottom-bar .item2, .bottom-bar .item3 {
  flex: 1 1 auto;
  height: 38px;
  line-height: 38px;
  color: #666666;
  font-size: 18px;
  text-align: center;
}
.bottom-bar .item1 {
  border-right: solid 1px #dddddd;
}
.bottom-bar .item2 {
  border-right: solid 1px #dddddd;
}
.bottom-bar .item3 {

}
.bottom-bar .item {
  &:active {
    color: #c75454;
    /* background-color: #8e8080; */
  }
}
</style>