<template>
  <div class="ChildPage approvalDetail page-bg">
    <!-- 详情信息 -->
    <detailInfoCom :dataObj='dataObj' :displayModule='displayModule'></detailInfoCom>
    <!-- 流程 -->
    <processCom :processData="processData"></processCom>

    <!-- 同意 OR 驳回 OR 转审 -->
    <btmOperComA @agreeAction="onAgree" @rejectAction="() => this.isShowWarnBox = true" @transferAction="onTransfer" @sendOpinionAction="onSendOpinion" v-if="this.$route.params.type === '1'"></btmOperComA>
    <!-- 催办 OR 撤销-->
    <btmOperComB @revokeAction="isShowRevokeConfirmBox=true " @urgeAction="onUrge" @sendOpinionAction="onSendOpinion" v-else-if="this.$route.params.type === '2'"></btmOperComB>
    <!-- 重新提交-->
    <btmOperComC @resubmitAction="onResubmit" v-else-if="this.$route.params.type === '3'"></btmOperComC>
    <!-- 输入框 -->
    <btmOperComD @sendOpinionAction="onSendOpinion" v-else-if="this.$route.params.type === '4'"></btmOperComD>

    <!-- 驳回确定提示 弹窗 -->
    <confirmBoxCom v-show="isShowWarnBox" title="提示" content='确定驳回？' @confirmAction="onReject" @cancelAction="() => this.isShowWarnBox = false"></confirmBoxCom>
    <!-- 撤销确定提示 弹窗 -->
    <confirmBoxCom v-show="isShowRevokeConfirmBox" title="提示" content='确定撤销？' @confirmAction="onRevokeConfirm" @cancelAction="isShowRevokeConfirmBox = false"></confirmBoxCom>

    <!-- 选择转审人员 -->
    <MemberSelect ref="vMemberSelect"></MemberSelect>
  </div>
</template>

<script>
import btmOperComA from '../../components/approvalDetailCom/buttomoPeration_1.vue'
import btmOperComB from '../../components/approvalDetailCom/buttomoPeration_2.vue'
import btmOperComC from '../../components/approvalDetailCom/buttomoPeration_3.vue'
import btmOperComD from '../../components/approvalDetailCom/buttomoPeration_4.vue'
import processCom from './approvalDetail/processCom'
import detailInfoCom from './approvalDetail/detailInfoCom'
import MemberSelect from '@/modules/member-select2'
import { getInitType } from '@/components/approval/approvalStatic/js/commonServer.js'
import confirmBoxCom from '@/modules/message-box/confirmBox'
import { checkFileType } from '@/js/file-upload'
export default {
  data () {
    return {
      detailData: null,
      // 通知对象是否展开
      isSpread: false,
      //  审批信息展示模板选择
      displayModule: '',
      // 申请类型
      applicationType: '',
      // state => 流程状态（1 => 审批中, 2 => 通过, 3 => 未通过, 4 => 撤销）
      isShowRevokeConfirmBox: false,
      isShowWarnBox: false,
      processStateArr: ['', '审批中', '申请已通过', '申请未通过', '申请已撤销'],
      statusArr: ['待审批', '', '审批通过', '审批未通过', '已撤销', '已转交'],
      leaveTypeList: [],
      biztripTypeList: [],
      // 申请明细
      dataObj: {
        noticePersonArr: [],
        personName: '',
        processId: '',
        status: {
          contentText: '',
          state: ''
        },
        contentArr: [],
        attachmentArr: [[], []]
      },
      // 流程数据
      processData: []
    }
  },
  components: {
    detailInfoCom,
    processCom,
    btmOperComA,
    btmOperComB,
    btmOperComC,
    btmOperComD,
    MemberSelect,
    confirmBoxCom
  },
  created () {
    // 初始化请假类型
    let p1 = getInitType.call(this, 'leave').then(types => {
      this.leaveTypeList = types
      // this.leaveTypeList[2].name = '调课'
    })
    // 初始化外出类型
    let p2 = getInitType.call(this, 'biztrip').then(types => {
      this.biztripTypeList = types
    })
    // 等待所有审批类型初始化后 再初始化页面
    Promise.all([p1, p2]).then(() => {
      this.refresh()
    })
  },
  methods: {
    // 审批意见 同意
    onAgree () {
      let paramsObj = {
        process_id: this.dataObj.processId,
        action: 'pass'
      }
      this.postApproveOpinion(paramsObj).then((data) => {
        this.$simpleMsg('已同意')
      })
    },
    // 审批意见 驳回
    onReject () {
      this.isShowWarnBox = false
      let paramsObj = {
        process_id: this.dataObj.processId,
        action: 'reject'
      }
      this.postApproveOpinion(paramsObj).then((data) => {
        this.$simpleMsg('已驳回')
      })
    },
    // 发表审批意见
    onSendOpinion (contentText) {
      let paramsObj = {
        process_id: this.dataObj.processId,
        content: contentText
      }
      this.$axios.post('/mobicampus/approve/v1/addApproveOpinion', paramsObj).then(({ data }) => {
        if (data.status === 200) {
          this.refresh()
        } else {
        }
      })
    },
    // 审批意见 转审
    onTransfer () {
      this.$refs.vMemberSelect.show({
        // 类型：单选(single)(默认)、多选(multiple)
        type: 'single',
        // 已选项。初始选中。直接把确认拿到的数据丢过来即可
        selectedData: null,
        // 确认事件
        onConfirm: selectedData => {
          let paramsObj = {
            process_id: this.dataObj.processId,
            action: 'transfer',
            approve_transfer: {
              to_user_id: selectedData.memberListSubmit[0].user_id,
              to_user_name: selectedData.memberListSubmit[0].user_name
            }
          }
          this.postApproveOpinion(paramsObj).then((data) => {
            this.$simpleMsg('已转审')
          })
        }
      })
    },
    // 催办
    onUrge () {

    },
    // 撤销确定
    onRevokeConfirm () {
      this.postRevoke()
    },
    // 撤销申请
    postRevoke () {
      let paramsObj = {
        process_id: this.dataObj.processId,
        action: 'undo'
      }
      this.postApproveOpinion(paramsObj).then((data) => {
        this.isShowRevokeConfirmBox = false
        this.$simpleMsg('已撤销')
      })
    },
    // 重新提交
    onResubmit () {
      this.postRevoke()
      this.$router.push({ name: this.applicationType, params: { id: this.$route.params.id }, query: { detailData: this.detailData } })
    },
    // 提交审批意见
    postApproveOpinion (paramsObj) {
      return this.$axios.post('/mobicampus/approve/v1/approve', paramsObj).then(({ data }) => {
        if (data.status === 200) {
          this.$router.back()
          // this.$router.push({name: 'approvalIndex', query: {com: 'commitCom'}})
        } else {
        }
        // this.$simpleMsg(msg)
      }).catch(error => {
        // this.$simpleMsg(error)
        console.log(error)
      })
    },
    // 刷新
    refresh () {
      // 开始请求数据
      this.$axios.get(`/mobicampus/approve/v1/getApplicationDetails/` + this.$route.params.id).then(({ data }) => {
        let dataObject = data.result.data
        this.detailData = dataObject
        if (data.status === 200) {
          console.log('详情页', dataObject)
          this.processData = []
          let { resource, process, application } = dataObject
          this.dataObj = {
            noticePersonArr: [],
            personName: process.create_user_name,
            processId: process.id, // 流程 ID
            status: {
              contentText: this.processStateArr[process.state],
              state: process.state
            },
            contentArr: [],
            attachmentArr: [[], []]
          }
          // 附件
          resource.attachment_list && resource.attachment_list.map((item, index) => {
            // 图片 附件
            let type = checkFileType(item.name)
            let obj = {
              name: item.name,
              src: item.src
            }
            if (type === '41') {
              this.dataObj.attachmentArr[0].push(obj)
            } else if (type === '31') { // 文档 附件
              this.dataObj.attachmentArr[1].push(obj)
            }
          })
          if (application.module_code === 'leave') {
            this.displayModule = 'normal'
            this.applicationType = 'qingjia'
            let startTime = resource.start_time.split('+')[0].split('T')
            let endTime = resource.end_time.split('+')[0].split('T')
            startTime[1] = startTime[1] === '07:50:00' ? '上午' : '下午'
            endTime[1] = endTime[1] === '12:00:00' ? '上午' : '下午'
            let duration = resource.duration / 8
            this.dataObj.contentArr = [
              ['请假类型', resource.type_name],
              ['请假时长', duration + '天'],
              ['开始时间', startTime[0] + ' ' + startTime[1]],
              ['结束时间', endTime[0] + ' ' + endTime[1]],
              ['请假原因', resource.reason]
            ]
            // 附件
            // resource.attachment_list.map((item, index) => {
            //   // 图片 附件
            //   let type = checkFileType(item.name)
            //   let obj = {
            //     name: item.name,
            //     src: item.src
            //   }
            //   if (type === '41') {
            //     this.dataObj.attachmentArr[0].push(obj)
            //   } else if (type === '31') { // 文档 附件
            //     this.dataObj.attachmentArr[1].push(obj)
            //   }
            // })
          } else if (application.module_code === 'biztrip') {
            this.displayModule = 'normal'
            this.applicationType = 'waichu'
            let startTime = resource.start_time.split('+')[0].split('T')
            let endTime = resource.end_time.split('+')[0].split('T')
            startTime[1] = startTime[1] === '07:50:00' ? '上午' : '下午'
            endTime[1] = endTime[1] === '12:00:00' ? '上午' : '下午'
            this.dataObj.contentArr = [
              ['外出类型', resource.type_name],
              ['开始时间', startTime[0] + ' ' + startTime[1]],
              ['结束时间', endTime[0] + ' ' + endTime[1]],
              ['目的地', resource.destination],
              ['外出事由', resource.desc]
            ]
          } else if (application.module_code === 'course_exchange_tk') {
            this.displayModule = 'normal'
            this.applicationType = 'tiaoke'
            this.dataObj.contentArr = []
            resource.details_list.map((item, index) => {
              let firstArr = ['换课申请' + (index + 1), '']
              firstArr.specialStyle = 'specialStyle'
              let formDataStr = item.from_date.split('+')[0].split('T')[0]
              let toDataStr = item.to_date.split('+')[0].split('T')[0]
              this.dataObj.contentArr.push(firstArr)
              this.dataObj.contentArr.push(['日期', formDataStr + ' <-> ' + toDataStr])
              this.dataObj.contentArr.push(['节次', item.from_lesson_id_string + ' <-> ' + item.to_lesson_id_string])
              this.dataObj.contentArr.push(['科目', item.from_subject_name + ' <-> ' + item.to_subject_name])
              this.dataObj.contentArr.push(['老师', item.from_user_name + ' <-> ' + item.to_user_name])
            })
          } else if (application.module_code === 'course_exchange_dnk') {
            this.displayModule = 'normal'
            this.applicationType = 'dingke'
            this.dataObj.contentArr = []
            resource.details_list.map((item, index) => {
              let firstArr = ['顶课申请' + (index + 1), '']
              firstArr.specialStyle = 'specialStyle'
              let formDataStr = item.from_date.split('+')[0].split('T')[0]
              this.dataObj.contentArr.push(firstArr)
              this.dataObj.contentArr.push(['日期', formDataStr])
              this.dataObj.contentArr.push(['节次', item.from_lesson_id_string])
              this.dataObj.contentArr.push(['科目', item.from_subject_name])
              this.dataObj.contentArr.push(['老师', item.to_user_name])
            })
          } else if (application.module_code === 'announce') { // announceModule
            this.displayModule = 'announceModule'
            this.applicationType = 'inform'
            let noticePersonArr = []
            resource.notif_people_havnt_read.map(item => {
              noticePersonArr.push(item.user_name)
            })
            noticePersonArr.push(`等${resource.notif_people_havnt_read.length}人`)
            // noticePersonArr += `等${resource.notif_people_have_read.length}人`
            this.dataObj.contentArr = [
              ['公告标题', resource.announce.title],
              ['公告类型', resource.announce.type_name],
              ['公告内容', resource.announce.content]
            ]
            this.dataObj.noticePersonArr = noticePersonArr
            // 附件
            resource.announce.attachment_list.map((item, index) => {
              // 图片 附件
              let type = checkFileType(item.name)
              let obj = {
                name: item.name,
                src: item.src
              }
              if (type === '41') {
                this.dataObj.attachmentArr[0].push(obj)
              } else if (type === '31') { // 文档 附件
                this.dataObj.attachmentArr[1].push(obj)
              }
            })
          } else if (application.module_code === 'attend_appeal') { // 考勤申诉
            this.displayModule = 'normal'
            this.applicationType = 'appeal'
            let typeArr = ['', '迟到', '早退', '正常', '异常', '缺卡']
            this.dataObj.contentArr = [
              ['异常日期', resource.date_to_clock.split('T')[0]],
              ['异常情况', `${typeArr[resource.type]} 上班时间：${resource.time_to_clock} 打卡时间：${resource.old_clock_time || '无'}`],
              ['申诉理由', resource.reason]
            ]
          } else if (application.module_code === 'fund') { // 经费
            this.displayModule = 'normal'
            this.applicationType = 'jingfei'
            this.dataObj.contentArr = [
              ['经费金额', resource.amount],
              ['经费类型', resource.type_name],
              ['经费事由', resource.desc]
            ]
          } else if (application.module_code === 'assets_purchase') { // 采购
            this.displayModule = 'caigou'
            this.applicationType = 'caigou'
            this.dataObj.contentArr = [
              ['采购事由', resource.desc],
              ['采购金额', resource.amount]
            ]
            this.dataObj.formList = resource.item_list.map(item => {
              return [
                ['品名', item.name],
                ['规格', item.spec],
                ['单价', item.unit_price],
                ['数量', item.total]
              ]
            })
          } else if (application.module_code === 'car_using') { // 用车
            this.displayModule = 'normal'
            this.applicationType = 'yongche'
            this.dataObj.contentArr = [
              ['用车人数', resource.number_of_people + '人'],
              ['用车事由', resource.desc],
              ['出发时间', this.$getTimeStr(resource.setoff_time, 'yy-mm-dd hh:mm', false)],
              ['回程时间', this.$getTimeStr(resource.getback_time, 'yy-mm-dd hh:mm', false)],
              ['目的地', resource.destination],
              ['用车事由', resource.desc]
            ]
          }
          // 审批流程
          process.node_list.map((person, index) => {
            if (process.state === '1' && person.id === process.curr_node_id) {
              this.dataObj.status.contentText = `等待${person.user_name}的审批`
            }
            // 时间 （数组）
            let dateAndTime = person.time_processed.split('+')[0].split('T')
            // 去除 年 的的显示
            let yearIndex = dateAndTime[0].indexOf('-')
            dateAndTime[0] = dateAndTime[0].slice(yearIndex + 1)
            // 去除 秒 的的显示
            let secIndex = dateAndTime[1].lastIndexOf(':')
            dateAndTime[1] = dateAndTime[1].slice(0, secIndex)
            // 判断是否为今天
            let todayStr = new Date().toDateString()
            let dateStr = new Date(dateAndTime[0]).toDateString()
            let time = todayStr === dateStr ? dateAndTime[1] : dateAndTime[0] + ' ' + dateAndTime[1]
            let processNodeObj = {
              status: person.state_processed,
              personName: person.user_name,
              time: time,
              contentText: this.processStateArr[person.state_processed],
              opinionList: []
            }
            // 流程状态
            processNodeObj.opinionList = person.opinion_list.map((item, index) => {
              return {
                personName: item.user_name,
                contentText: item.content
              }
            })
            this.processData.push(processNodeObj)
          })
        } else {
        }
      }).catch(error => {
        console.log(error)
      }).then(() => {
        this.isLoadAdd = false
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
.approvalDetail {
  /* padding-bottom: 54px; */
}
</style>



