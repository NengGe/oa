<template>
  <div class="main">
    <div class="heag-bg-box"></div>
    <FormCom>
      <cell input title="会议主题" :content.sync="title" placeholder='请输入主题'></cell>
      <cell input title="会议地址" :content.sync="address" placeholder='请输入地址'></cell>
      <cell button title="会议日期" :content="dateSel" @action="()=>{SlideSelectDateShow=1}"></cell>
      <cell button title="开始时间" :content="timeA" @action="SlideSelectTimeAShow=1"></cell>
      <cell button title="结束时间" :content="timeB" @action="SlideSelectTimeBShow=2"></cell>
    </FormCom>
    <!-- <div class="form-box">
      <div class="item-box row cf bottom-one-px">
        <div class="item-left left">会议主题</div>
        <div class="item-right right" :class="{active: title}">
          <input type="text" v-model="title" placeholder="请输入主题">
        </div>
      </div>
      <div class="item-box row cf bottom-one-px">
        <div class="item-left left">会议地址</div>
        <div class="item-right right" :class="{active: address}">
          <input type="text" v-model="address" placeholder="请输入地址">
        </div>
      </div>
      <div class="item-box row cf bottom-one-px">
        <div class="item-left left">会议日期</div>
        <div class="item-right right" :class="{active: dateSel}">
          <span class="text" @click="()=>{SlideSelectDateShow=1}">{{dateSel||'请选择'}}</span>
          <span class="iconfont">&#xe616;</span>
        </div>
      </div>
      <div class="item-box row cf bottom-one-px">
        <div class="item-left left">开始时间</div>
        <div class="item-right right" :class="{active: timeA}">
          <span class="text" @click="()=>{SlideSelectTimeAShow=1}">{{timeA||'请选择'}}</span>
          <span class="iconfont">&#xe616;</span>
        </div>
      </div>
      <div class="item-box row cf bottom-one-px">
        <div class="item-left left">结束时间</div>
        <div class="item-right right" :class="{active: timeB}">
          <span class="text" @click="()=>{SlideSelectTimeBShow=2}">{{timeB||'请选择'}}</span>
          <span class="iconfont">&#xe616;</span>
        </div>
      </div>
    </div> -->
    <!-- 会议内容 -->
    <richText @updateContent='onupdateContent' :placeholder="'请输入会议内容'" :content='content' />
    <!-- 审批needDelBtn -->
    <ApprovalProcess-com title="会议负责人" :needAddBtn='!approvalPersonArr.length' :needArrow="false" :needDelBtn="false" @addPerson="onMemberSelect" :approvalPersonArr="approvalPersonArr" @memberAction="onMemberAction"></ApprovalProcess-com>
    <!-- 抄送 -->
    <ccPersonCom title="参会人员" :ccPersonArr="ccPersonArr" @addPerson="onMemberSelectB"></ccPersonCom>

    <!-- 确定按钮 -->
    <CommitBtnCom @action="commitBtnAction"></CommitBtnCom>

    <SlideSelectDate :show.sync="SlideSelectDateShow" :value.sync="dateSel"></SlideSelectDate>
    <SlideSelectTime :value.sync="timeA" :maxValue="timeB" :show.sync="SlideSelectTimeAShow" @error="timeError"></SlideSelectTime>
    <SlideSelectTime :value.sync="timeB" :minValue="timeA" :show.sync="SlideSelectTimeBShow" @error="timeError"></SlideSelectTime>
    <!-- 选择成员 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
  </div>
</template>

<script>
import '@/assets/css/conference.css'
import '@/assets/css/modules/conference-create.scss'
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
import richText from '@/components/commonCom/richtextCom'
import ApprovalProcessCom from '@/components/commonCom/approvalProcess.vue'
import ccPersonCom from '@/components/commonCom/ccPersonCom.vue'
import SlideSelectDate from '@/modules/slide-select/date/SlideSelectDate.vue'
import SlideSelectTime from '@/modules/slide-select/date/SlideSelectTime.vue'
import MemberSelectLevels from '@/modules/member-select-levels/Index'
import MemberSelect from '@/modules/member-select2'
import CommitBtnCom from '@/components/commonCom/commitBtnCom'
export default {
  components: {
    SlideSelectDate,
    SlideSelectTime,
    MemberSelectLevels,
    MemberSelect,
    ApprovalProcessCom,
    ccPersonCom,
    richText,
    Cell,
    FormCom,
    CommitBtnCom
  },
  data () {
    return {
      isWork: false,
      selectedData: {
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      },
      memberSelectType: 'multiple',
      // memberSelectSelected: null,
      // member: 0,
      title: '',
      address: '',
      dateSel: '',
      timeA: '',
      timeB: '',
      content: '',
      approvalPersonArr: [],
      ccPersonArr: [],
      itemsgLea: null,
      itemsgMem: [],
      SlideSelectDateShow: 0,
      SlideSelectTimeAShow: 0,
      SlideSelectTimeBShow: 0,
      isLoadAdd: false
    }
  },
  created () {
    this.queryCurrUser()
    if (this.$route.query.isWork) {
      this.isWork = true
    }
  },
  methods: {
    // 监听富文本内容--更新
    onupdateContent (content) {
      this.content = content
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
    // 添加审批人
    onMemberSelect () {
      this.$refs.vMemberSelect.show({
        type: 'single',
        // 确认事件
        onConfirm: selectedData => {
          console.log('selectedData', selectedData)
          if (selectedData.memberList.length === 0) return
          let len = this.approvalPersonArr.length
          if (len && this.approvalPersonArr[len - 1].user_id === selectedData.memberList[0].user_id) {
            this.$simpleMsg('该成员与上级重复')
            this.member = true
            return false
          }
          this.approvalPersonArr.push(selectedData.memberList[0])
          // 进行是否关闭判断
          // return false // 阻止自动关闭
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
    // 选择负责人
    onMemberSelectA (memberArr) {
      // console.log('this.itemsgLea', this.itemsgLea)
      // console.log('B回调', members)
      this.$refs.vMemberSelect.show({
        // 类型：单选(single)(默认)、多选(multiple)
        type: 'single',
        // 已选项。初始选中。直接把确认拿到的数据丢过来即可
        selectedData: [this.itemsgLea],
        // 确认事件
        onConfirm: selectedData => {
          // console.log('selectedData', selectedData)
          this.itemsgLea = selectedData.memberList[0]
          console.log(' this.itemsgLea', this.itemsgLea)
        }
      })
    },
    delmember (e) {
      let { target } = e
      if (e.target.tagName === 'SPAN') {
        this.itemsgMem.splice(target.dataset.index, 1)
      }
    },
    timeError () {
      this.$simpleMsg('结束时间不能早于开始时间')
    },
    commitBtnAction () {
      if (this.isLoadAdd) return
      let { title, address, dateSel, timeA, timeB, content, approvalPersonArr, ccPersonArr, isWork } = this
      if (!title.trim()) {
        this.$simpleMsg('请填写标题')
        return false
      }
      if (!address.trim()) {
        this.$simpleMsg('请填写会议地址')
        return false
      }
      if (!dateSel.trim()) {
        this.$simpleMsg('请填写日期')
        return false
      }
      if (!timeA.trim()) {
        this.$simpleMsg('请填写开始时间')
        return false
      }
      if (!timeB.trim()) {
        this.$simpleMsg('请填写结束时间')
        return false
      }
      if (!content.trim()) {
        this.$simpleMsg('请填写会议内容')
        return false
      }
      if (approvalPersonArr.length === 0) {
        this.$simpleMsg('请选择会议负责人')
        return false
      }
      if (ccPersonArr.length === 0) {
        this.$simpleMsg('请选择参会人员')
        return false
      }
      let data = {
        'meeting': {
          title,
          content,
          start_time: dateSel + ' ' + timeA,
          end_time: dateSel + ' ' + timeB,
          advance_time: 0,
          addr: address
        },
        'meeting_charger': approvalPersonArr[0],
        'meeting_participant_list': ccPersonArr,
        work: isWork
      }
      this.isLoadAdd = true
      this.$axios.post('/mobicampus/meeting/v1/newMeeting', data).then(({ data }) => {
        console.log('会议', data)
        let msg = '会议提交成功'
        if (data.status === 200) {
          this.$router.replace({
            name: 'ConferenceIndex'
          })
        } else {
          msg = '会议提交失败'
        }
        this.$simpleMsg(msg)
      }).catch(error => {
        this.$simpleMsg(error)
      }).then(() => {
        this.isLoadAdd = false
      })
    },
    queryCurrUser () {
      this.$axios.get('/schoolorg/v1/getCurrUserInfo').then(({ data }) => {
        if (data.status === 200) {
          let d = data.result.data
          let deptId = 0
          let deptName = ''
          let dept = d.dept_list[0]
          if (dept) {
            deptId = dept.dept_id
            deptName = dept.dept_name
          }
          let itemsgLea = {
            dept_id: deptId,
            dept_name: deptName,
            type: 0,
            user_id: d.user_id,
            user_name: d.user_name
          }
          this.itemsgLea = itemsgLea
          this.approvalPersonArr.push(itemsgLea)
        }
      })
    }
  }
}
</script>

<style scoped>
.heag-bg-box {
  height: 29px;
  width: 100%;
  background-color: #2d71c3;
  margin-bottom: -29px;
}
/* .form-box {
  margin: -29px 10px 0;
  border-radius: 8px;
  background-color: #fff;
}
.form-box .row {
  height: 54px;
  line-height: 52px;
  padding: 0 10px 0 19px;
}
.form-box .row.duration-box {
  border-bottom: none;
}
.form-box .row .left {
  float: left;
  color: #666;
  font-size: 17px;
  font-weight: bold;
}
.form-box .row .right {
  float: right;
  color: #ccc;
  font-size: 14px;
}
.form-box .row .right.active {
  color: #333;
}
.form-box .row .right .iconfont {
  color: #b3b3b3;
  font-size: 17px;
}
.form-box .row .right input {
  padding-right: 17px;
  text-align: right;
  outline: none;
  height: 40px;
  border: none;
}
.form-box .row .right input::placeholder {
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
</style>

