<template>
  <div class="acord-object">
    <VMask @click="isShow=!isShow" v-show="isShow"></VMask>
    <div class="topbar">
      <div class="top-inner" @click="show">
        <span class="class-name">{{concatName}}</span>
        <span class="icon-inner">
          <i class="icnofont pullup">&#xe601;</i>
        </span>
      </div>
      <div class="content" :class="{'active': isShow}">
        <listSelect attr="grade_name" :list="gradeList" @selectData="onGradeData" :currIndex="gradeIndex"></listSelect>
        <listSelect attr="class_name" :list="classList" @selectData="onClassData" :currIndex="classIndex"></listSelect>
      </div>
    </div>
    <nameBlock @click="choose" :students="students" @close="$emit('close')" ref="nameBlock"></nameBlock>
  </div>
</template>
<script>
import nameSearch from '@/components/classManager/pages/nameSearch'
import nameBlock from '@/components/classManager/entryBehavior/nameBlock'
import listSelect from '@/modules/list/list-select'
import VMask from '@/modules/mask/VMask'
// import sortJs from '@/components/classManager/assets/js/sortNumber.js'
import local from '@/components/classManager/assets/js/localStore.js'
export default {
  name: 'acordObject',
  components: {
    nameSearch,
    nameBlock,
    listSelect,
    VMask
  },
  data () {
    return {
      index1: 0,
      gradeList: [],
      classList: [],
      gradeName: '',
      className: '',
      isShow: false,
      classId: '',
      students: [],
      flag1: true, // 控制刚进入页面时候使用本地保存也就是首页的年级班级数据
      flag2: true,
      gradeIndex: 0,
      classIndex: 0,
      periodId: ''
      // iniTinfo: {}
    }
  },
  methods: {
    getData (url) {
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
    getClassData (url) {
      return this.getData(url)
    },
    getStudents () { // 得到班级学生
      this.getData('/palm/v2/students?classid=' + this.classId).then((data) => {
        this.students = data.students
        // console.log(data)
      })
    },
    transId (obj) {
      this.$emit('transId', obj)
    },
    onGradeData (d) {
      // console.log(d)
      // this.gradeName = d.value.grade_name
      // this.classList = d.value.classes
      if (d.value) {
        if (!this.flag1) {
          this.gradeName = d.value.grade_name
          this.classList = d.value.classes
          this.periodId = d.value.period_id
          // this.$managerBus.gradeIndex = d.i
        } else {
          this.gradeName = this.gradeList[this.gradeIndex].grade_name
          this.flag1 = false
        }
      }
    },
    onClassData (d) {
      // console.log(d)
      let _this = this
      if (d.value) {
        if (!this.flag2) {
          this.className = d.value.class_name
          this.classId = d.value.class_id
          this.transId({
            periodId: _this.periodId,
            classId: _this.classId
          })
          // this.$managerBus.classIndex = d.i
        } else {
          this.className = this.classList[this.classIndex].class_name
          this.classId = this.classList[this.classIndex].class_id
          this.flag2 = false
        }
      }
      this.$refs.nameBlock.close() // 切换班级时候下面所选的对象清空
    },
    choose (obj) { // 录入选取对象
      this.$emit('click', obj)
    },
    show () {
      this.isShow = !this.isShow
      // 展开时候默认显示一年级一班
      // this.gradeName = this.gradeList[0].grade_name
      // this.className = this.classList[0].class_name
      // this.classId = this.classList[0].class_id
    },
    init () {
      if (this.localGradeList.length) {
        // console.log('hehe')
        setTimeout(() => {
          this.gradeList = this.localGradeList
          this.gradeIndex = this.$managerBus.gradeIndex
          this.classList = this.gradeList[this.gradeIndex].classes
          this.classIndex = this.$managerBus.classIndex
        }, 0)
      } else {
        // this.getClassData('/palm/v2/classmanage').then((data) => {
        // // console.log(data)
        //   this.gradeList = data.grades
        //   this.gradeList = sortJs(data.grades, 'grade') // 排序是为了年级从小到大
        //   this.gradeIndex = this.$managerBus.gradeIndex
        //   this.classList = this.gradeList[this.gradeIndex].classes
        //   this.classIndex = this.$managerBus.classIndex
        // })
      }
    }
  },
  created () {
    this.init()
  },
  computed: {
    concatName () {
      // console.log(this.gradeName)
      return this.gradeName + '' + this.className
    },
    localGradeList () {
      return JSON.parse(local.get('gradeList')) || []
    }
  },
  watch: {
    classId () {
      this.getStudents()
    }
  }
}
</script>
<style scoped>
.acord-object {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  transition: all 0.3s;
  transform: translateY(100%);
  z-index: 1;
  background: #ffffff;
}
.acord-object /deep/ .iconfont {
  font-family: "iconfont-morality";
  font-size: 32px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #ffffff; */
}
.topbar i.pullup {
  font-family: "iconfont-morality";
  font-size: 28px;
  position: absolute;
  top: -7px;
  left: -3px;
}
.icon-inner {
  position: relative;
}
.topbar {
  height: 37.5px;
  background-color: #ffffff;
  text-align: center;
  line-height: 37.5px;
  color: #88b8f8;
  font-size: 15px;
  position: relative;
  z-index: 9;
}
.search-outer {
  padding: 0px 10px;
  margin-top: 5px;
}
.content {
  position: absolute;
  left: 0;
  width: 100%;
  top: 100%;
  background: #ffffff;
  transition: .3s;
  overflow: hidden;
  height: 0;
  display: flex;
}
.active {
  height: 250px;
}
</style>