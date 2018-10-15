<template>
  <div class="schoolStatisticIndex">
    <app></app>
    <bg></bg>
    <bottomBar @getIndex="getIndex"></bottomBar>
  </div>
</template>
<script>
import app from '@/app'
import bg from '@/components/morality-manager/components/bg'
import bottomBar from '@/components/morality-manager/pages/schoolStatistic/bottomBar'
import session from '@/components/morality-manager/assets/js/session.js'
export default {
  name: 'schoolStatisticIndex',
  components: {
    app,
    bottomBar,
    bg
  },
  data () {
    return {
      role: 1
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
    getIndex (index) {
      if (index === 0) {
        this.$router.replace({path: 'staAcordClass'})
      } else if (index === 1) {
        this.$router.replace({path: 'acordSchoolSystem'})
      } else if (index === 2) {
        this.$router.replace({path: 'acordDormitory'})
      }
    },
    getSchoolClassData () { // 得到班级数据做保存
      this.getData('/palm/v2/teacherclasses').then(data => {
        // console.log(data)
        session.set('schoolClassData', data.grades)
      })
    },
    getDormitoryData () { // 得到宿舍数据做保存
      this.getData('/palm/v2/dorm/list').then(data => {
        // console.log(data)
        let classId = this.$moralityBus.classId
        // console.log(this.role)
        let dataList = data.data
        if (this.role === 1) {
          // dataList = data.data
        } else if (this.role === 2) { // 根据班级id进行过滤
          let newArr = []
          dataList.forEach(ele => {
            let obj = {}
            obj.name = ele.name
            let dormItemArr = ele.dorm_list.filter(element => {
              return element.class_id === classId
            })
            obj.dorm_list = dormItemArr
            newArr.push(obj)
          })
          dataList = newArr
        }
        // console.log(dataList)
        // session.del('dormitoryData')
        session.set('dormitoryData', dataList)
      })
    }
  },
  watch: {
  },
  created () {
    this.getSchoolClassData()
    this.getDormitoryData()
    this.role = this.$moralityBus.role
    // console.log('1111')
  }
}
</script>

<style scoped>
  .schoolStatisticIndex /deep/ .iconfont-morality {
      font-family: "iconfont-morality";
      /* font-size: 32px; */
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      color: #ffffff;
  }
  .teacher-index a {
    text-decoration: underline;
    color: blue;
  }
  .teacher-index .teacher-item {
    padding: 10px;
  }
</style>