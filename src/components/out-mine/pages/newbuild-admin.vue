<template>
  <div class="waichu  page-bg">
    <FormCom>
      <cell button title="外出类型" :content="typeName" @action="()=>bottomOptionsShow = true"></cell>
      <cell button title="开始时间" :content="dateSelA" @action="()=>SlideSelectDateShowA = true"></cell>
      <cell button title="结束时间" :content="dateSelB" @action="()=>SlideSelectDateShowB = true"></cell>
      <cell input title="目的地" :content.sync="site" placeholder='填写位置'></cell>
      <cell input type='number' title="预算金额" :content.sync="budget" placeholder='(元)'></cell>
    </FormCom>

    <!-- 同行人 -->
    <ccPersonCom title="外出人" :ccPersonArr="biztripPeople" @addPerson="onMemberSelectC"></ccPersonCom>
    <!-- 理由 -->
    <TextareaCom placeholder="请输入外出事由" :content.sync='textareaText'></TextareaCom>
    <!-- 附件 -->
    <AttachmentCom :imgList="imgList"></AttachmentCom>
    <!-- 确定按钮 -->
    <CommitBtnCom @action="commitBtnAction"></CommitBtnCom>
    <SlideSelectDate :show.sync="SlideSelectDateShowA" :value.sync="dateSelA" :maxValue="dateSelB" @error="timeError('开始时间不能晚于结束时间')"></SlideSelectDate>
    <SlideSelectDate :show.sync="SlideSelectDateShowB" :value.sync="dateSelB" :minValue="dateSelA" @error="timeError('结束时间不能早于开始时间')"></SlideSelectDate>
    <!-- 选择审批成员 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
    <!-- 底部选择(外出类型) -->
    <BottomOptions :show.sync="bottomOptionsShow">
      <ul>
        <li @click="biztripTypeAction(item)" v-for="(item, index) in biztripTypeList" :key="index" :data-type="item.type">{{item.name}}</li>
      </ul>
    </BottomOptions>
  </div>
</template>
<script>
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import MemberSelect from '@/modules/member-select2'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDateAndAMPM.vue'
import ApprovalProcessCom from '@/components/commonCom/approvalProcess.vue'
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import ccPersonCom from '@/components/commonCom/ccPersonCom'
import AttachmentCom from '@/components/commonCom/attachment'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
import { UploadFileList } from '@/js/file-upload'

export default {
  components: {
    CommitBtnCom,
    TextareaCom,
    ApprovalProcessCom,
    AttachmentCom,
    SlideSelectDate,
    BottomOptions,
    MemberSelect,
    ccPersonCom,
    FormCom,
    Cell
  },
  data () {
    return {
      isWork: false,
      budget: '',
      biztripPeople: [],
      selectedDataB: { // 同行人
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      },
      isCommited: false,
      SlideSelectDateShowA: false,
      SlideSelectDateShowB: false,
      // 弹出选择外出类型
      bottomOptionsShow: false,
      // 开始时间
      dateSelA: '',
      // 结束时间
      dateSelB: '',
      site: '',
      textareaText: '',
      // 附件
      imgList: [],
      attachmentList: [],
      biztripTypeList: [],
      typeId: '',
      typeName: ''
    }
  },
  created () {
    // 获取外出类型
    this.getBiztripType().then((typeList) => {
      this.biztripTypeList = typeList
      if (this.$route.query.detailData) { // 重新提交
        // this.getApplicationDetails()
        this.initData()
      }
    })
    if (this.$route.query.isWork) {
      this.isWork = true
    }
  },
  methods: {
    initData () {
      let d = this.$route.query.detailData
      console.log('d', d)
      let { biztrip } = d
      this.typeName = biztrip.type_name
      this.typeId = biztrip.type_id
      this.dateSelA = this.$getTimeStr(biztrip.start_time, 'yy-mm-dd hh:mm', false).replace('07:50', ' 上午').replace('14:00', ' 下午')
      this.dateSelB = this.$getTimeStr(biztrip.end_time, 'yy-mm-dd hh:mm', false).replace('12:00', ' 上午').replace('17:00', ' 下午')
      this.site = biztrip.destination
      this.budget = biztrip.budget
      this.biztripPeople = d.biztrip_people
      this.selectedDataB.memberList = d.biztrip_people // 成员选择初始化选中
      this.textareaText = biztrip.desc
      this.attachmentList = biztrip.attachment_list
      this.imgList = biztrip.attachment_list.map(item => {
        return item.src
      })
    },
    timeError (params) {
      this.$simpleMsg(params)
    },
    // 选择外出类型
    biztripTypeAction (typeObj) {
      this.typeId = typeObj.id
      this.typeName = typeObj.name
      this.bottomOptionsShow = false
    },
    // 添加同行人
    onMemberSelectC (memberArr) {
      console.log('this.selectedData', this.selectedData)
      this.$refs.vMemberSelect.show({
        // 类型：单选(single)(默认)、多选(multiple)
        type: 'multiple',
        // 已选项。初始选中。直接把确认拿到的数据丢过来即可
        selectedData: this.selectedDataB,
        // 确认事件
        onConfirm: selectedData => {
          this.selectedDataB = selectedData
          this.biztripPeople = selectedData.memberListSubmit
        }
      })
    },
    // 提交申请
    commitBtnAction () {
      if (this.isCommited) return 0
      this.isCommited = true
      let { typeName, dateSelA, dateSelB, textareaText } = this
      if (!typeName) {
        this.$simpleMsg('请选择外出类型')
        this.isCommited = false
        return false
      }
      if (!dateSelA) {
        this.$simpleMsg('请选择开始时间')
        this.isCommited = false
        return false
      }
      if (!dateSelB) {
        this.$simpleMsg('请选择结束时间')
        this.isCommited = false
        return false
      }
      if (!textareaText) {
        this.$simpleMsg('请输入外出理由')
        this.isCommited = false
        return false
      }
      if (this.imgList.length === 0) { // 没有附件
        this.postCreateApplication()
        return
      }
      // 上传图片
      UploadFileList(this.imgList).then((dataList) => {
        if (dataList.length !== 0) { // 图片上传成功
          this.attachmentList = dataList
          this.postCreateApplication()
        } else { // 图片上传失败
          this.$simpleMsg('图片上传失败，请重新提交')
          this.isCommited = false
        }
      })
    },
    // 提交数据
    postCreateApplication () {
      this.isCommited = true
      let { typeId, typeName, dateSelA, dateSelB, site, textareaText, budget, isWork } = this
      let startTime = dateSelA.split('  ')[0] + '  ' + (dateSelA.split('  ')[1] === '上午' ? '07:50:00' : '14:00:00')
      let endTime = dateSelB.split('  ')[0] + '  ' + (dateSelB.split('  ')[1] === '上午' ? '12:00:00' : '17:00:00')
      let data = {
        biztrip: {
          type_name: typeName,
          type_id: typeId,
          start_time: startTime,
          end_time: endTime,
          destination: site,
          desc: textareaText,
          budget: budget || 0
        },
        biztrip_people: this.biztripPeople,
        work: isWork
      }
      let type = this.$route.query.detailData ? 'update' : 'new'
      this.$preloaderFull.show()
      this.$axios.post(`/mobicampus/biztrip/v1/${type}`, data).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.$router.replace({ name: 'index_admin' })
          this.$simpleMsg('已提交')
        } else {
          this.isCommited = false
          this.$simpleMsg(data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 请求--外出类型
    getBiztripType () {
      return this.$axios.get('/mobicampus/biztrip/v1/getTypeListBySchool').then(({ data }) => {
        if (data.status === 200) {
          let typeList = data.result.data
          return typeList
        }
      })
    }
  }
}
</script>

<style scoped>
.waichu {
  padding-top: 12px;
  padding-bottom: 36px;
}
/* .typeContent-box {
  margin: -29px 10px 0;
  border-radius: 8px;
  background-color: #fff;
}
.typeContent-box .row {
  height: 54px;
  line-height: 52px;
  padding: 0 10px 0 19px;
}
.typeContent-box .row.duration-box {
  border-bottom: none;
}
.typeContent-box .row .left {
  float: left;
  color: #666;
  font-size: 17px;
  font-weight: bold;
}
.typeContent-box .row .right {
  float: right;
  color: #ccc;
  font-size: 14px;
}
.typeContent-box .row .right.active {
  color: #333;
}
.typeContent-box .row .right .iconfont-approval {
  color: #b3b3b3;
  font-size: 17px;
}
.typeContent-box .row .right input {
  padding-right: 17px;
  text-align: right;
  outline: none;
  height: 40px;
  border: none;
}
.typeContent-box .row .right input::placeholder {
  color: #ccc;
  font-size: 14px;
  text-align: right;
}
.reasonContent-box {
  height: 123px;
  margin: 0px 10px;
  border-radius: 9px;
  background-color: #fff;
  margin-top: 12px;
  padding: 13px 15px;
}
.reasonContent-box > textarea {
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  outline: none;
}
textarea::placeholder {
  color: #ccc;
  font-size: 14px;
}
.commitBtn-box {
  height: 50px;
  margin: 30px 10px 50px;
  background-color: #53a2ed;
  color: #fff;
  line-height: 50px;
  font-size: 16px;
  border-radius: 9px;
  text-align: center;
} */
.bottomList {
  color: #007aff;
}
</style>
