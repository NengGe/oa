<template>
  <div class="caigou  page-bg">
    <!-- 理由 -->
    <TextareaCom placeholder="请输入采购事由" :content.sync='textareaText'></TextareaCom>
    <!-- 交付日期 -->
    <FormCom class="FormCom">
      <cell text title="总金额" :content="amount+'元'" placeholder='请输入总金额(元)'></cell>
    </FormCom>
    <!-- 明细表单 -->
    <div class="form-list time-box" v-for="(item, i) in detailArr" :key="i">
      <div class="form-title">{{`明细表单${i+1}`}}</div>
      <FormCom>
        <cell input title="品名" :content.sync="item.name" placeholder='请输入品名'></cell>
        <cell input title="规格" :content.sync="item.size" placeholder='请输入规格'></cell>
        <cell input type='number' title="单价" :content.sync="item.price" placeholder='请输入单价'></cell>
        <cell input type='number' title="数量" :content.sync="item.num" placeholder='请输入数量'></cell>
      </FormCom>
      <div class="form-bottom addAndDel-box">
        <div class="addBtn" v-show="i === detailArr.length - 1">
          <span class="iconfont-approval">&#xe64d;</span>
          <span class="text" @click="addFormAction">添加</span>
        </div>
        <div class="delBtn" @click="delFormAction(i)" v-show="detailArr.length !== 1">
          <span class="iconfont-approval">&#xe690;</span>
          <span class="text">删除</span>
        </div>
      </div>
    </div>

    <!-- 审批 -->
    <oa-approvalProcess :needArrow="true" :needDelBtn="canChangeProcess" :needAddBtn="canChangeProcess" :approvalPersonArr="approvalPersonArr"></oa-approvalProcess>
    <!-- 抄送 -->
    <ccPersonCom :ccPersonArr="ccPersonArr" @addPerson="onMemberSelectB"></ccPersonCom>
    <!-- 附件 -->
    <attachmentCom :imgList="imgList"></attachmentCom>

    <!-- 确定按钮 -->
    <CommitBtnCom @action="commitBtnAction"></CommitBtnCom>

    <!-- 交付日期 -->
    <SlideSelectDate :show.sync="SlideSelectDateShow" :value.sync="dateStr" @error="timeError('开始时间不能晚于结束时间')"></SlideSelectDate>
    <!-- 选择审批成员 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
    <!-- 撤销确定提示 弹窗 -->
    <ConfirmBoxCom v-show="isShowConfirmBoxCom" title="提示" content='确定删除？' @confirmAction="onDelConfirm" @cancelAction="isShowConfirmBoxCom = false"></ConfirmBoxCom>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import { getApproveConf } from '@/components/approval/approvalStatic/js/commonServer.js'
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import ConfirmBoxCom from '@/modules/message-box/confirmBox'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDate.vue'
import ApprovalProcessCom from '@/components/commonCom/approvalProcess.vue'
import ccPersonCom from '@/components/commonCom/ccPersonCom'
import AttachmentCom from '@/components/commonCom/attachment'
import MemberSelect from '@/modules/member-select2'
export default {
  components: {
    Cell,
    FormCom,
    CommitBtnCom,
    TextareaCom,
    ConfirmBoxCom,
    SlideSelectDate,
    ApprovalProcessCom,
    MemberSelect,
    ccPersonCom,
    AttachmentCom
  },
  data () {
    return {
      canChangeProcess: true,
      canChangeCcpeople: true,
      // amount: '',
      currDelFormIndex: 0,
      imgList: [],
      fileList: [],
      attachmentList: [],
      ccPersonArr: [],
      isShowConfirmBoxCom: false,
      selectedData: {
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      },
      detailArr: [
        {
          name: '',
          size: '',
          num: '',
          price: ''
        }
      ],
      SlideSelectDateShow: false,
      dateStr: '',
      textareaText: '',
      approvalPersonArr: []
    }
  },
  watch: {
    amount () {
      this.getConf()
    }
  },
  computed: {
    amount () {
      let amount = 0
      this.detailArr.forEach(item => {
        let { num, price } = item
        amount += num * price
      })
      return amount
    }
  },
  created () {
    if (this.$route.query.detailData) {
      this.initData()
    }
  },
  methods: {
    initData () {
      let d = this.$route.query.detailData
      let { resource, process, cc_people } = d
      this.textareaText = resource.desc
      this.amount = resource.amount
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
      this.detailArr = resource.item_list.map(item => {
        return {
          name: item.name,
          size: item.spec,
          num: item.total,
          price: item.unit_price
        }
      })
    },
    // 获取--请假审批模板
    getConf () {
      console.log('获取--请假审批模板')
      getApproveConf.call(this, `/mobicampus/assets/v1/purchase/approveconf/match?amount=${this.amount}`)
        .then(data => {
          this.canChangeProcess = data.canChangeProcess
          this.approvalPersonArr = data.approvalPersonArr
          this.canChangeCcpeople = data.canChangeCcpeople
          this.ccPersonArr = data.ccPersonArr
          // this.selectedData.memberList = this.ccPersonArr
        })
    },
    // 确定删除
    onDelConfirm () {
      this.isShowConfirmBoxCom = false
      this.detailArr.splice(this.currDelFormIndex, 1)
    },
    // 添加 form
    addFormAction () {
      let formObj = {
        name: '',
        size: '',
        num: '',
        price: ''
      }
      this.detailArr.push(formObj)
    },
    // 删除 form
    delFormAction (i) {
      this.isShowConfirmBoxCom = true
      this.currDelFormIndex = i
      // this.detailArr.splice(i, 1)
    },
    // 成员替换
    onMemberAction (item) {
      this.$refs.vMemberSelect.show({
        onConfirm: (selectedData) => {
          if (selectedData.memberList.length === 0) return
          item.user_name = selectedData.memberList[0].user_name
          item.user_id = selectedData.memberList[0].user_id
        }
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
      if (this.isCommited) return 0
      this.isCommited = true
      let { textareaText, amount, approvalPersonArr, detailArr } = this
      if (!textareaText) {
        this.$simpleMsg('请输入采购事由')
        this.isCommited = false
        return false
      }
      if (!amount) {
        this.$simpleMsg('请输入总金额')
        this.isCommited = false
        return false
      }
      let flag = detailArr.every((item, i) => {
        let { name, size, num, price } = item
        if (!name) {
          this.$simpleMsg(`请输入采购明细${i + 1}的名称`)
          this.isCommited = false
          return false
        }
        if (!size) {
          this.$simpleMsg(`请输入采购明细${i + 1}的规格`)
          this.isCommited = false
          return false
        }
        if (!price) {
          this.$simpleMsg(`请输入采购明细${i + 1}的单价`)
          this.isCommited = false
          return false
        }
        if (!num) {
          this.$simpleMsg(`请输入采购明细${i + 1}的数量`)
          this.isCommited = false
          return false
        }
        return true
      })
      if (!flag) {
        return false
      }
      if (!approvalPersonArr.length) {
        this.$simpleMsg('请选择审批人')
        this.isCommited = false
        return false
      }
      this.postData()
    },
    postData () {
      let { textareaText, amount, detailArr, approvalPersonArr, ccPersonArr } = this
      detailArr = detailArr.map(item => {
        return {
          'name': item.name,
          'spec': item.size,
          'unit_price': item.price,
          'total': item.num
        }
      })
      let d = {
        'purchase': {
          'desc': textareaText,
          'amount': amount,
          'item_list': detailArr
        },
        'node_list': approvalPersonArr,
        'cc_people': ccPersonArr
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/mobicampus/assets/v1/purchase/application/create`, d).then(({ data }) => {
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
.caigou {
  overflow: hidden;
}
.FormCom {
  margin-top: 12px;
}
.form-list:first-child {
  margin-top: 12px;
}
.form-title {
  // margin: 0 12px;
  background: #efefef;
  line-height: 32px;
  text-align: center;
}
.addAndDel-box {
  padding: 0 80px;
  display: flex;
  text-align: center;
  line-height: 30px;
  .addBtn {
    flex: 1;
    color: #6db1f1;
  }
  .delBtn {
    flex: 1;
    color: red;
  }
}
</style>
