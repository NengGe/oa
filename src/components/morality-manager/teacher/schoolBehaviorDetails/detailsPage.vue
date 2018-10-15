
<template>
  <div class="details-page">
    <bg></bg>
    <appealPage @getAppeal="getAppealContent" ref="appealPage"></appealPage>
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
      <div class="img-box"> 
        <img :src="eventInfo.image_url" alt="">
      </div>
    </div> -->
    <textareaAndAttach readonly placeholder="" :imgList='imgUrl' :content.sync='eventInfo.event_desc'></textareaAndAttach>
    <item htmlContent="时间">
      <div class="right">
        <span class="right-s">{{eventInfo.event_date}}</span>
      </div>
    </item> 
    <!-- 底部栏 -->
    <!-- <div class="bottom-bar">
      <div class="item item1" @click="showAppeal">
        申诉处理
      </div>
      <div class="item item2" @click="deleteBehavior">
        删除
      </div>
      <div class="item item3" @click="$router.replace({path: 'schoolBehaviorEdit'})">
        编辑
      </div>
    </div> -->
    <div class="appeal-btn-outer" @click="showAppeal">
      <a href="javascript:;" class="appeal-a">申诉处理</a>
    </div>
  </div>
</template>
<script>
import textArea from '@/components/morality-manager/components/textArea'
import bg from '@/components/morality-manager/components/bg'
import item from '@/components/morality-manager/components/item'
import local from '@/components/morality-manager/assets/js/localStore.js'
import $http from '@/components/morality-manager/assets/js/$http.js'
import dateTo from '@/components/morality-manager/assets/js/dateTo.js'
import appealPage from '@/components/morality-manager/pages/schoolBehaviorDetails/appealIntrduction'
import textareaAndAttach from '@/components/morality-manager/pages/behaviorEntry/TextareaCom'
export default {
  name: 'detailsPage',
  components: {
    textArea,
    bg,
    item,
    appealPage,
    textareaAndAttach
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
    getData (url) {
      this.$preloaderFull.show({ mask: true })
      return this.$axios.get(url).then(({ data }) => {
        // console.log(data)
        this.$preloaderFull.close()
        if (data.status === 200) {
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
    postData (url, data, fn) {
      return this.$axios.post(url, data).then(({ data }) => {
        // console.log(data)
        this.$preloaderFull.close()
        if (data.status === 200) {
          fn && fn()
        } else {
          this.$toast.error(data.message)
          return Promise.reject(new Error(data.message))
        }
      }).catch((erro) => {
        this.$toast.error(erro.message)
        this.$preloaderFull.close()
        // console.log(erro)
      })
    },
    getEventInfo () {
      // this.classId = this.$route.query.class_id
      this.eventId = this.$route.query.event_id
      this.getData('/palm/v2/eventrecord?condition=school&event_id=' + this.eventId).then((data) => {
        // console.log(data)
        this.eventInfo = data.records[0]
        // this.imgUrl = require(this.eventInfo.image_url)
        this.eventInfo.event_date = dateTo(this.eventInfo.event_date)
        let imgUrl = this.eventInfo.image_url
        this.imgUrl = imgUrl === '' ? [] : imgUrl.split(',')
        local.set('eventInfo', this.eventInfo)
      })
    },
    commitAppeal (data) { // 提交申诉
      this.postData('/palm/v2/appeal/new', data, () => {
        this.$toast.success()
        this.$router.go(-1)
      })
    },
    deleteBehavior () { // 删除行为
      let _this = this
      let deleteData = $http.deleteDataPost
      this.$confirm({
        description: '确定删除吗？',
        onConfirm () {
          deleteData(_this, '/palm/v2/ruledel/' + _this.eventId, {}, () => { // 删除请求
            _this.$router.push({path: 'schoolBehaviorIndex'})
          })
          return true
        },
        onCancel () {
          return true
        }
      })
    },
    getAppealContent ({text}) { // 得到申诉内容
      let obj = {}
      obj.rule_event_id = this.event_id || this.$route.query.event_id
      obj.desc = text
      this.commitAppeal(obj)
      // console.log(text)
    },
    showAppeal () {
      this.$refs.appealPage.show()
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
  height: 72px;
  width: 76px;
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
.appeal-btn-outer {
  padding: 0px 15px;
  text-align: center;
  margin-top: 100px;
}
.appeal-btn-outer .appeal-a {
  display: inline-block;
  color: #fefefe;
  background-color: #88b8f8;
  font-size: 18px;
  height: 54px;
  line-height: 54px;
  width: 100%;
  border-radius: 8px;
}
/* .bottom-bar {
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
  width: 32.5%;
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
    background-color: #8e8080;
  }
} 
*/
</style>
