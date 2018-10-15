<template>
  <div class="selectStudentByName bottom-one-px top-one-px">
    <oa-search :keyword.sync='inputV' placeholder="搜索姓名/学号"></oa-search>
    <ul class="list">
      <li class="item" v-for="(item, i) in studentList" :key="i">
        <div class="text">{{item.user_id}}</div>
        <div class="text">{{item.user_name}}</div>
        <div class="text">
          <div class="btn" @click.stop="selAction(item, i)" :class="{active: selItem && selItem.user_id === item.user_id}">选择</div>
          <!-- <div class="btn" @click.stop="selAction(item, i)" :class="{active: item.isSelected}">选择</div> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // studentList: {
    //   type: Array
    // }
  },
  data () {
    return {
      selItem: {},
      inputV: '',
      studentList: []
    }
  },
  watch: {
    inputV (k) {
      k = k.trim()
      if (k) {
        this.getSerch(k)
      } else {
        this.studentList = []
      }
    }
  },
  methods: {
    selAction (item, i) {
      if (this.selItem && this.selItem.user_id === item.user_id) {
        this.selOne(item, false)
      } else {
        this.selOne(item, true)
      }
      let d = this.selItem ? [this.selItem] : []
      this.$emit('change', d)
    },
    selOne (item, flag) {
      if (flag) {
        item.isSelect = true
        if (this.selItem) this.selItem.isSelect = false
        this.selItem = item
      } else {
        item.isSelect = false
        this.selItem = null
      }
    },
    getSerch (k) {
      let no = ''
      let name = ''
      if (/^\d+$/.test(k)) { // k 全为数字 搜学号
        no = k
      } else { // 搜姓名
        name = k
      }
      this.$preloaderFull.show()
      return this.$axios.get(`/palm/v2/student/search?role_id=2&student_no=${no}&student_name=${name}`).then(({ data }) => {
        this.$preloaderFull.close()
        if (data.status === 200) {
          this.studentList = data.result.data
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.selectStudentByName {
  background: #fff;
  overflow: hidden;
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
