<template>
  <div class="informDetail">
    <div class="title-box">
      <span class="title">{{dataObj.title}}</span>
    </div>
    <div class="personInfo-box">
      <div class="personInfo">
        <span class="personName">{{ dataObj.personName}}</span>
        <span class="">{{ `(${dataObj.deptName})` }}</span>
      </div>
      <div class="time-box">
        <span>{{ dataObj.time }}</span>
        <span class="revokeBtn" v-if="$route.params.status === '2'" @click="()=>isShowRevokeConfirmBox = true">撤销</span>
      </div>
    </div>
    <div class="contentText-box">
      <p>{{dataObj.contnetText}}</p>
    </div>
    <!-- 附件 -->
    <div class="document-box" v-if="dataObj.attachmentObj.imgList.length + dataObj.attachmentObj.imgList.length>0">
      <div class="img-box">
        <img :src="item.src" v-for="(item, i) in dataObj.attachmentObj.imgList" :key="'img'+i"  @click="imgAction(i)">
      </div>
      <div class="link-box">
        <a :href="item.src" v-for="(item, index) in dataObj.attachmentObj.docList" :key="'doc'+index">{{item.name}}</a>
      </div>
    </div>
    <!-- 详情页底部 根据通知状态显示 -->
    <div class="stick-box cf" v-if="$route.params.status === 'myReceive'">
      <span class="stick-left stickText">置顶</span>
      <LabelSwitch  :checked.sync="needStick" class="stick-right"></LabelSwitch>
    </div>

    <!--审批中... 详情页底部 根据通知状态显示 -->
    <!-- $route.params.status -->
    <div class="approvaling-box cf" v-else-if="processState === 0|| processState === 1">
      <span class="approvaling-left approvalingText">审批中...</span>
      <span class="approvaling-right approvalingText" @click="seeSatusAction">查看状态</span>
    </div>
    <!--已撤销... 详情页底部 根据通知状态显示 -->
    <div class="revoked-box"  v-else-if="processState === 4">
      <span class="revokedText">已撤销...</span>
      <div class="rePublishBtn" @click="()=>$router.push({name: 'informSend', params: {id: $route.params.id}})">重新发布公告</div>
    </div>
     <!--未发布... 详情页底部 根据通知状态显示 -->
    <div class="revoked-box"  v-else-if="processState === 3">
      <span class="revokedText">未发布...</span>
      <div class="rePublishBtn" @click="()=>$router.push({name: 'informSend', params: {id: $route.params.id}})">重新发布公告</div>
    </div>
    <!--已发布... 详情页底部 根据通知状态显示 -->
    <div class="published-box"  v-else-if="processState === 2">
      <div class="unread-box">
        <div class="head-box cf">
          <div class="head-left">
            <span class="bg"></span>
            <span class="unreadText">未阅读</span>
          </div>
          <div class="head-right">
            <span class="unread-btn">一键提醒</span>
          </div>
        </div>
        <div class="content-box">
          <span class="personName" v-for="(item,index) in dataObj.personReadingArr" :key="'reading'+index">{{ item.user_name }}</span>
        </div>
      </div>
      <div class="read-box">
        <div class="head-box">
          <span class="bg"></span>
          <span class="readText">已阅读</span>
        </div>
        <div class="content-box">
          <span class="personName" v-for="(item,index) in dataObj.personReadedArr" :key="'readed'+index">{{ item.user_name }}</span>
        </div>
      </div>
    </div>
    <!-- 撤销确定提示 弹窗 -->
    <confirmBoxCom v-show="isShowRevokeConfirmBox" title="提示"  content='确定撤销？' @confirmAction="onRevokeConfirm" @cancelAction="isShowRevokeConfirmBox = false"></confirmBoxCom>
  </div>
</template>

<script>
import LabelSwitch from '@/modules/label-switch/LabelSwitch'
import confirmBoxCom from '@/modules/message-box/confirmBox'
import { lookUpPicture } from '@/js/file-upload'
export default {
  data () {
    return {
      isShowRevokeBtn: false,
      isShowRevokeConfirmBox: false,
      needStick: false,
      processState: '',
      dataObj: {
        time: '',
        title: '',
        deptName: '',
        personName: '',
        contnetText: '',
        personReadingArr: [],
        personReadedArr: [],
        // processState: ''
        attachmentObj: {
          imgList: [],
          docList: []
        }
      }
      // personReadingArr: [],
      // personReadedArr: []
    }
  },
  created () {
    this.getDetailData().then((dataObj) => {
      if (!dataObj) return
      this.dataObj = dataObj
    })
  },
  watch: {
    'needStick': function () {
      // console.log('this.dataObj', this)
      if (this.needStick) {
        // console.log('置顶')
        this.postInformStick('stick2top', this.dataObj.announceID)
      } else {
        // console.log('取消置顶')
        this.postInformStick('unstick2top', this.dataObj.announceID)
      }
    }
  },
  components: {
    LabelSwitch,
    confirmBoxCom
  },
  methods: {
    // 点击图片 原生查看
    imgAction (i) {
      let imgList = this.dataObj.attachmentObj.imgList
      let imgSrcArr = imgList.map(item => {
        return item.src
      })
      // console.log('imgSrcArr', imgSrcArr, i)
      lookUpPicture(imgSrcArr, i)
    },
    // 确定撤销
    onRevokeConfirm () {
      this.postInformRevoke(this.dataObj.announceID)
      this.isShowRevokeConfirmBox = false
    },
    // 点击 查看状态
    seeSatusAction () {
      let id = parseInt(this.dataObj.applicationID)
      let type
      if (parseInt(this.dataObj.processState) === 1) {
        type = '2'
      } else {
        type = '3'
      }
      console.log('id', id, 'type', type, 'processState', this.dataObj.processState)
      this.$router.push({name: 'approvalDetail', params: {id: id, type: type}})
    },
    // 提交公告 撤销
    postInformRevoke (announceID) {
      return this.$axios.post(`/mobicampus/announce/v1/withdraw/${announceID}`).then(({data}) => {
        console.log('撤销', data)
        if (data.status === 200) {
          this.$simpleMsg('已撤销')
          this.$router.back()
        } else {
          console.log('撤销 失败')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 提交公告 置顶
    postInformStick (stickStr, announceID) {
      return this.$axios.post(`/mobicampus/announce/v1/${stickStr}/${announceID}`).then(({data}) => {
        // console.log('发布公告', data)
        if (data.status === 200) {
          console.log('成功')
        } else {
          // console.log('置顶 失败')
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取详情页数据
    getDetailData () {
      console.log('获取详情页数据')
      return this.$axios.get(`/mobicampus/announce/v1/getDetails/${this.$route.params.id}`).then(({data}) => {
        // let msg = '请求成功'
        console.log('公告详情-data', data)
        if (data.status === 200) {
          let returnData = data.result.data
          this.processState = returnData.process_state
          // 初始化 置顶 开关
          this.needStick = returnData.announce.stick2top_id !== '0'
          console.log('IF公告详情-data', data)
          // 判断公告是否已发布
          if (data.result.data.announce.need_approve === 'false' || data.result.data.announce.process_state === '2') {
            this.isShowRevokeBtn = true
          }
          // 提交时间
          let dateAndTime = returnData.announce.create_time.split('+')[0].split('T')
          let time = dateAndTime[0] + ' ' + dateAndTime[1]
          // 附件
          let attachmentObj = {
            imgList: [],
            docList: []
          }
          returnData.announce.attachment_list.map(item => {
            let type = this.checkFileType(item.name)
            let obj = {
              name: item.name,
              src: item.src
            }
            if (type === '41') { // 图片 附件
              attachmentObj.imgList.push(obj)
            } else if (type === '31') { // 文档 附件
              attachmentObj.docList[1].push(obj)
            }
          })
          let dataObj = {
            time,
            announceID: returnData.announce.id,
            applicationID: returnData.application_id,
            title: returnData.announce.title,
            deptName: returnData.announce.dept_name,
            personName: returnData.announce.create_user_name,
            contnetText: returnData.announce.content,
            personReadingArr: returnData.notif_people_havnt_read,
            personReadedArr: returnData.notif_people_have_read,
            processState: returnData.process_state,
            attachmentObj: attachmentObj
          }
          return dataObj
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 检测文件类型
    checkFileType (filePath) {
      // 返回String对象中子字符串最后出现的位置.
      let seat = filePath.lastIndexOf('.')
      // 返回位于String对象中指定位置的子字符串并转换为小写.
      let extension = filePath.substring(seat).toLowerCase()

      let imagAllowed = ['.jpg', '.gif', '.png', '.jpeg']
      for (let i = 0; i < imagAllowed.length; i++) {
        if (imagAllowed[i] === extension) {
          return '41'
        }
      }

      let documentAllowed = ['.txt', '.doc', '.docx', '.xls', '.xlsx', '.pdf', '.ppt', '.pptx', '.rar', '.zip']
      for (let i = 0; i < documentAllowed.length; i++) {
        if (documentAllowed[i] === extension) {
          return '31'
        }
      }

      let videoAllowed = ['.flv', '.3gp', '.avi', '.rmvb', '.rm', '.divx', '.mpg', '.mpeg', '.mpe', '.wmv', '.mp4', '.mkv', '.vob']
      for (let i = 0; i < videoAllowed.length; i++) {
        if (videoAllowed[i] === extension) {
          return '11'
        }
      }

      let soundAllowed = ['.cd', '.ogg', '.mp3', '.asf', '.wma', '.wav', '.mp3pro', '.midi', '.vqf']
      for (let i = 0; i < soundAllowed.length; i++) {
        if (soundAllowed[i] === extension) {
          return '21'
        }
      }
      return '51'
    }
  }

}
</script>

<style scoped>

  .informDetail{
    color: #666;
    padding: 0 15px 68px;
    font-size: 16px;
  }

  .informDetail .title-box{
    font-weight: bold;
    color: #333;
    font-size: 20px;
    line-height: 45px;
    height: 45px;
  }
  .informDetail .personInfo-box{
    line-height: 37px;
    height: 37px;
  }
  .informDetail .personInfo-box .personInfo{
    display: inline-block;
    font-size: 14px;
    color: #666;
  }
  .informDetail .personInfo-box .time-box{
     display: inline-block;
     color: #989898;
     font-size: 12px;

  }
  .informDetail .contentText-box{
    border-bottom: 1PX #ddd solid;
    padding-bottom: 18px;
    margin-bottom: 10px;
  }
  .informDetail .contentText-box>p{
    text-indent: 2em;
    line-height: 29px;
  }
  .informDetail .document-box{
    /* margin-top: 22px; */
    border-bottom: 1PX solid #ddd;
    padding-bottom: 10px;
    margin-bottom: 23px;
  }
  .informDetail .document-box .img-box{
    padding-left: 3px;
  }
  .informDetail .document-box .link-box{
    padding-left: 3px;
  }
  .informDetail .document-box .img-box img{
    width: 70px;
    height: 70px;
    border-radius: 4px;
    margin: 5px;
  }
  .informDetail .document-box .link-box a{
    font-size: 14px;
    color: #6eb8ff;
    text-decoration: underline;
  }
  /* .switchComponent{

  }
  .switchComponent .switchBottom{
    width: 36px;
    height: 20px;
    background: #e9e9e9;
    border-radius: 10px;
  }
  .switchComponent .switchSwiper{
    width: 27px;
    height: 27px;
    border: 1PX solid #c6c6c6;
    border-radius: 50%;
  } */
  .stick-box{
    height: 32px;
  }
  .stick-box .stick-left{
    line-height: 32px;
    float: left;
    font-size: 14px;
    color: #666;
  }
  .stick-box .stick-right{
    float: right;
  }
  .approvaling-box{

  }
  .approvaling-box .approvaling-left{
    float: left;
    font-size: 15px;
    color: #f59654;
    font-weight: bold;
    line-height: 28px;
  }
  .approvaling-box .approvaling-right{
    float: right;
    line-height: 29px;
    font-size: 14px;
    border: 1PX solid #568df4;
    color: #568df4;
    padding: 0 18px;
    border-radius: 4px;
    font-weight: bold;
  }
  .revoked-box{

  }
  .revoked-box .revokedText{
    line-height: 32px;
    color: #fc1714;
    font-size: 14px;
    font-weight: bold;
  }
  .revoked-box .rePublishBtn{
    margin-top: 40px;
    width: 100%;
    line-height: 51px;
    border: 1PX solid #568df4;
    color: #568df4;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
  }
  .published-box{

  }
  .published-box .unread-box{

  }
  .published-box .unread-box .head-box{

  }
  .published-box .unread-box .head-box .head-left{
    float: left;
    margin-top: 3px;
  }
  .published-box .unread-box .head-box .head-left .bg{
    display: inline-block;
    width: 11px;
    height: 17px;
    background: #e95b5a;
    vertical-align: middle;
  }
  .published-box .unread-box .head-box .head-left .unreadText{
    line-height: 17px;
    font-size: 14px;
    color: #e95b5a;
    vertical-align: middle;
  }
  .published-box .unread-box .head-box .head-right{
    float: right;
    line-height: 29px;
    font-size: 14px;
    border: 1PX solid #568df4;
    color: #568df4;
    padding: 0 18px;
    border-radius: 4px;
    font-weight: bold;
  }
  .published-box .unread-box .content-box{
    margin-top: 18px;
  }
  .published-box .unread-box .content-box .personName{
    display: inline-block;
    padding: 0 6px;
    font-size: 14px;
    color: #666;
  }
  .published-box .read-box{
    margin-top: 35px;
  }
  .published-box .read-box .head-box{

  }
  .published-box .read-box .head-box .bg{
    display: inline-block;
    width: 11px;
    height: 17px;
    background: #33cc40;
    vertical-align: middle;
  }
  .published-box .read-box .head-box .readText{
    line-height: 17px;
    font-size: 14px;
    color: #33cc40;
    vertical-align: middle;
  }
  .published-box .read-box .content-box{
    margin-top: 18px;
  }
  .published-box .read-box .content-box .personName{
    display: inline-block;
    padding: 0 6px;
    font-size: 14px;
    color: #666;
  }
  .revokeBtn{
    margin-left: 10px;
    text-decoration: underline;
  }


</style>
