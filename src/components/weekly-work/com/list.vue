<template>
  <ul class="list">
    <li class="item" v-for="(item, i) in list" :key="i">
      <div class="title">
        <div class="l ep">
          <span class="type" :class="mode[item.module_code].className">{{mode[item.module_code].content}}</span>
          <span class="text">{{item.title}}</span>
        </div>
        <div class="r" v-if="needStatus">
          <span class="status bg-red clickActive2" v-if="item.state==='1'" @click="$emit('reject', item,i)">不通过</span>
          <!-- <span class="status" v-else-if="item.state==='2'||item.state==='3'" :class="item.state==='2'?'bg-green':'bg-gray'">{{item.state==='2'?'已通过':'未通过'}}</span> -->
          <statusFlag class="statusFlag" v-else-if="item.state==='2'||item.state==='3'" :bgColor2='red' :bgColor="item.state==='2'?'#8cd6b2':'#bdbdbd'" :content="item.state==='2'?'已通过':'未通过'"></statusFlag>
        </div>
      </div>
      <div class="row">
        <div class="l">负责人：</div>
        <div class="r ep">{{item.leader}}</div>
      </div>
      <div class="row">
        <div class="l">日期：</div>
        <div class="r ep">{{item.time}}</div>
      </div>
      <div class="row">
        <div class="l">相关人员：</div>
        <div class="r ep">{{item.persons}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import statusFlag from './statusFlag'
export default {
  components: {
    statusFlag
  },
  props: {
    list: {
      type: Array
    },
    needStatus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      mode: {
        biztrip: {
          content: '外出',
          className: 'yellow'
        },
        meeting: {
          content: '会议',
          className: 'purple'
        },
        task: {
          content: '任务',
          className: 'blue'
        }
      },
      status: [
        { content: '未通过', className: 'bg-green' },
        { content: '已通过', className: 'bg-gray' }
      ]
    }
  }
}
</script>

<style scoped>
.statusFlag {
  position: absolute;
  right: 16px;
  top: 0;
}
.list {
}
.item {
  position: relative;
  padding: 12px;
  margin-top: 12px;
  background: #fff;
}
.title {
  display: flex;
}
.title .type {
  font-size: 13px;
  line-height: 20px;
  height: 20px;
  width: 35px;
  text-align: center;
  display: inline-block;
  border-radius: 5px;
}
.title .text {
  line-height: 36px;
  font-size: 16px;
  font-weight: bold;
}
.row {
  display: flex;
  line-height: 24px;
  font-size: 13px;
  color: #999;
}
.r {
  flex: 1;
}
.status {
  float: right;
  border-radius: 10px;
  line-height: 20px;
  height: 20px;
  text-align: center;
  color: #fff;
  width: 61px;
  margin-top: 8px;
}
.bg-red {
  background: #fd8591;
  border-radius: 5px;
  line-height: 30px;
  height: 30px;
}
.bg-gray {
  background: #bdbdbd;
}
.bg-green {
  background: #8cd6b2;
}
.purple {
  color: #d596d1;
  border: 1px solid #d596d1;
}
.blue {
  color: #62c6ff;
  border: 1px solid #62c6ff;
}
.yellow {
  color: #fbd270;
  border: 1px solid #fbd270;
}
</style>
