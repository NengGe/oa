<template>
  <div class="yongche  page-bg">
    <FormCom>
      <cell input type='number' title="总人数" :content.sync="totalNum" placeholder='填写数字'></cell>
      <!-- <cell input type='number' title="学生人数" :content.sync="studentNum" placeholder='填写数字'></cell> -->
      <cell button title='出发时间' :content="dateSelA" @action="()=>SlideSelectDateShowA = true"></cell>
      <cell button title='回程时间' :content="dateSelB" @action="()=>SlideSelectDateShowB = true"></cell>
      <cell input title="目的地" :content.sync="site" placeholder='填写位置'></cell>
    </FormCom>

    <!-- 理由 -->
    <TextareaCom placeholder="请输入用车事由" :content.sync='textareaText'></TextareaCom>
    <!-- 事由 -->
    <!-- <div class="reasonContent-box">
      <textarea v-model="textareaText" placeholder="请输入用车事由"></textarea>
    </div> -->
    <!-- 审批 -->
    <oa-approvalProcess :needArrow="true" :needDelBtn="canChangeProcess" :needAddBtn="canChangeProcess" :approvalPersonArr="approvalPersonArr"></oa-approvalProcess>
    <!-- 抄送 -->
    <ccPersonCom :needDelBtn="canChangeCcpeople" :needAddBtn="canChangeCcpeople" :ccPersonArr="ccPersonArr" @addPerson="onMemberSelectB"></ccPersonCom>
    <!-- 抄送 -->
    <!-- <ApprovalProcessCom   :needArrow="false" title="抄送人"  @addPerson='onMemberSelectB' :deptList="selectedData.deptList"
                          :approvalPersonArr="selectedData.memberList"></ApprovalProcessCom> -->
    <!-- 附件 -->
    <attachmentCom :imgList="imgList"></attachmentCom>
    <!-- 确定按钮 -->
    <CommitBtnCom @action="commitBtnAction"></CommitBtnCom>
    <!-- 出发时间 -->
    <SlideSelectDate :show.sync="SlideSelectDateShowA" :value.sync="dateSelA" :maxValue="dateSelB" @error="timeError('开始时间不能晚于结束时间')"></SlideSelectDate>
    <!-- 回程时间 -->
    <SlideSelectDate :show.sync="SlideSelectDateShowB" :value.sync="dateSelB" :minValue="dateSelA" @error="timeError('结束时间不能早于开始时间')"></SlideSelectDate>
    <!-- 选择审批成员 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import MemberSelect from '@/modules/member-select2'
import { getApproveConf } from '@/components/approval/approvalStatic/js/commonServer.js'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDateAndTime.vue'
import ApprovalProcessCom from '@/components/commonCom/approvalProcess.vue'
import ccPersonCom from '@/components/commonCom/ccPersonCom'
import AttachmentCom from '@/components/commonCom/attachment'
export default {
  components: {
    CommitBtnCom,
    MemberSelect,
    SlideSelectDate,
    ApprovalProcessCom,
    ccPersonCom,
    AttachmentCom,
    TextareaCom,
    Cell,
    FormCom
  },
  data () {
    return {
      isCommited: false,
      selectedData: {
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      },
      canChangeProcess: true,
      canChangeCcpeople: true,
      totalNum: '',
      // studentNum: '',
      imgList: [],
      fileList: [],
      attachmentList: [],
      approvalPersonArr: [],
      ccPersonArr: [],
      textareaText: '',
      site: '',
      dateSelA: '',
      dateSelB: '',
      bottomOptionsShow: false,
      SlideSelectDateShowA: false,
      SlideSelectDateShowB: false
    }
  },
  watch: {
    'dateSelA': function () {
      if (this.dateSelA && this.dateSelB) {
        this.getConf()
      }
    },
    'dateSelB': function () {
      if (this.dateSelA && this.dateSelB) {
        this.getConf()
      }
    }
  },
  created () {
    // this.site = '深圳'
    if (this.$route.query.detailData) {
      this.initData()
    }
  },
  methods: {
    initData () {
      let d = this.$route.query.detailData
      console.log(d)
      let { resource, process, cc_people } = d
      this.totalNum = resource.number_of_people
      this.dateSelA = this.$getTimeStr(resource.setoff_time, 'yy-mm-dd hh:mm', false).replace(' ', '  ')
      this.dateSelB = this.$getTimeStr(resource.getback_time, 'yy-mm-dd hh:mm', false).replace(' ', '  ')
      this.site = resource.destination
      this.textareaText = resource.desc
      this.approvalPersonArr = process.node_list.map(item => {
        return {
          user_name: item.user_name,
          user_id: item.user_id
        }
      })
      this.ccPersonArr = cc_people.map(item => {
        return {
          user_name: item.user_name,
          user_id: item.user_id
        }
      })
    },
    // 获取--请假审批模板
    getConf () {
      console.log('获取--请假审批模板')
      getApproveConf.call(this, `/mobicampus/car/v1/carusing/approveconf/match`)
        .then(data => {
          this.canChangeProcess = data.canChangeProcess
          this.approvalPersonArr = data.approvalPersonArr
          this.canChangeCcpeople = data.canChangeCcpeople
          this.ccPersonArr = data.ccPersonArr
          // this.selectedData.memberList = this.ccPersonArr
        })
    },
    // 添加抄送人
    onMemberSelectB (memberArr) {
      console.log('this.ccPersonArr', this.ccPersonArr)
      this.$refs.vMemberSelect.show({
        // 类型：单选(single)(默认)、多选(multiple)
        type: 'multiple',
        // 已选项。初始选中。直接把确认拿到的数据丢过来即可
        selectedData: this.selectedData,
        // 确认事件
        onConfirm: selectedData => {
          this.selectedData = selectedData
          this.ccPersonArr = selectedData.memberListSubmit
        }
      })
    },
    // 提交按钮
    commitBtnAction () {
      let { totalNum, dateSelA, dateSelB, site, textareaText, approvalPersonArr } = this
      if (!totalNum) {
        this.$simpleMsg('请输入总人数')
        return false
      }
      if (!dateSelA) {
        this.$simpleMsg('请选择出发时间')
        return false
      }
      if (!dateSelB) {
        this.$simpleMsg('请选择回程时间')
        return false
      }
      if (!site) {
        this.$simpleMsg('请输入目的地')
        return false
      }
      if (!textareaText) {
        this.$simpleMsg('请输入用车理由')
        return false
      }
      if (!approvalPersonArr.length) {
        this.$simpleMsg('请选择审批人')
        return false
      }
      // if (this.imgList.length === 0) { // 没有附件
      //   this.postCreateApplication()
      //   return
      // }
      this.postData()
    },
    postData () {
      let { totalNum, dateSelA, dateSelB, site, textareaText, approvalPersonArr, ccPersonArr } = this
      let d = {
        car_using: {
          number_of_people: totalNum,
          setoff_time: dateSelA,
          getback_time: dateSelB,
          destination: site,
          desc: textareaText
        },
        node_list: approvalPersonArr,
        cc_people: ccPersonArr
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/mobicampus/car/v1/carusing/application/create`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$router.replace({ name: 'commitCom' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.yongche {
  padding-top: 12px;
  padding-bottom: 36px;
}
</style>
