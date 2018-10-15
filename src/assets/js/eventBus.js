export default function (Vue) {
  let $managerBus = new Vue({ // 自我管理班级需要共享的字段
    data: {
      gradeIndex: 0,
      classIndex: 0,
      classId: '',
      periodId: '', // 学校时段id
      isHaveGroup: true // 是否有小组
    }
  })
  let $moralityBus = new Vue({ // 学校德育管理
    data () {
      return {
        classId: '',
        isMaster: false, // 是否是班主任,
        role: 1 // 1代表当前是年级长等身份 2代表当前是班主任等身份
      }
    }
  })
  Vue.prototype.$managerBus = $managerBus
  Vue.prototype.$moralityBus = $moralityBus
}
