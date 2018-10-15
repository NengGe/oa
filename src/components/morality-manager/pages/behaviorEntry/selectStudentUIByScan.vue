<template>
  <div class="selectStudent bottom-one-px">
    <div class="item">{{student.grade_name}}{{student.class_name}}</div>
    <div class="item">{{student.user_id}}</div>
    <div class="item">{{student.user_name}}</div>
    <div class="item btn clickActive" @click="reScan">重扫</div>
  </div>
</template>

<script>
import { OpenScan } from '@/js/native-interaction.js'
export default {
  props: {
    studentId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      studentList: []
    }
  },
  watch: {
    studentId (n) {
      n && this.getSerch(n)
    }
  },
  computed: {
    student () {
      let { studentList } = this
      return studentList[0] ? studentList[0] : {}
    }
  },
  created () {
    OpenScan().then(d => {
      this.getSerch(d)
    })
  },
  methods: {
    reScan () {
      OpenScan().then(d => {
        this.getSerch(d)
      })
    },
    getSerch (k) {
      let no = k
      let name = ''
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/student/search?role_id=2&student_no=${no}&student_name=${name}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.studentList = data.result.data
          this.$emit('change', this.studentList)
          !this.studentList[0] && this.$simpleMsg('无匹配对象')
        } else {
          this.$simpleMsg(data.message)
        }
      })
    }
  }
}
</script>

<style scoped>
.selectStudent {
  display: flex;
  justify-content: space-around;
  height: 54px;
  background: #fff;
  line-height: 54px;
}
.item {
  font-size: 15px;
}
.btn {
  margin-top: 12px;
  color: #88b8f8;
  width: 60px;
  height: 30px;
  border: 1px solid #88b8f8;
  border-radius: 15px;
  box-sizing: border-box;
  line-height: 28px;
  text-align: center;
}
</style>
