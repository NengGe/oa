<template>
  <transition name="slide-bottom" enter-active-class="transition-active" leave-active-class="transition-active">
    <div class='selectClassUI' v-show="isShowVar">
      <div class="grade-box">
        <!-- 年级 -->
        <selectGrade>
          <ul class="grade-ul">
            <li class="grade-item"
             v-for="(item, index) in gradeList" 
             :key="'grade'+index" 
             @click="changeTabs(item, index)"
             :class="[index===ind?'bg-w':'', isChoiceList[index]['isChoose']?'choose-active':'']">
              <span class="grade-name">{{item.grade_name}}</span>
              <span class="all-choice-btn" v-show="isChoiceList[index]['isAll']">全选</span>
            </li>
          </ul>
        </selectGrade>
        <!-- 班级 -->
        <selectGradeClass v-for="(item, index) in classTabsLen" :key="'selectGradeClass'+index" v-show="index===ind">
          <ul class="grade-class-ul">
            <li class="class-item all-choice" @click="allChoice">
              <span class="class-name">全选</span>
              <chocieBox :isChoice="isChoiceList[ind]['isAll']"></chocieBox>
            </li>
            <li class="class-item" v-for="(ele, index) in classList" :key="'class'+index" @click="chooseClass(ele, index)">
              <span class="class-name">{{ele.class_name}}</span>
              <chocieBox :isChoice="isChoiceList[ind][index]"></chocieBox>
            </li>
          </ul>
        </selectGradeClass>
      </div>
      <sure-btn @click="sure"></sure-btn>
    </div>
  </transition>
</template>

<script>
import selectGrade from '@/components/morality-manager/pages/behaviorEntry/slelecGrade'
import selectGradeClass from '@/components/morality-manager/pages/behaviorEntry/selectGradeClass'
import sureBtn from '@/components/morality-manager/components/sureBtn'
import chocieBox from '@/components/morality-manager/components/choiceBox'
export default {
  name: 'selectClassUI',
  components: {
    selectGrade,
    selectGradeClass,
    sureBtn,
    chocieBox
  },
  props: {
  },
  data () {
    return {
      isShowVar: false,
      gradeList: [],
      classList: [],
      ind: 0, // 年级索引
      classTabsLen: [],
      isChoiceList: {}, // 保存各个班级的选中状态
      classIdList: {}, // 要提交的id
      nameInfo: {}, // 年级班级信息
      periodIdList: []
    }
  },
  computed: {
  },
  created () {
    this.getClassData()
  },
  methods: {
    getData (url, isLoad) {
      if (!isLoad) { // 上啦加载 下拉刷新时候不显示loading
        this.$preloaderFull.show({ mask: true })
      }
      return this.$axios.get(url).then(({ data }) => {
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
    changeTabs (item, index) { // 切换年级
      this.ind = index
      this.classList = item.classes
    },
    chooseClass (ele, index) { // 选择具体班级
      let {ind} = this
      // this.isChoiceList[0][0] = false
      this.$set(this.isChoiceList[ind], index, !this.isChoiceList[ind][index])
      this.juadgeIsChoose()
      this.juadgeIsAll()
      this.preserveIdList(ele, index)
      // console.log(this.isChoiceList)
    },
    preserveIdList (ele, index) { // 单个选择班级添加和删除班级id
      let {ind} = this
      let gradeName = this.gradeList[ind].grade_name
      if (!this.nameInfo[gradeName]) {
        this.$set(this.nameInfo, gradeName, {})
      }
      if (this.isChoiceList[ind][index]) {
        this.$set(this.classIdList, ele.class_id, ele.class_id)
        this.$set(this.nameInfo[gradeName], index, ele.class_name)
        this.$set(this.nameInfo[gradeName], 'period_id', ele.period_id)
      } else {
        this.$delete(this.classIdList, ele.class_id, ele.class_id)
        this.$delete(this.nameInfo[gradeName], index, ele.class_name)
        this.$delete(this.nameInfo[gradeName], 'period_id', ele.period_id)
      }
      // console.log(this.nameInfo)
    },
    allpreserveIdList (isAllChoose) { // 全选时候添加和删除班级id
      let {ind} = this
      let classes = this.gradeList[ind].classes
      let gradeName = this.gradeList[ind].grade_name
      if (!this.nameInfo[gradeName]) {
        this.$set(this.nameInfo, gradeName, {})
      }
      if (isAllChoose) {
        classes.forEach((ele, index) => {
          this.$set(this.classIdList, ele.class_id, ele.class_id)
          this.$set(this.nameInfo[gradeName], index, ele.class_name)
          this.$set(this.nameInfo[gradeName], 'period_id', ele.period_id)
        })
      } else {
        classes.forEach((ele, index) => {
          this.$delete(this.classIdList, ele.class_id, ele.class_id)
          this.$delete(this.nameInfo[gradeName], index, ele.class_name)
          this.$delete(this.nameInfo[gradeName], 'period_id', ele.period_id)
        })
      }
      // console.log(this.classIdList)
      // console.log(this.nameInfo)
    },
    juadgeIsChoose () { // 单个选择班级时候判断当前年级的班级是否有至少有一个被选中
      let {ind} = this
      let keys = Object.keys(this.isChoiceList[ind])
      // console.log(keys)
      let isChoose = keys.some((ele) => {
        // console.log(ele)
        if (ele !== 'isAll' && ele !== 'isChoose') {
          return this.isChoiceList[ind][ele] === true
        }
      })
      // console.log(isChoose)
      this.$set(this.isChoiceList[ind], 'isChoose', isChoose)
      // console.log(this.isChoiceList)
    },
    juadgeIsAll () { // 单个选择班级时候判断是否班级被全部选择
      let {ind} = this
      let keys = Object.keys(this.isChoiceList[ind])
      keys.splice(keys.indexOf('isAll'), 1)
      let isAll = keys.every((ele) => {
        return this.isChoiceList[ind][ele] === true
      })
      // console.log(isAll)
      this.$set(this.isChoiceList[ind], 'isAll', isAll)
    },
    allChoice () { // 全选班级
      let {ind} = this
      this.$set(this.isChoiceList[ind], 'isAll', !this.isChoiceList[ind]['isAll'])
      let isAllChoose = this.isChoiceList[ind]['isAll']
      // console.log(isAllChoose)
      if (isAllChoose) { // 全选
        for (var k in this.isChoiceList[ind]) {
          this.isChoiceList[ind][k] = true
        }
      } else { // 全部不选
        for (var key in this.isChoiceList[ind]) {
          this.isChoiceList[ind][key] = false
        }
      }
      this.allpreserveIdList(isAllChoose)
    },
    isShow () {
      this.isShowVar = !this.isShowVar
    },
    sure () {
      this.isShow()
      let classIdList = Object.keys(this.classIdList).map(ele => this.classIdList[ele])
      // console.log(this.classNameInfo)
      let nameInfo = this.getClassNameInfo()
      let periodIdList = this.getPeriodIdList()
      // console.log(periodIdList)
      // console.log(classIdList)
      this.$emit('getClassInfo', {
        classIdList,
        nameInfo,
        periodIdList
      })
    },
    getClassNameInfo () {
      let gradeNameKeys = Object.keys(this.nameInfo)
      // let info = ''
      // console.log(gradeNameKeys)
      return gradeNameKeys.map((ele, index) => {
        let arr = Object.keys(this.nameInfo[ele]).filter(item => item !== 'period_id').map(item => this.nameInfo[ele][item])
        // console.log(Object.keys(this.nameInfo[ele]))
        let arrInfo = arr.map((element, index) => {
          // console.log(element)
          return element + ((index === arr.length - 1) ? '' : '、')
        })
        // console.log(arrInfo)
        return arr.length ? ele + '(' + arrInfo.join('') + ')' : ''
      }).join(' ')
    },
    getPeriodIdList () {
      let gradeNameKeys = Object.keys(this.nameInfo)
      let periodIdList = []
      gradeNameKeys.forEach((ele, index) => {
        let id = this.nameInfo[ele]['period_id']
        if (id && periodIdList.indexOf(id) === -1) {
          periodIdList.push(id)
        }
        // periodIdList
      })
      return periodIdList
    },
    initChoiceState () { // 初始化选中状态
      this.classTabsLen.forEach((ele, index) => {
        this.$set(this.isChoiceList, index, {})
        this.$set(this.isChoiceList[index], 'isAll', false) // 是否全选
        this.$set(this.isChoiceList[index], 'isChoose', false) // 当前年级的班级是否至少有一个被选中 被选中则为true 可用every判断
        let len = this.gradeList[index].classes.length
        for (let i = 0; i < len; i++) {
          this.$set(this.isChoiceList[index], i, false)
        }
      })
    },
    getClassData () {
      this.getData('/palm/v2/teacherclasses').then(data => {
        console.log(data)
        this.gradeList = data.grades
        this.classList = this.gradeList[0].classes
        this.classTabsLen = Array.apply(null, {length: this.gradeList.length})
        this.initChoiceState()
        // console.log(this.isChoiceList)
      })
    }
  }
}
</script>

<style scoped>
.selectClassUI {
  /* height: 800px; */
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #f7f7f9;
  overflow: auto;
}
.grade-box {
  /* display: flex; */
}
.grade-item {
  height: 60px;
  background-color: #e9e9e9;
  /* line-height: 60px; */
  padding-left: 23px;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bg-w {
  background: #ffffff;
}
.choose-active .grade-name {
  color: #333333;
  font-weight: bold;
}
.all-choice-btn {
  display: inline-block;
  text-align: center;
  width: 35px;
  height: 17px;
  line-height: 17px;
  font-size: 10px;
  background-color: #c4c4c4;
  border-radius: 8.5px 0px 0px 8.5px;
  color: #ffffff;
}
.grade-class-ul {
  padding: 0px 17px 0px 19px;
}
.class-item {
  color: #999999;
  box-sizing: border-box;
  height: 60px;
  line-height: 60px;
  border-bottom: solid 0.5px #f5f2f2;
  padding-left: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>