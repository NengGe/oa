
<template>
  <div class="schoolBehaviorEdit">
    <bg></bg>
    <item>
      <div class="right">
        <span class="right-s">{{eventInfo.grade_name}}{{eventInfo.class_name}}</span>
        <span class="right-s" v-if="eventInfo.user_name">{{eventInfo.user_name}}</span>
      </div>
    </item>
    <item htmlContent="制度" @click="setRule">
      <div class="right">
        <span class="right-s">{{system}}</span>
      </div>
    </item>
    <div class="introduction">
      <p class="intro-p">说明：
      <p contenteditable class="introduction-content" ref="content">{{introduction}}</p>
      <div class="img-box">
        <div class="img-inner">
          <div class="img-block" v-if="imgUrl">
            <img :src="imgUrl" alt="" width="100%" height="100%">
            <closeTag :size="14" class="innerTag" @close="close"></closeTag>  
          </div>
          <i class="iconfont-morality pic" v-else  @click.stop="bottomOptionsShowB=!bottomOptionsShowB">&#xe637;</i>
        </div>
      </div>
    </div>
    <item htmlContent="时间" @click="SlideSelectDateShow = !SlideSelectDateShow">
      <div class="right">
        <span class="right-s">{{time}}</span>
      </div>
    </item>
       <!-- 底部选择附件上传类型 -->
    <BottomOptions :show.sync="bottomOptionsShowB">
      <ul class="bottomList">
        <li v-for="(item, i) in wayList" :key="'wayList'+i" @click="()=>onWaySelect(item)">{{item.text}}</li>
      </ul>
    </BottomOptions>
    <!-- 根据制度 -->
    <!-- <acordSystem
      @sure="chooseSystem"
      :class="{'transtop': isacordSystem}" 
    ></acordSystem> -->
    <SlideSelectDate 
      :show.sync='SlideSelectDateShow' 
      :value.sync='startTime' 
      @error="$simpleMsg(' 开始时间不能晚于结束时间 ')"
    ></SlideSelectDate>
    <selectRule ref='selectRule'></selectRule>
    <sureBtn sureVal="保存" @click="preseve" ref="sureBtn"></sureBtn>
  </div>
</template>
<script>
import textArea from '@/components/morality-manager/components/textArea'
import bg from '@/components/morality-manager/components/bg'
import item from '@/components/morality-manager/components/item.vue'
import local from '@/components/morality-manager/assets/js/localStore.js'
import sureBtn from '@/components/morality-manager/components/sureBtn'
import closeTag from '@/components/morality-manager/components/closeTag'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
import { openCameraPhoto, openCameraPhotoMulti, lookUpPicture, UploadFileList } from '@/js/file-upload'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDateAndTime2'
import selectRule from '@/components/morality-manager/com/select-rule' // 录入制度
export default {
  name: 'schoolBehaviorEdit',
  components: {
    textArea,
    bg,
    item,
    sureBtn,
    closeTag,
    BottomOptions,
    SlideSelectDate,
    selectRule
  },
  data () {
    return {
      imgUrl: '',
      bottomOptionsShowB: false,
      wayList: [{ text: '相机', fn: openCameraPhoto }, { text: '相册', fn: openCameraPhotoMulti }],
      // isacordSystem: false, // 是否显示制度
      system: '', // 制度
      introduction: '', // 说明
      SlideSelectDateShow: false,
      startTime: '',
      time: '',
      ruleItemId: '', // 制度的id
      score: '0',
      changeRules: {}
    }
  },
  methods: {
    postData (url, data, fn) { // post请求
      this.$preloaderFull.show({ mask: true })
      // console.log(data)
      return this.$axios.post(url, data).then(({data}) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          // console.log(data)
          fn && fn()
          this.$toast.success('保存成功!')
        } else {
          this.$toast.error('保存失败!')
          return Promise.reject(new Error(data.message))
        }
      }).catch((err) => {
        this.$preloaderFull.close()
        this.$toast.error('保存失败!')
        console.log(err)
      })
    },
    close () {
      // alert(1)
      this.imgUrl = ''
    },
    setRule () {
      this.$refs.selectRule.show({
        confirm: d => {
          this.changeRules = d[0]
          this.chooseSystem(this.changeRules)
          // console.log(this.system)
        }
      })
    },
    imgAction (imgList, i) {
      lookUpPicture(imgList, i)
    },
    onWaySelect (item) {
      this.bottomOptionsShowB = false
      item.fn().then(this.addImg)
    },
    addImg (imgList) {
      // this.imgList.push(...imgList)
      // console.log(imgList)
      UploadFileList(imgList).then(dataList => {
        if (dataList.length) {
          this.imgUrl = dataList[0].src
        } else {
          this.$simpleMsg('图片上传失败，请重新提交')
        }
      })
    },
    chooseSystem (obj) { // 选择制度
      // console.log(obj)
      let len = Object.keys(obj).length
      if (len) {
        this.system = obj.item_name
        this.ruleItemId = obj.item_id
        this.score = obj.score
      }
      // this.isacordSystem = !this.isacordSystem
    },
    getPinnerHTML () {
      this.introduction = this.$refs.content.innerText.replace(/\s*/g, '')
      // console.log('(' + this.introduction.length + ')')
    },
    getPostJson () { // 得到要编辑提交的数据
      let obj = {}
      // obj.users = []
      // obj.users.push({user_id: this.eventInfo.user_id, user_name: this.eventInfo.user_name})
      obj.submit_type = 'user'
      obj.rule_event = {}
      obj.rule_event.event_id = this.eventInfo.event_id
      obj.rule_event.class_id = this.eventInfo.class_id
      obj.rule_event.user_id = this.eventInfo.user_id
      obj.rule_event.user_name = this.eventInfo.user_name
      obj.rule_event.rule_item_id = this.ruleItemId
      obj.rule_event.description = this.introduction
      obj.rule_event.type = '1'
      obj.rule_event.event_date = this.time
      obj.rule_event.score = this.score
      obj.rule_event.dorm_id = this.eventInfo.dorm_id
      obj.rule_event.image_url = this.imgUrl
      // obj.event_id = this.eventInfo.event_id
      // obj.class_id = this.eventInfo.class_id
      // obj.description = this.introduction
      // obj.rule_item_id = this.ruleItemId
      // obj.type = '1'
      // obj.event_date = this.time
      // obj.source = '3'
      // obj.score = this.score
      // obj.image_url = this.imgUrl
      return obj
    },
    preseve () {
      this.getPinnerHTML()
      let _this = this
      if (!this.system) {
        this.$toast('制度信息不能为空！')
        return
      }
      if (!this.introduction) {
        this.$toast('内容说明不能为空！')
        return
      }
      if (!this.time) {
        this.$toast('时间不能空！')
        return
      }
      let obj = this.getPostJson()
      // console.log(obj)
      this.$confirm({
        description: '确定保存？',
        onConfirm () {
          _this.postData('/palm/v2/event/neworupdate', obj, () => {
            _this.$router.replace({path: 'schoolBehaviorIndex'}) // query: {class_id: _this.eventInfo.class_id, event_id: _this.eventInfo.event_id}
          })
          return true
        },
        onCancle () {
          return true
        }
      })
      // console.log(this.introduction)
    }
  },
  computed: {
    eventInfo () {
      return JSON.parse(local.get('eventInfo')) || {}
    }
  },
  created () {
    let {eventInfo} = this
    this.system = eventInfo.rule_item_name
    this.introduction = eventInfo.event_desc
    this.time = eventInfo.event_date
    this.ruleItemId = eventInfo.rule_item_id
    this.score = eventInfo.score
    this.imgUrl = eventInfo.image_url
    // this.time = this.startTime
    // console.log(eventInfo)
  },
  watch: {
    startTime () {
      this.time = this.startTime
    }
  },
  mounted () {
    // this.$toast('eheheheh')
    let cHeight = document.documentElement.clientHeight // fixed布局按钮会随软键盘弹起而移动遮挡内容
    window.addEventListener('resize', () => {
      if (document.documentElement.clientHeight < cHeight) {
        this.$refs.sureBtn.setStatic()
      } else {
        this.$refs.sureBtn.setFixed()
      }
    })
  }
}
</script>
<style scoped>

.schoolBehaviorEdit /deep/ .iconfont-morality {
  font-family: "iconfont-morality";
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
}
.introduction-content{
  color: #666666;
  font-weight: normal;
  height: 60px;
  overflow: auto;
  /* margin-bottom: 45px; */
}
.introduction-content:focus {
  border: none;
  outline: none;
}
.img-box img {
  border-radius: 5px;
}
.img-inner {
  position: relative;
  height: 56px;
  width: 56px;
  line-height: 56px;
  border: solid 1px #666666;
  border-radius: 5px;
  text-align: center;
}
.img-inner .img-block{
  width: 100%;
  height: 100%;
  border: none;
}
.innerTag {
  position: absolute;
  right: -6px;
  top: -6px;
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
.introduction i.pic {
  font-size: 30px;
  color: #666666;
}
.transtop {
  transform: translateY(0%)
}

</style>