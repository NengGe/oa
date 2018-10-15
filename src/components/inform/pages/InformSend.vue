<template>

  <div class='inform-send page-bg'>
    <!-- <div class='s-bg'></div> -->
    <!-- <div class='s-head'></div> -->
    <div class='s-main'>
      <FormTitle :content.sync="informTitleText" placeholder='请输入公告标题'></FormTitle>
      <FormCom class="form-com">
        <cell button title="类型" :content="informTypeText" @action="()=>bottomOptionsShow = true"></cell>
      </FormCom>
      <!-- 公告内容 -->
      <TextareaCom placeholder="请输入公告内容" :content.sync='informContentText'></TextareaCom>
      <!-- 抄送 -->
      <ccPersonCom title="通知对象" :needDelBtn="canChangeCcpeople" :needAddBtn="canChangeCcpeople" :ccPersonArr="ccPersonArr" @addPerson="onMemberSelectB"></ccPersonCom>


      <!-- 附件 -->
      <AttachmentCom :imgList="imgList"></AttachmentCom>
      <div class='s-item-box' v-if="0">
        <div class='sel'>
          <label class='lb'>短信通知</label>
          <LabelSwitch :checked.sync="needSmsnotif"></LabelSwitch>
        </div>
      </div>
      <!-- 审批 -->
      <ApprovalProcess-com :needDelBtn="canChangeProcess" :needAddBtn="canChangeProcess" v-show="needApprove" :needArrow='true' @addPerson='onMemberSelect' :approvalPersonArr='approvalPersonArr'></ApprovalProcess-com>
      <!-- 确定 -->
      <CommitBtnCom @action="commitBtnAction" content="发布公告"></CommitBtnCom>
    </div>
    <!-- 底部选择(外出类型) -->
    <BottomOptions :show.sync='bottomOptionsShow'>
      <ul>
        <li v-for='(item, index) in informTypeArr' :key='index' data-type='1' @click='()=>bottomListAction(item, index)'>{{item}}</li>
      </ul>
    </BottomOptions>
    <!-- 选择审批成员 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
  </div>

</template>

<script>
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import { getApproveConf } from '@/components/approval/approvalStatic/js/commonServer.js'
import MemberSelect from '@/modules/member-select2'
import LabelSwitch from '@/modules/label-switch/LabelSwitch'
import ApprovalProcessCom from '@/components/commonCom/approvalProcess.vue'
import AttachmentCom from '@/components/commonCom/attachment'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
import { UploadFileList } from '@/js/file-upload'
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import FormTitle from '@/components/commonCom/form-title'
import ccPersonCom from '@/components/commonCom/ccPersonCom'
export default {
  name: 'inform-send',
  components: {
    CommitBtnCom,
    LabelSwitch,
    ApprovalProcessCom,
    AttachmentCom,
    BottomOptions,
    MemberSelect,
    Cell,
    FormCom,
    TextareaCom,
    FormTitle,
    ccPersonCom
  },
  data () {
    return {
      selectedData: {
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      },
      canChangeProcess: true,
      canChangeCcpeople: true,
      isCommited: false, // 已经提交
      needApprove: true,
      needSmsnotif: false,
      needshortMessage: false,
      // 附件
      imgList: [],
      attachmentList: [],
      bottomOptionsShow: false,
      informTitleText: '',
      informContentText: '',
      informTypeText: '',
      informTypeID: '',
      informTypeArr: [],
      approvalPersonArr: [],
      ccPersonArr: []
    }
  },
  computed: {
    'noticePersonText': function () {
      let arrLength = this.ccPersonArr.length
      // console.log('this.ccPersonArr', this.ccPersonArr)
      if (arrLength) {
        return `${this.ccPersonArr[arrLength - 1].user_name}等${arrLength}人`
      }
      return '请选择'
    }
  },
  created () {
    // 初始化公告类型
    this.getInformType().then((types) => {
      this.informTypeArr = types
      if (this.$route.params.id && this.$route.params.id !== '0') {
        this.getDetailData()
      }
    })
  },
  methods: {
    getConf () {
      getApproveConf.call(this, `/mobicampus/announce/v1/getMatchedApproveConf/${this.informTypeID}`)
        .then(data => {
          this.canChangeProcess = data.canChangeProcess
          this.approvalPersonArr = data.approvalPersonArr
          this.canChangeCcpeople = data.canChangeCcpeople
          this.ccPersonArr = data.ccPersonArr
          this.selectedData.memberList = this.ccPersonArr
        })
    },
    // 添加附件
    // onAttachmentSelect () {
    //   console.log('添加附件')
    //   openCameraPhoto().then(this.addImg)
    //   // dialogSelect().then(this.addImg)
    // },
    // 添加审批人
    onMemberSelect () {
      this.$refs.vMemberSelect.show({
        type: 'single',
        // 确认事件
        onConfirm: selectedData => {
          console.log('selectedData', selectedData)
          let len = this.approvalPersonArr.length
          if (len && this.approvalPersonArr[len - 1].user_id === selectedData.memberList[0].user_id) {
            this.$simpleMsg('该成员与上级重复')
            this.member = true
            // console.log('IF中', this.member)
            return false
          }
          this.approvalPersonArr.push(selectedData.memberList[0])
          // 进行是否关闭判断
          // return false // 阻止自动关闭
        }
      })
    },
    // 添加通知对象
    onMemberSelectB () {
      this.$refs.vMemberSelect.show({
        // 类型：单选(single)(默认)、多选(multiple)
        type: 'multiple',
        // 已选项。初始选中。直接把确认拿到的数据丢过来即可
        selectedData: this.selectedData,
        // 确认事件
        onConfirm: selectedData => {
          this.selectedData = selectedData
          console.log('selectedData', selectedData)
          this.ccPersonArr = selectedData.memberListSubmit
        }
      })
    },
    // 选择底部列表
    bottomListAction (typeName, index) {
      this.informTypeText = typeName
      this.informTypeID = index + 1
      this.bottomOptionsShow = false
      this.getConf()
    },
    // 点击 发布公告
    commitBtnAction () {
      if (this.isCommited) return
      this.isCommited = true
      let { informTitleText, informContentText, informTypeText, approvalPersonArr, ccPersonArr } = this
      if (!informTitleText) {
        this.$simpleMsg('请输入公告标题')
        this.isCommited = false
        return false
      }
      if (!informContentText) {
        this.$simpleMsg('请输入公告内容')
        this.isCommited = false
        return false
      }
      if (!informTypeText) {
        this.$simpleMsg('请选择公告类型')
        this.isCommited = false
        return false
      }
      // console.log('approvalPersonArr', approvalPersonArr)
      if (this.needApprove && approvalPersonArr.length === 0) {
        this.$simpleMsg('请选择审批人')
        this.isCommited = false
        return false
      }
      if (ccPersonArr.length === 0) {
        this.$simpleMsg('请选择通知对象')
        this.isCommited = false
        return false
      }
      if (this.imgList.length === 0) { // 没有附件
        this.postPublishInform()
        return
      }
      UploadFileList(this.imgList).then((dataList) => {
        if (dataList.length !== 0) { // 图片上传成功
          this.attachmentList = dataList
          this.postPublishInform()
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
          this.isCommited = false
        }
      })
    },
    // 请求 公告类型 & 是否需要审批
    getInformType () {
      return this.$axios.get('/mobicampus/announce/v1/getInitInfo').then(({ data }) => {
        if (data.status === 200) {
          let typeList = data.result.data.announce_type_list
          let informTypeArr = []
          typeList.map((item, index) => {
            informTypeArr.push(item.name)
          })
          // 公告模块当前设置为是否需要审批
          this.needApprove = data.result.data.need_approve === 'true'
          return informTypeArr
        }
      }).catch(error => {
        this.$simpleMsg(error)
        console.log(error)
      })
    },
    // 请求公告内容
    getDetailData () {
      return this.$axios.get(`/mobicampus/announce/v1/getDetails/${this.$route.params.id}`).then(({ data }) => {
        console.log('请求公告内容', data)
        if (data.status === 200) {
          console.log('请求公告内容 成功', data)
          // 初始化数据
          let returnData = data.result.data
          this.informTitleText = returnData.announce.title
          this.informContentText = returnData.announce.content
          this.informTypeID = returnData.announce.type_id
          this.informTypeText = returnData.announce.type_name
          this.attachmentList = returnData.announce.attachment_list
          this.imgList = this.attachmentList.map(item => {
            return item.src
          })
          this.ccPersonArr = returnData.notif_people_have_read.concat(returnData.notif_people_havnt_read)
          // if (this.informTypeArr.needApprove) {
          // this.approvalPersonArr = returnData['node_list']
          // }
        }
      }).catch(error => {
        console.log(error)
        // this.$simpleMsg(error)
      })
    },
    // 提交公告
    postPublishInform () {
      this.isCommited = true
      let { informTitleText, informContentText, informTypeText, informTypeID, approvalPersonArr, ccPersonArr, needSmsnotif } = this
      let data = {
        'announce': {
          'title': informTitleText,
          'content': informContentText,
          'type_id': informTypeID,
          'type_name': informTypeText,
          'sms_notif': needSmsnotif,
          'attachment_list': this.attachmentList
        },
        'notif_people': ccPersonArr
      }
      if (this.needApprove) {
        data['node_list'] = approvalPersonArr
      }
      return this.$axios.post('/mobicampus/announce/v1/publish', data).then(({ data }) => {
        if (data.status === 200) {
          console.log('发布公告 成功', data)
          this.$router.replace({ name: 'mySend' })
        } else {
          console.log('发布公告 失败', data)
          this.isCommited = false
        }
      }).catch(error => {
        this.$simpleMsg(error)
      }).then(() => {
        this.isCommited = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.form-com{
  margin-top: 12px;
}
.inform-send {
  color: #666;
  .s-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .s-head {
    background-color: #2d71c3;
    /*width: 100%;*/
    height: 54px;
    position: relative;
    margin-bottom: -37px;
  }
  .s-main {
    position: relative;
  }
  .s-item-box {
    background-color: #fff;
    border-radius: 9px;
    /*width: 355px;*/
    margin: 10px;
    box-sizing: border-box;
    /*padding: 19px 15px 19px 19px;*/
    padding: 12px 19px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  .tit {
    font-size: 18px;
  }
  .ipt-in {
    width: 100%;
    box-sizing: border-box;
    border: 0;
    font-size: 16px;
    height: 28px;
    color: #333;
    outline: 0;
  }
  .ipt-in-txt {
    width: 100%;
    box-sizing: border-box;
    border: 0;
    font-size: 16px;
    color: #666;
    outline: 0;
    padding: 5px 0;
  }
  .ipt-in-txt.active {
    color: #333;
  }
  .sel {
    padding: 4px 0;
    .lb {
      height: 42px;
      // line-height: 42px;
      color: #666;
      font-size: 17px;
      font-weight: bold;
      padding: 4px 0;
    }
    .lb.active {
      color: #333;
    }
    .tip {
      float: right;
      color: #ccc;
      font-size: 15px;
      margin-top: 2px;
      i:after {
        content: "\e606";
        display: inline-block;
        transform: rotate(180deg);
        color: #b3b3b3;
        margin-left: 6px;
      }
    }
    .tip.active {
      color: #333;
    }
  }

  .sel-p {
    overflow: hidden;
    padding-bottom: 20px;
    .item {
      float: left;
      padding-right: 30px;
    }
    .ava {
      position: relative;
      width: 50px;
      height: 50px;
      img {
        width: 50px;
        height: 50px;
      }
      &:after {
        content: "\e656";
        color: #aaa;
        font-size: 20px;
        position: absolute;
        top: 13px;
        right: -24px;
      }
    }
    .name {
      text-align: center;
      padding-top: 4px;
    }

    .list {
      padding-top: 10px;
    }

    .add {
      float: left;
      width: 50px;
      height: 50px;
      font-size: 38px;
      line-height: 1.1;
      border-radius: 50%;
      text-align: center;
      box-sizing: border-box;
      border: 1PX solid #ddd;
      color: #ddd;
      font-weight: 100;
    }
  }
  .textarea-box textarea {
    resize: none;
  }
  .label-switch {
    float: right;
    margin-top: -5px;
  }

  .atta {
    .tit {
      position: relative;
      i {
        float: right;
        color: #ccc;
        font-size: 20px;
      }
      i:after {
        content: "\e605";
      }
    }
    .alist {
      min-height: 100px;
    }
  }

  .button {
    border: 0;
    color: #fff;
    font-size: 16px;
    background-color: #85c1fa;
    display: block;
    border-radius: 10px;
    padding: 16px 0;
    text-align: center;
    margin: 36px 10px;
    &:active {
      background-color: #92caff;
      color: #007bf1;
      text-shadow: 0 1PX 0 rgba(255, 255, 255, 0.3);
      text-decoration: none;
      -webkit-box-shadow: inset 0 1PX 3px rgba(0, 0, 0, 0.2);
      box-shadow: inset 0 1PX 3px rgba(0, 0, 0, 0.2);
    }
  }
  input::placeholder {
    color: #ccc;
  }
  textarea::placeholder {
    color: #ccc;
  }
}
</style>
