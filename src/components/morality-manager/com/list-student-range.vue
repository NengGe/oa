<template>
  <div class="list-student-range">
    <div class="dais-box">
      <div class="dais"></div>
      <span class="text">讲台</span>
    </div>
    <div class="box">
      <div class="head">行
        <span class="text">(横为行)</span>
      </div>
      <div class="row-box">
        <div class="del btn bg-pink clickActive2" @click="delRow">-</div>
        <div class="content color-pink">{{`第${row}行`}}</div>
        <div class="add btn bg-pink clickActive2" @click="addRow">+</div>
      </div>
    </div>
    <div class="box">
      <div class="head">列
        <span class="text">(竖为行)</span>
      </div>
      <div class="row-box">
        <div class="del btn bg-blue clickActive2" @click="delLine">-</div>
        <div class="content color-blue">{{`第${line}行`}}</div>
        <div class="add btn bg-blue clickActive2" @click="addLine">+</div>
      </div>
    </div>
    <Selected class="Selected" ref="Selected" attr='user_name' :data='selectList'></Selected>
  </div>
</template>

<script>
import Selected from '@/components/student-leave/com/Selected'
export default {
  components: {
    Selected
  },
  data () {
    return {
      row: 1,
      line: 1
    }
  },
  computed: {
    selectList () {
      let { row, line } = this
      let rowStr = `第${row}行`
      let lineStr = `第${line}行`
      return [rowStr, lineStr]
    }
  },
  methods: {
    getRangeInfo () {
      let { row, line } = this
      return {
        row,
        line,
        text: `第${row}行 第${line}列`
      }
    },
    delRow () {
      if (this.row <= 1) return
      this.row--
    },
    addRow () {
      // if (this.row <= 1) return
      this.row++
    },
    delLine () {
      if (this.line <= 1) return
      this.line--
    },
    addLine () {
      // if (this.row <= 1) return
      this.line++
    }
  }
}
</script>


<style scoped>
.Selected {
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 0;
}
.list-student-range {
  flex: 1;
  position: relative;
}
.dais-box {
  margin: auto;
  width: 80px;
  height: 30px;
  position: relative;
  text-align: center;
  margin-top: 15px;
}
.dais {
  position: absolute;
  height: 0;
  width: 50px;
  border-top: 30px solid #88b8f8;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  z-index: -1;
}
.dais-box .text {
  line-height: 30px;
  color: #fff;
}
.row-box {
  display: flex;
  margin: 12px;
  text-align: center;
  height: 54px;
  line-height: 54px;
  border: 1px #ccc solid;
  border-radius: 6px;
  overflow: hidden;
}
.btn {
  width: 54px;
  font-size: 30px;
  color: #fff;
  line-height: 50px;
}
.content {
  flex: 1;
  font-size: 15px;
  font-weight: bold;
}
.box {
  margin-top: 50px;
}
.head {
  margin-left: 12px;
  color: #666;
  font-size: 15px;
}
.head .text {
  color: #999;
}
.bg-pink {
  background: #e2a3d7;
}
.bg-blue {
  background: #88b8f8;
}
.color-pink {
  color: #e2a3d7;
}
.color-blue {
  color: #88b8f8;
}
</style>

