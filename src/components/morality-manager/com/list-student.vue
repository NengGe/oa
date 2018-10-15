<template>
  <div class="list-student">
    <div class="head">
      <i class="text">学号</i>
      <i class="text">姓名</i>
      <i class="text">操作</i>
    </div>
    <div class="container">
      <listScroll>
        <ul class="list">
          <li class="item" v-for="(item, i) in studentList" :key="i">
            <div class="text">{{item.sno}}</div>
            <div class="text">{{item.user_name}}</div>
            <div class="text">
              <div class="btn" @click.stop="selAction(item, i)" :class="{active: selectData.hasOwnProperty(item.user_id)}">选择</div>
              <!-- <div class="btn" @click.stop="selAction(item, i)" :class="{active: item.isSelected}">选择</div> -->
            </div>
          </li>
        </ul>
      </listScroll>
    </div>
    <Selected ref="Selected" attr='user_name' :data='selectList' @del='onDel'></Selected>
  </div>
</template>

<script>
import listScroll from '@/modules/list/list-scroll'
import Selected from '@/components/student-leave/com/Selected'
export default {
  components: {
    listScroll,
    Selected
  },
  props: {
    classId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      classData: {},
      studentList: [],
      selectData: {},
      selectList: []
    }
  },
  computed: {
    // selectList () {
    //   let d = []
    //   for (let k in this.selectData) {
    //     d.push(this.selectData[k])
    //   }
    //   return d
    // }
  },
  watch: {
    classId (n) {
      this.classData.hasOwnProperty(n) ? this.studentList = this.classData[n] : this.getStudentList()
      this.onDel()
    }
  },
  methods: {
    initSelStu (d) {
      this.selectList = d
      d.forEach(item => {
        this.$set(this.selectData, item.user_id, item)
      })
    },
    getSelectList () {
      return this.selectList
    },
    onDel () {
      this.selectData = {}
      this.selectList = []
    },
    selAction (item, i) {
      let flag = this.selectData.hasOwnProperty(item.user_id)
      this.selOne(item, !flag)
    },
    selOne (item, flag) {
      item.isSelected = flag
      if (flag) {
        this.$set(this.selectData, item.user_id, item)
        this.selectList.push(item)
      } else {
        this.$delete(this.selectData, item.user_id, item)
        let index = this.selectList.findIndex((stu) => {
          return stu.user_id === item.user_id
        })
        this.selectList.splice(index, 1)
      }
    },
    // getData () {
    //   let d = []
    //   let n = 20
    //   for (let i = 0; i < n; i++) {
    //     d.push({
    //       user_name: '张三三' + i,
    //       user_id: '' + i
    //     })
    //   }
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //       this.classData[this.classId] = d
    //       // this.$set(this.classData, this.classId, d)
    //       resolve(d)
    //     }, 100)
    //   })
    // },
    getStudentList () {
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/students?classid=${this.classId}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          let d = data.result.students.map(item => {
            return {
              user_id: item.user_id,
              user_name: item.user_name,
              class_id: item.class_id,
              sno: item.sno,
              isSelected: false
            }
          })
          this.$set(this.classData, this.classId, d)
          // this.classData[this.classId] = d
          this.studentList = d
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.list-student {
  padding: 0 14px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.head {
  // padding: 0 12px;
  display: flex;
  border-bottom: 1px solid #ddd;
  .text {
    flex: 1;
    text-align: center;
    font-size: 15px;
    font-weight: bold;
    line-height: 32px;
  }
}
.container {
  flex: 1;
  position: relative;
  overflow: hidden;
  // border-top: 1PX #ddd solid;
  border-bottom: 1px #ddd solid;
}
.item {
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 25px;
  color: #999;
  .text {
    flex: 1;
    text-align: center;
    line-height: 30px;
  }
  .btn {
    margin: 0 auto;
    width: 60px;
    height: 30px;
    border: 1px solid #ddd;
    border-radius: 15px;
    box-sizing: border-box;
    line-height: 28px;
    &.active {
      color: #88b8f8;
      border: 1px solid #88b8f8;
    }
  }
}
</style>
