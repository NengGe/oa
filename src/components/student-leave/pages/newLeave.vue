<template>
  <div class='new-leave'>
    <FormCom>
      <cell button title='请假人' :content='nameStr' @action='selStudent'></cell>
      <cell button title='请假类型' :content='leaveType&&leaveType.content' @action='()=>isShowTypeList = 1'></cell>
      <cell button title='开始时间' :content='startTime' @action='()=>SlideSelectDateShowA = true'></cell>
      <cell button title='结束时间' :content='endTime' @action='()=>SlideSelectDateShowB = true'></cell>
    </FormCom>
    <!-- 理由 -->
    <TextareaCom placeholder='请输入请假理由' :content.sync='reason'></TextareaCom>
    <!-- 确定 -->
    <CommitBtnCom @action='commitBtnAction'></CommitBtnCom>
    <!-- 底部选择(请假类型) -->
    <BottomOptions :show.sync='isShowTypeList'>
      <ul>
        <li @click='LeaveTypeAction(item, i)' v-for='(item, i) in leaveTypeList' :key='i'>{{item.content}}</li>
      </ul>
    </BottomOptions>
    <!-- 时间选择器 -->
    <SlideSelectDate :show.sync='SlideSelectDateShowA' :value.sync='startTime' :maxValue='endTime' @error="$simpleMsg(' 开始时间不能晚于结束时间 ')"></SlideSelectDate>
    <SlideSelectDate :show.sync='SlideSelectDateShowB' :value.sync='endTime' :minValue='startTime' @error="$simpleMsg(' 结束时间不能早于开始时间 ')"></SlideSelectDate>
    <!-- 选择学生 -->
    <selectStudent ref='selectStudent'></selectStudent>
  </div>
</template>

<script>
import selectStudent from '@/components/student-leave/com/select-student'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import TextareaCom from '@/components/commonCom/textareaCom'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDateAndTime2'
export default {
  components: {
    CommitBtnCom,
    Cell,
    FormCom,
    TextareaCom,
    BottomOptions,
    SlideSelectDate,
    selectStudent
  },
  data () {
    return {
      SlideSelectDateShowA: false,
      SlideSelectDateShowB: false,
      isShowTypeList: false,
      leaveType: null,
      startTime: '',
      endTime: '',
      reason: '',
      leaveTypeList: [
        { content: '事假', type: '1' },
        { content: '病假', type: '2' },
        { content: '其他', type: '3' },
        { content: '迟到', type: '4' },
        { content: '早退', type: '5' },
        { content: '旷课', type: '6' }
      ],
      // studentList: null
      studentList: []
    }
  },
  computed: {
    nameStr () {
      return this.studentList && this.studentList[0] ? `${this.studentList[0].user_name}等${this.studentList.length}人` : ''
    }
  },
  methods: {
    commitBtnAction () {
      let { studentList, leaveType, startTime, endTime, reason } = this
      if (!studentList) {
        this.$simpleMsg('请选择请假人')
        return
      }
      if (!leaveType) {
        this.$simpleMsg('请选择请假类型')
        return
      }
      if (!startTime) {
        this.$simpleMsg('请选择开始时间')
        return
      }
      if (!endTime) {
        this.$simpleMsg('请选择结束时间')
        return
      }
      if (!reason) {
        this.$simpleMsg('请选择输入请假事由')
        return
      }
      this.postAskforleave()
    },
    selStudent () {
      this.$refs.selectStudent.show({
        // selectedClass: {
        //   grade: '1108',
        //   classId: '5277078851935680208'
        // },
        studentList: this.studentList,
        onConfirm: d => {
          this.studentList = d
        }
      })
    },
    LeaveTypeAction (item, i) {
      this.leaveType = item
      this.isShowTypeList = false
    },
    postAskforleave () {
      let { studentList, leaveType, startTime, endTime, reason } = this
      let vm = this.$parent.$parent
      let d = {
        'ask_for_leave_users': studentList,
        'ask_id': '0',
        'ask_type': leaveType.type,
        'start_leave_on': startTime,
        'end_leave_on': endTime,
        'description': reason,
        'states': Number(vm.canApprove) + ''
      }
      this.$preloaderFull.show()
      return this.$axios.post(`/palm/v2/askforleave`, d).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          console.log('if-data', data)
          this.$router.replace({ name: 'myLeave' })
          this.$simpleMsg('申请已提交')
        }
      })
    }
  }
}
</script>

