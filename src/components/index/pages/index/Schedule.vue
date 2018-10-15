<template>
  <div class="schedule">
    <listHead title="今日日程" icon="&#xe613;"></listHead>
    <List :data='listData'></List>
    <div class="no-data-tips" v-show="!hasData">
      <div class="content">
        <p class="text">还没有今日日程哦~</p>
        <div class="btn">安排日程</div>
      </div>

    </div>
  </div>
</template>

<script>
import List from '@/components/index/pages/com/List'
import listHead from '@/components/index/pages/com/listHead'
export default {
  components: {
    List,
    listHead
  },
  props: {
    data: {
      type: Array
    }
  },
  computed: {
    hasData () {
      return Boolean(this.listData.length)
    }
  },
  data () {
    return {
      listData: [
        {
          title: '',
          right: '19:00',
          contentArr: [
            ['会议地点', '公司大厅']
          ]
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
.schedule {
  min-height: 260px;
  margin-top: 12px;
  background-color: #fff;
}
.no-data-tips {
  height: 208px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  color: #ccc;
}
.text {
  text-align: center;
}
.btn {
  margin-top: 10px;
  text-align: center;
  width: 100px;
  height: 20px;
  line-height: 20px;
  border: 1PX solid #f8d08e;
  color: #f8d08e;
  border-radius: 10px;
  font-size: 14px;
}
</style>
