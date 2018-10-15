/* eslint-disable camelcase */
/* eslint-disable no-multiple-empty-lines */
let md = {}
md.approve = function (params) { // 审批详情
  let t = params.split('|')
  let n = '0'
  let id = t[0]
  let status = t[1]
  let type = t[2]
  if (type === 'todo') {
    n = '1'
  } else if (type === 'approved') {
    n = '1'
  } else if (type === 'submitted') {
    n = status === '1' ? '2' : '3'
  } else if (type === 'cc') {
    n = '4'
  }
  return { name: 'approvalDetail', params: { id: id, type: n } }
}
md.meeting = function (params) { // 会议详情
  return {
    name: 'ConferenceDetail', params: { id: params }
  }
}
md.announce = function (params) { // 公告详情
  return { name: 'informDetail', params: { status: 'myReceive', id: params } }
}
md.biztrip = function (params) { // 外出详情
  let p = params.split('|')
  let id = p[0]
  let state = Number(p[1])
  let name = 'detail_outMine'
  return { name, params: { id, state } }
}



export default function getRouter (item) {
  let extra = item.extra
  if (!extra) {
    return
  }
  extra = JSON.parse(extra)
  let { module_code, params, view_type } = extra
  if (view_type === '1') {
    return md.approve(params)
  } else if (view_type === '2') {
    let r = null
    switch (module_code) {
      case 'meeting':
        r = md.meeting(params)
        break
      case 'announce':
        r = md.announce(params)
        break
      case 'biztrip':
        r = md.biztrip(params)
        break
      default:
        break
    }
    return r
  }
}
