<template>
  <div class="select-class">
    <VMask @click="show =!show" v-show="show"></VMask>
    <div class="select-inner" v-show="this.gradeList.length > 1">
      <div class="select-inner-box" @click="show=!show">
        <span class="grade">{{concatName || '请选择'}}</span>
        <i class="iconfont">&#xe601;</i>
      </div>
      <div class="content" :class="{active: show}">
        <listSelect attr="grade_name" :list="gradeList" @selectData="onGradeData" :currIndex="gradeIndex"></listSelect>
        <listSelect attr="class_name" :list="classList" @selectData="onClassData" :currIndex="classIndex"></listSelect>
      </div>
    </div>
  </div>
</template>
<script>
import listSelect from '@/modules/list/list-select'
import VMask from '@/modules/mask/VMask'
// import sortJs from '@/components/classManager/assets/js/sortNumber.js'
import local from '@/components/classManager/assets/js/localStore.js'
export default {
  name: 'selecClass',
  components: {
    listSelect,
    VMask
  },
  data () {
    return {
      show: false,
      gradeList: [],
      classList: [],
      gradeName: '',
      className: '',
      classId: 0,
      gradeId: 0,
      gradeIndex: 0, // 年级索引
      classIndex: 0, // 班级索引
      isHaveGroup: false,
      periodId: '', // 学段id
      flag1: true,
      flag2: true,
      index: {}
    }
  },
  watch: {
    classId () {
      // console.log(1)
      this.getclassId({classId: this.classId})
    }
  },
  computed: {
    concatName () {
      return this.gradeName + this.className
    }
  },
  methods: {
    getData (url) { // 得到班级数据
      this.$preloaderFull.show({ mask: true })
      return this.$axios.get(url).then(({ data }) => {
        // console.log(data)
        this.$preloaderFull.close()
        if (data.status === 200) {
          return data.result
        } else {
          return Promise.reject(new Error(data.message))
        }
      }).catch((erro) => {
        this.$preloaderFull.close()
        console.log(erro)
      })
    },
    onGradeData (d) { // 年级
      // console.log(d)
      if (d.value) {
        this.classList = d.value.classes
        this.gradeName = d.value.grade_name
        this.index.gradeIndex = d.i
        // console.log(this.gradeIndex)
        this.periodId = d.value.period_id
      }
    },
    transGradeClassName (obj) { // 传送班级名称和班级id
      this.$emit('transClassName', obj)
    },
    onClassData (d) { // 班级
      if (d.value) {
        // console.log(d.value)
        this.className = d.value.class_name
        this.classId = d.value.class_id
        this.isHaveGroup = d.value.has_group === 'true'
        this.periodId = d.value.period_id
        this.index.classIndex = d.i
        this.setManagerIndex()
        this.setClassId()
        local.set('gradeClassInfo', {className: this.className, gradeName: this.gradeName})
      }
    },
    getClassData () {
      // alert(1)
      this.getData('/palm/v2/teacherclasses').then((data) => {
        // console.log(data)
        this.gradeList = data.grades
        let headerClassList = data.head_teacher_class_list
        let isMaster = !!headerClassList.length // 判断是否是班主任
        if (headerClassList.length) { // 说明是班主任
          this.gradeName = headerClassList[0].grade_name
          this.className = headerClassList[0].class_name
          this.gradeId = headerClassList[0].grade_id
          this.classId = headerClassList[0].class_id
          this.periodId = headerClassList[0].period_id
          this.isHaveGroup = headerClassList[0].has_group === 'true' // 是否有小组
          // console.log(this.gradeName)
          this.gradeList.forEach((ele, index) => {
          // console.log(typeof this.gradeId)
            if (this.gradeId === ele.grade) {
              this.gradeIndex = index
            // console.log(this.gradeIndex)
            }
          })
          // console.log(this.gradeIndex)
          this.classList = this.gradeList[this.gradeIndex].classes
          this.classList.forEach((ele, index) => {
          // console.log(ele.class_id)
            if (this.classId === ele.class_id) {
              this.classIndex = index
            }
          })
        } else {
          this.gradeId = this.gradeList[0].grade
          this.classList = this.gradeList[0].classes // 如果是班主任默认在数组中的第一个数据，后台已排好序
          this.periodId = this.classList[0].period_id
          this.classId = this.classList[0].class_id
          this.isHaveGroup = this.classList[0].has_group === 'true' // 是否有小组
          // local.set('classId', this.classId)
          this.gradeName = this.gradeList[0].grade_name
          this.className = this.classList[0].class_name
        }
        // console.log(this.gradeIndex)
        local.set('gradeList', this.gradeList) // 将年级保存到本地
        this.getclassId({isMaster: isMaster})
        this.setManagerIndex()
        this.setClassId()
        local.set('gradeClassInfo', {className: this.className, gradeName: this.gradeName})
        // console.log(this.$managerBus)
        // // console.log(this.$managerBus.classIndex, this.$managerBus.gradeIndex)
      })
    },
    getclassId (obj) {
      this.$emit('classData', obj)
    },
    setManagerIndex () {
      this.$managerBus.gradeIndex = this.index.gradeIndex
      this.$managerBus.classIndex = this.index.classIndex
    },
    setClassId () { // 设定班级id学段id和判定是否有小组
      this.$managerBus.classId = this.classId
      this.$managerBus.isHaveGroup = this.isHaveGroup
      this.$managerBus.periodId = this.periodId
    }
  },
  created () {
    this.getClassData()
  }
}
</script>
<style scoped>
.select-inner {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  /* margin-top: 10px; */
  position: relative;
  z-index: 10;
}
.select-inner-box {
  height: 25px;
  width: 120px;
  background-color: #f8ab59;
  border-radius: 12.5px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.select-inner-box i.iconfont {
  font-size: 28px;
}
.grade {
  color: #ffffff;
  font-size: 13px;
  display: inline-block;
  margin-left: 25px;
}
.content {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  height: 0;
  background: #ffffff;
  transition: all 0.2s;
  display: flex;
  overflow: hidden;
}
.active {
  height: 250px;
}
</style>
