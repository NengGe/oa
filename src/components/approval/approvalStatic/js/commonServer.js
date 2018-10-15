// 获取请假 OR 外出类型
export function getInitType (params) {
  return new Promise((resolve, reject) => {
    this.$axios.get(`/mobicampus/${params}/v1/getInitInfo`).then(({ data }) => {
      if (data.status === 200) {
        let src = params + '_type_list'
        let typeList = data.result.data[src]
        // console.log(typeList)
        let types = []
        typeList.map(item => {
          let obj = {
            name: item.name,
            type: item.type
          }
          types.push(obj)
        })
        resolve(types)
      } else {
      }
    }).catch(error => {
      reject(error)
    })
  })
}
// 获取审批设置模板
export function getApproveConf (params) {
  return this.$axios.get(params)
    .then(({ data }) => {
      // console.log('获取审批设置模板', data)
      if (data.status === 200) {
        let conf = data.result.data.approve_conf_com
        // console.log('conf', conf)
        let d = {
          need_approve: conf.approve_conf.need_approve,
          can_change_process: conf.approve_conf.can_change_process,
          need_cc: conf.approve_conf.need_cc,
          can_change_ccpeople: conf.approve_conf.can_change_ccpeople,
          process_template_node_list: conf.process_template_node_list,
          cc_people: conf.cc_people
        }
        console.log('审批设置模板', d)
        return d
      }
    })
    .then(data => {
      let canChangeProcess,
        approvalPersonArr,
        canChangeCcpeople,
        ccPersonArr
      if (data.need_approve === 'true') { // 需要审批
        canChangeProcess = data.can_change_process === 'true' // 审批--能否修改
        approvalPersonArr = data.process_template_node_list.map(item => { // 赋值--审批人
          // console.log('item', item)
          if (item.leader_list.length === 1) {
            item.user_name = item.leader_list[0].user_name
            item.user_id = item.leader_list[0].user_id
          }
          return {
            user_name: item.user_name,
            user_id: parseInt(item.user_id),
            type: item.type,
            leader_list: item.leader_list
          }
        })
      }
      if (data.need_cc === 'true') { // 需要抄送
        canChangeCcpeople = data.can_change_ccpeople === 'true' // 抄送--能否修改
        ccPersonArr = []
        data.cc_people.forEach(item => { // 赋值--抄送人
          if (item.type === '2') { //  非主管
            ccPersonArr.push({
              user_id: item.user_id,
              user_name: item.user_name
            })
          } else { // 主管
            ccPersonArr.push(...item.leader_list)
          }
        })
        // this.selectedData.memberList = this.ccPersonArr
      }
      let d = {
        canChangeProcess,
        approvalPersonArr,
        canChangeCcpeople,
        ccPersonArr
      }
      return d
    })
    .catch(() => {
      return {
        canChangeProcess: true,
        approvalPersonArr: [],
        canChangeCcpeople: true,
        ccPersonArr: []
      }
    })
}
