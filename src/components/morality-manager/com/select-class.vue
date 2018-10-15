<template>
  <div class="select-class">
    <VMask v-show="isShow" @click="isShow=!isShow"></VMask>
    <div class="head" @click='isShow=!isShow'>
      <span class="text">{{gradeAndClass||'请选择'}}</span>
      <i class="iconfont">&#xe6ac;</i>
      <div class="content" :class="{active:isShow}" @click.stop>
        <listSelect attr='grade_name' :list='gradeList' :currIndex='currGradeIndex' @selectData="onGradeData"></listSelect>
        <listSelect attr='class_name' :list='classList' :currIndex='currClassIndex' @selectData="onClassData"></listSelect>
      </div>
    </div>
  </div>
</template>

<script>
import listSelect from '@/modules/list/list-select'
import VMask from '@/modules/mask/VMask'
export default {
  name: 'select-class',
  components: {
    listSelect,
    VMask
  },
  data () {
    return {
      currGradeIndex: 0,
      currClassIndex: 0,
      isShow: false,
      gradeList: []
    }
  },
  watch: {
    gradeAndClass (n) {
      let { classList, currClassIndex } = this
      let classInfo = classList[currClassIndex]
      if (classInfo) {
        classInfo.classStr = n
        this.$emit('getClassInfo', classInfo)
      }
    }
  },
  computed: {
    gradeAndClass () {
      let { gradeList, classList, currGradeIndex, currClassIndex } = this
      let gradeData = gradeList[currGradeIndex]
      let classData = classList[currClassIndex]
      return classData ? `${gradeData['grade_name']}${classData['class_name']}` : ''
    },
    classList () {
      let i = this.currGradeIndex
      return this.gradeList[i] ? this.gradeList[i].classes : []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    initSelClass ({ grade, classId }) {
      let currGradeIndex = this.gradeList.findIndex(item => {
        return item.grade === grade
      })
      this.currGradeIndex = currGradeIndex === -1 ? 0 : currGradeIndex
      // this.gradeData = this.gradeList[this.currGradeIndex]
      let currClassIndex = this.gradeList[this.currGradeIndex].classes.findIndex(item => {
        return item.class_id === classId
      })
      this.currClassIndex = currClassIndex === -1 ? 0 : currClassIndex
      // this.classData = this.gradeList[this.currGradeIndex].classes[this.currClassIndex]
    },
    onGradeData (d) {
      this.gradeData = d.value
      this.currGradeIndex = d.i
    },
    onClassData (d) {
      // console.log('onClassData')
      // this.classData = d.value
      this.currClassIndex = d.i
    },
    getData () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/teacherclasses`).then(({ data }) => {
        this.$preloaderFull.close()
        // console.log('年级data', data)
        if (data.status === 200) {
          let d = data.result.grades
          this.gradeList = this.$arrSort(d, 'grade')
          // console.log('年级data', this.gradeList)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.select-class {
}
.head {
  position: relative;
  z-index: 9;
  background: #eeeff3;
  line-height: 38px;
  height: 38px;
  text-align: center;
  color: #88b8f8;
  font-size: 15px;
}
.content {
  position: absolute;
  left: 0;
  top: 100%;
  width: 100%;
  overflow: hidden;
  transition: all 0.2s;
  padding: 0 16px;
  background: #fff;
  display: flex;
  height: 0;
  &.active {
    padding: 30px 16px;
    height: 250px;
  }
}
</style>
