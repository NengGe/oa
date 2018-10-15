<template>
  <div class="entry-index">
    <bg></bg>
    <kindItem @click="isacordoBject=!isacordoBject" :inputInfo="objInfo">
      <span class="system-item" slot="left-item">对象</span>
    </kindItem>
    <!-- 制度 -->
    <kindItem @click="isacordSystem=!isacordSystem" :inputInfo="systemName"></kindItem> 
    <upload ref="upload" @transImgUrl="getImgUrl"></upload>
    <kindItem @click="SlideSelectDateShow=!SlideSelectDateShow" :inputInfo="currentTime">
      <span class="system-item" slot="left-item">时间</span>
    </kindItem>
    <div class="preserve" @click="preserve">
      <a href="javascript:;" class="preserve-a">确定</a>
    </div>
    <!-- <transition name="slide"> -->
      <acordObject 
        :class="{'transtop': isacordoBject}"
        @click="chooseObj"
        @close="choiceList={}"
        @transId="transId"
      ></acordObject>
    <!-- </transition> -->
    <!-- 制度选择 -->
    <!-- <transition name="slide">  -->
      <acordSystem
        @sure="chooseSystem"
        :class="{'transtop': isacordSystem}" 
        :periodId="periodId"
        :classId="classId"
      ></acordSystem>
    <!-- </transition> -->
    <!-- 时间选择器 -->
    <SlideSelectDate 
      :show.sync='SlideSelectDateShow' 
      :value.sync='startTime' 
      @error="$simpleMsg(' 开始时间不能晚于结束时间 ')"
    ></SlideSelectDate>
  </div>
</template>
<script>
import bg from '@/components/classManager/components/bg'
import kindItem from '@/components/classManager/components/kindItem'
import upload from '@/components/classManager/components/upload'
import acordObject from '@/components/classManager/entryBehavior/acordObject'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDateAndTime2'
import acordSystem from '@/components/classManager/entryBehavior/acordSystem'
import getCurrentTime from '@/components/classManager/assets/js/getCurrentTime.js'
// import { UploadFileList } from '@/js/file-upload.js'
import uploadImg from '@/components/classManager/assets/js/uploadImg.js'
export default {
  name: 'entryIndex',
  components: {
    bg,
    kindItem,
    upload,
    acordObject,
    SlideSelectDate,
    acordSystem
  },
  data () {
    return {
      isacordoBject: false,
      isacordSystem: false,
      choiceList: {}, // 选择对象
      eventList: {}, // 制度对象
      SlideSelectDateShow: false,
      startTime: '',
      endTime: '',
      objInfo: '', // 选择的对象信息
      systemName: '', // 选择的制度
      periodId: '',
      classId: '',
      imgUrl: ''
    }
  },
  methods: {
    postData (url, data, fn) { // post请求
      this.$preloaderFull.show({ mask: true })
      return this.$axios.post(url, data).then(({data}) => {
        this.$preloaderFull.close()
        this.$toast.success()
        if (data.status === 200) {
          fn && fn()
        } else {
          return Promise.reject(new Error(data.message))
        }
      }).catch((err) => {
        // this.$toast.error('保存失败!')
        this.$preloaderFull.close()
        console.log(err)
      })
    },
    transId ({periodId, classId}) {
      this.periodId = periodId
      this.classId = classId
    },
    addAction () { // 保存行为数据
      let {choiceList, eventList, currentTime} = this
      let data = {}
      data.event_id = 0
      data.users = []
      for (var k in choiceList) {
        data.class_id = choiceList[k].class_id
        data.users.push({
          user_id: choiceList[k].user_id,
          user_name: choiceList[k].user_name
        })
      }
      data.rule_item_id = eventList.item_id
      data.description = this.getIntro()
      data.type = 2
      data.event_date = currentTime
      data.score = eventList.score
      data.source = 3
      data.image_url = this.imgUrl
      // console.log(data)
      this.postData('/palm/v2/rules', data, () => {
        this.$toast.success()
        this.$router.go(-1)
        // console.log('班级行为保存成功!')
        this.insertInfo()
      })
    },
    chooseObj (obj) {
      // console.log(obj)
      this.isacordoBject = false
      this.choiceList = obj
    },
    chooseSystem (obj) {
      this.eventList = obj
      this.isacordSystem = false
      // if (obj.item_name) {
      this.systemName = obj.item_name
      // console.log(this.systemName)
      // }
    },
    getImgUrl (imgUrl) {
      this.imgUrl = imgUrl
      // console.log(this.imgUrl)
      // console.log(this.imgUrl.split(','))
    },
    getIntro () {
      return this.$refs.upload.getIntro()
    },
    insertInfo () { // 消息插入推送
      let _this = this
      if (this.classId && this.classId !== '0') {
        this.postData('/classcard/v1/newTask', {class_id: _this.classId})
      }
    },
    preserve () { // 保存
      let {objInfo, systemName, currentTime} = this
      // let introInfo = this.getIntro()
      if (!objInfo) {
        this.$toast('对象不能为空!')
        return
      }
      if (!systemName) {
        this.$toast('制度不能为空!')
        return
      }
      if (!currentTime) {
        this.$toast('时间不能为空!')
        return
      }
      uploadImg(this, this.imgUrl).then(dataUrl => {
        this.imgUrl = dataUrl
        this.addAction()
      })
    }
  },
  watch: {
    choiceList () {
      let keys = Object.keys(this.choiceList)
      if (keys.length >= 2) {
        let info = keys === 2 ? '' : '等'
        this.objInfo = this.choiceList[keys[0]].user_name + '、' + this.choiceList[keys[1]].user_name + info
      } else if (keys.length && keys.length === 1) {
        this.objInfo = this.choiceList[keys[0]].user_name
      } else {
        this.objInfo = ''
      }
    }
  },
  created () {
    this.periodId = this.$managerBus.periodId
    this.classId = this.$managerBus.classId
    // console.log('hehe')
  },
  computed: {
    currentTime () {
      return this.startTime || getCurrentTime()
    }
  }
}
</script>
<style scoped>
.entry-index {

}
.entry-index /deep/ .iconfont {
  font-family: "iconfont-morality";
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #ffffff; */
}
.preserve {
  padding: 0px 15px;
  margin-top:30px;
}
.preserve-a {
  display: inline-block;
  height: 54px;
  line-height: 54px;
  width: 100%;
  color: #fefefe;
  font-size: 18px;
  background-color: #53a2ed;
	border-radius: 5px;
  text-align: center;
  /* font-weight: bold; */
  &:active {
    background-color: #a1c2ef;
  }
}
.transtop {
  transform: translateY(0%)
}
.slide-enter-active, .slide-leave-active {
  transition: transform .3s;
}
.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100%);
}
</style>
