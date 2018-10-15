<template>
  <div class="main">
    <!-- <div class="main_header">
      <div class="tzheader">
        <div class="left">
          <button class="left" v-on:click="$router.back(-1)"><img src="../../assets/imgs/fh-b.png"></button>
        </div>
        <h3>新建纪要</h3>
        <div class="right"></div>
      </div>
    </div> -->
    <!-- 标题 -->
    <formTitle readonly :content.sync="detailData.meeting.title"></formTitle>
    <!-- 会议纪要 -->
    <richtextCom @updateContent='(p) => content=p' placeholder="*请输入会议纪要" :content='content' />
    <!-- 附件 -->
    <AttachmentCom :imgList="imgList"></AttachmentCom>
    <!-- <richtextCom placeholder="*会议纪要"></richtextCom> -->
    <div class="jiyao-main">
      <!-- <div class="mainbox">
        <h4>{{detailData.meeting.title}}</h4>
        <textarea cols="30" rows="5" placeholder="*会议纪要" v-model="content"></textarea>
      </div> -->
      <!-- <div class="mainbox photo-upload">
        <div class="img-box">
          <p>图片
            <span>(非必填)</span>
          </p>
        </div>
        <button class="camera" @click="()=>{bottomOptionsShow=1}">
          <img src="../../assets/imgs/conference/xj01.png" alt="">
        </button>
        <div class="img-box img-show-box">
          <ul class="img-show" @click="delImg">
            <li v-for="(filePath,i) of imgList" :key="'img'+i" @click="imgAction(imgList, i)"><img :src="filePath" data-type="1" alt="">
              <span :data-index="i">×</span>
            </li>
          </ul>
        </div>
        <div class="clearfix"></div>
        <div class="upload_files">
          <span id="filePath"></span>
          <input type="text" style="display:none" id="fileExtentName" />
          <input type="text" style="display:none" id="qiniuFilePath" />
          <div id="upload_files_list">
          </div>
        </div>
      </div> -->
      <!-- <div class="mainbox">
        <h5>实际参会人员：</h5>
        <ul class="arrivers">
          <li class="item" v-for="item in memberListAttend" class="active">{{item.user_name}}</li>
          <li class="item" v-for="item in memberListAbsent">{{item.user_name}}</li>
        </ul>
        <div class="clearfix"></div>
      </div> -->
    </div>
    <div class="member-box">
      <div class="title">实际参会人员：</div>
      <ul class="list">
        <li class="item active" v-for="(item, i) in memberListAttend"  :key="'memberListAttend'+i">{{item.user_name}}</li>
        <li class="item" v-for="(item, i) in memberListAbsent" :key="'memberListAbsent'+i">{{item.user_name}}</li>
      </ul>
    </div>
    <CommitBtnCom @action="addJiyao" :content="isEdit?'更新纪要':'确认'"></CommitBtnCom>
    <BottomOptions @select="onSelect" :show.sync="bottomOptionsShow">
      <ul>
        <li data-type="1">拍照</li>
        <li data-type="2">选取现有的</li>
      </ul>
    </BottomOptions>
  </div>
</template>
<script>
import '@/assets/css/conference.css'
import '@/assets/css/modules/conference-jiyao.scss'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import formTitle from '@/components/commonCom/form-title'
import richtextCom from '@/components/commonCom/richtextCom'
import AttachmentCom from '@/components/commonCom/attachment'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
// import { openCameraPhoto, dialogSelect } from '@/js/file-upload'
import { openCameraPhoto, openCameraPhotoMulti, UploadFileList, lookUpPicture } from '@/js/file-upload'
export default {
  components: {
    BottomOptions,
    formTitle,
    richtextCom,
    AttachmentCom,
    CommitBtnCom
  },
  props: ['id'],
  data () {
    return {
      aaa: 'aaa',
      content: '',
      imgList: [],
      attachmentList: [],
      bottomOptionsShow: 0,
      memberListAttend: [],
      memberListAbsent: [],
      isLoadAdd: false,
      isEdit: false,
      detailData: {
        meeting: { title: '' }
      },

      meetSummaryId: null
    }
  },
  created () {
    this.loadData()
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      // 编辑情况
      if (to.name === 'ConferenceEditJiyao') {
        vm.$axios.get('/mobicampus/meeting/v1/getMeetingSummary/' + vm.id).then(({ data }) => {
          if (data.status === 200) {
            let d = data.result.data
            vm.memberListAttend = d.participant_list_attended
            vm.memberListAbsent = d.participant_list_not_attended
            let meetSummary = d.meet_summary
            vm.meetSummaryId = meetSummary.id
            vm.content = meetSummary.content
            let { attachmentList, imgList } = vm
            meetSummary.attachment_list.forEach(d => {
              imgList.push(d.src)
              attachmentList.push(d)
            })
          }
        })
        vm.isEdit = true
      }
    })
  },
  methods: {
    imgAction (imgList, i) {
      lookUpPicture(imgList, i)
    },
    addImg (imgList) {
      // console.log('imgList', imgList)
      this.imgList.push(...imgList)
    },
    loadData () {
      this.isLoad = true
      this.$axios.get('/mobicampus/meeting/v1/getMeetingDetails/' + this.id).then(({ data }) => {
        if (data.status === 200) {
          let d = data.result.data
          let { memberListAttend, memberListAbsent } = this
          d.meeting_participant_list.forEach(d => {
            if (d.attended === 'true') {
              memberListAttend.push(d)
            } else {
              memberListAbsent.push(d)
            }
          })
          this.detailData = d
        }
      }).catch(e => {
        this.$simpleMsg(e)
      }).then(() => {
        this.isLoad = false
      })
    },
    onSelect (el) {
      switch (el.dataset.type) {
        case '1':
          this.bottomOptionsShow = 0
          this.$nextTick(() => openCameraPhoto().then(this.addImg))
          break
        default:
          this.bottomOptionsShow = 0
          this.$nextTick(() => openCameraPhotoMulti().then(this.addImg))
      }
    },
    delImg (e) {
      let { target } = e
      if (target.tagName === 'SPAN') {
        let { index } = target.dataset
        this.imgList.splice(index, 1)
        // this.attachmentList.splice(index, 1)
      }
    },
    addJiyao () {
      if (this.isLoadAdd) return
      this.isLoadAdd = true
      let { content } = this
      if (!content.trim()) {
        this.$simpleMsg('请填写纪要详情')
        return false
      }
      if (this.imgList.length === 0) { // 没有附件
        this.postMeeting()
        return
      }
      UploadFileList(this.imgList).then((dataList) => {
        if (dataList.length !== 0) { // 图片上传成功
          this.attachmentList = dataList
          this.postMeeting()
          // this.$simpleMsg('图片上传成功')
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
          this.isLoadAdd = false
        }
      })
    },
    // 提交数据
    postMeeting () {
      let { content } = this
      let data = {
        meet_id: this.id,
        content,
        attachment_list: this.attachmentList
      }
      let { isEdit } = this
      if (isEdit) {
        delete data.meet_id
        data.id = this.meetSummaryId
      }
      this.isLoadAdd = true
      this.$axios.post(`/mobicampus/meeting/v1/` + (isEdit ? 'updateMeetingSummary' : 'newMeetingSummary'), data).then(({ data }) => {
        if (data.status === 200) {
          this.$router.push({
            name: 'ConferenceDetail',
            params: { id: this.id }
          })
          this.isEdit = true
          this.$simpleMsg('纪要提交成功')
        }
        // this.$simpleMsg(data.message)
      }).catch(error => {
        this.$simpleMsg(error)
      }).then(() => {
        this.isLoadAdd = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.member-box{
  background: #fff;
  padding: 20px 25px;
  .title{
    line-height: 42px;
    color: #666;
    font-size: 15px;
    font-weight: bold;
  }
  .list{
    .item{
      display: inline;
      text-decoration: underline;
      color: #666;
      margin-right: 10px;
      font-size: 14px;
      &.active{
        color: #12b7f5;
      }
    }
  }
}
</style>

