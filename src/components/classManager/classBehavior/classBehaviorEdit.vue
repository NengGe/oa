
<template>
  <div class="classBehaviorEdit">
    <bg></bg>
    <item>
      <div class="right">
        <span class="right-s">{{eventInfo.grade_name}}{{eventInfo.class_name}}，</span>
        <span class="right-s">{{eventInfo.user_name}}</span>
      </div>
    </item>
    <item htmlContent="制度" @click="isacordSystem=!isacordSystem">
      <div class="right">
        <span class="right-s">{{system}}</span>
      </div>
    </item>
    <item htmlContent="时间" @click="SlideSelectDateShow = !SlideSelectDateShow">
      <div class="right">
        <span class="right-s">{{time}}</span>
      </div>
    </item>
    <upload 
    :inputContent="introduction"
     @transImgUrl="getImgUrl" 
     :imgList="imgUrl"
     ref="upload"
    ></upload>
    <div class="appeal-speak">
       <span class="appeal-s">申诉说明：</span>
    </div>
       <!-- 底部选择附件上传类型 -->
    <!-- <BottomOptions :show.sync="bottomOptionsShowB">
      <ul class="bottomList">
        <li v-for="(item, i) in wayList" :key="'wayList'+i" @click="()=>onWaySelect(item)">{{item.text}}</li>
      </ul>
    </BottomOptions> -->
    <!-- 根据制度 -->
    <acordSystem
      @sure="chooseSystem"
      :class="{'transtop': isacordSystem}" 
      :classId="classId"
    ></acordSystem>
    <SlideSelectDate 
      :show.sync='SlideSelectDateShow' 
      :value.sync='startTime' 
      @error="$simpleMsg(' 开始时间不能晚于结束时间 ')"
    ></SlideSelectDate>
    <sureBtn sureVal="保存" @click="preseve" ref="sureBtn"></sureBtn>
  </div>
</template>
<script>
import textArea from '@/components/classManager/components/textArea'
import bg from '@/components/classManager/components/bg'
import item from '@/components/classManager/components/item.vue'
import local from '@/components/classManager/assets/js/localStore.js'
import sureBtn from '@/components/classManager/components/sureBtn'
import closeTag from '@/components/classManager/components/closeTag'
// import BottomOptions from '@/modules/bottom-options/BottomOptions'
import upload from '@/components/classManager/components/upload'
// import { openCameraPhoto, openCameraPhotoMulti, lookUpPicture, UploadFileList } from '@/js/file-upload'
import acordSystem from '@/components/classManager/entryBehavior/acordSystem'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDateAndTime2'
import uploadImg from '@/components/classManager/assets/js/uploadImg.js'
export default {
  name: 'classBehaviorEdit',
  components: {
    textArea,
    bg,
    item,
    sureBtn,
    closeTag,
    acordSystem,
    SlideSelectDate,
    upload
  },
  data () {
    return {
      imgUrl: '',
      bottomOptionsShowB: false,
      // wayList: [{ text: '相机', fn: openCameraPhoto }, { text: '相册', fn: openCameraPhotoMulti }],
      isacordSystem: false,
      system: '', // 制度
      introduction: '', // 说明
      SlideSelectDateShow: false,
      startTime: '',
      time: '',
      ruleItemId: '', // 制度的id
      score: '0'
    }
  },
  methods: {
    postData (url, data, fn) { // post请求
      this.$preloaderFull.show({ mask: true })
      return this.$axios.post(url, data).then(({data}) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          // console.log(data)
          fn && fn()
          this.$toast.success()
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
    getImgUrl (imgUrl) {
      this.imgUrl = imgUrl.join(',')
    },
    chooseSystem (obj) { // 选择制度
      // console.log(obj)
      let len = Object.keys(obj).length
      if (len) {
        this.system = obj.item_name
        this.ruleItemId = obj.item_id
        this.score = obj.score
      }
      this.isacordSystem = !this.isacordSystem
    },
    getPinnerHTML () {
      this.introduction = this.$refs.upload.getIntro()
      // console.log('(' + this.introduction.length + ')')
    },
    getPostJson () { // 得到要编辑提交的数据
      let obj = {}
      obj.users = []
      obj.users.push({user_id: this.eventInfo.user_id, user_name: this.eventInfo.user_name})
      obj.event_id = this.eventInfo.event_id
      obj.class_id = this.eventInfo.class_id
      obj.description = this.introduction
      obj.rule_item_id = this.ruleItemId
      obj.type = '2'
      obj.event_date = this.time
      obj.source = '3'
      obj.score = this.score
      obj.image_url = this.imgUrl
      return obj
    },
    preseve () {
      this.getPinnerHTML()
      if (!this.system) {
        this.$toast('制度信息不能为空！')
        return
      }
      if (!this.time) {
        this.$toast('时间不能空！')
        return
      }

      const preserveAjax = () => {
        let obj = this.getPostJson()
        this.postData('/palm/v2/rules', obj, () => {
          // _this.$router.replace({path: 'classBehavior'}) // query: {class_id: _this.eventInfo.class_id, event_id: _this.eventInfo.event_id}
          this.$router.back()
        })
      }
      uploadImg(this, this.imgUrl).then(dataUrl => { // 图片上传保存
        this.imgUrl = dataUrl
        preserveAjax()
      })
    },
    initInfo () {
      let {eventInfo} = this
      this.system = eventInfo.rule_item_name
      this.introduction = eventInfo.event_desc
      this.time = eventInfo.event_date
      this.ruleItemId = eventInfo.rule_item_id
      this.score = eventInfo.score
      this.imgUrl = eventInfo.image_url
    }
  },
  computed: {
    eventInfo () {
      return JSON.parse(local.get('eventInfo')) || {}
    },
    classId () {
      return this.eventInfo.class_id
    }
  },
  created () {
    this.initInfo()
    // this.time = this.startTime
    // console.log(eventInfo)
  },
  watch: {
    startTime () {
      this.time = this.startTime
    }
  },
  mounted () {
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

.classBehaviorEdit /deep/ .iconfont {
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