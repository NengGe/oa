<template>
  <div class="list-gradeclass">
    <div class="center">
      <listSelect attr='grade_name' aaa='111' @getIndex="onGetIndexA" :list='gradeList' >
        <ul class="list">
          <li class="item" v-for="(item, i) in gradeList" :key="i">{{item['grade_name']}}</li>
        </ul>
      </listSelect>
    </div>
    <div class="center">
      <listSelect attr='class_name' aaa='222' @getIndex="onGetIndexB" :list='classList'>
        <ul class="list">
          <li class="item" v-for="(item, i) in classList" :key="i">{{item['class_name']}}</li>
        </ul>
      </listSelect>
    </div>
  </div>
</template>

<script>
import listSelect from '@/modules/list/list-select'
// import listSelect from '@/modules/list/list-select.1'
export default {
  components: {
    listSelect
  },
  data () {
    return {
      currGradeIndex: 0,
      gradeList: []
    }
  },
  watch: {
    gradeAndClass () {
      this.$emit('getClassInfo', this.classData)
    }
  },
  computed: {
    gradeAndClass () {
      return this.classData ? `${this.gradeData['grade_name']}${this.classData['class_name']}` : ''
    },
    classList () {
      let i = this.currGradeIndex
      // return []
      return this.gradeList[i] ? this.gradeList[i].classes : []
    }
  },
  created () {
    this.getData()
  },
  updated () {
    console.log('list-gradeclass updated')
  },
  methods: {
    onGetIndexA (i) {
      console.log('onGetIndexA')
      this.currGradeIndex = i
    },
    onGetIndexB () {

    },
    getData () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/teacherclasses`).then(({ data }) => {
        this.$preloaderFull.close()
        console.log('年级data', data)
        if (data.status === 200) {
          let d = data.result.grades
          this.gradeList = this.$arrSort(d, 'grade_id')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-gradeclass {
  width: 100%;
  display: flex;
  align-items: center;
  height: inherit;
  overflow-y: hidden;
}
.center {
  flex: 1;
  // position: absolute;
  left: 0;
  top: 100px;
  // width: 100%;
  height: 50px;
  // background: #ddd;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  box-sizing: border-box;
}
.list {
  // height: 250px;
}
.item {
  line-height: 50px;
  height: 50px;
  color: #999;
  // border-bottom: 1px #ccc solid;
  text-align: center;
  box-sizing: border-box;
}
</style>
