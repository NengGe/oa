<template>
  <FormCom class="form-com">
    <div class="cc-box">
      <div class="l">{{title}}</div>
      <div class="r" :class="{active: noticePersonText}" @click="onMemberSelect">
        <span>{{noticePersonText||'请选择'}}</span>
        <!-- <span>{{ccPersonArr.length ? `${this.ccPersonArr[0].user_name}等${this.ccPersonArr.length}人` : '请选择'}}</span> -->
        <i class="iconfont">&#xe616;</i>
      </div>
    </div>
    <!-- 选择审批成员 -->
    <MemberSelect ref='vMemberSelect'></MemberSelect>
  </FormCom>
</template>

<script>
import FormCom from '@/components/commonCom/formCom'
import MemberSelect from '@/modules/member-select2'
export default {
  components: {
    FormCom,
    MemberSelect
  },
  props: {
    'title': {
      type: String,
      default: '抄送人'
    },
    'ccPersonArr': Array
  },
  data () {
    return {
      selectedData: { // 执行人
        memberList: [], // 成员列表(部门没被选中)
        deptList: [], // 部门列表
        memberListSubmit: [] // 需要提交的成员列表
      }
    }
  },
  computed: {
    'noticePersonText': function () {
      let arrLength = this.ccPersonArr.length
      if (arrLength) {
        return `${this.ccPersonArr[arrLength - 1].user_name}等${arrLength}人`
      }
      return ''
    }
  },
  methods: {
    onMemberSelect () {
      this.$refs.vMemberSelect.show({
        // 类型：单选(single)(默认)、多选(multiple)
        type: 'multiple',
        // 已选项。初始选中。直接把确认拿到的数据丢过来即可
        selectedData: this.selectedData,
        // 确认事件
        onConfirm: selectedData => {
          this.selectedData = selectedData
          this.ccPersonArr.splice(0, this.ccPersonArr.length, ...selectedData.memberListSubmit)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.form-com{
  margin-top: 12px;
}
.cc-box {
  background-color: #fff;
  border-radius: 9px;
  box-sizing: border-box;
  padding: 0 10px 0 15px;
  line-height: 52px;
  display: flex;
  justify-content: space-between;
  .l {
    font-size: 15px;
    color: #666;
    font-weight: bold;
  }
  .r {
    padding-left: 30px;
    font-size: 14px;
    color: #ccc;
    &.active {
      color: #333;
    }
  }
}
</style>
