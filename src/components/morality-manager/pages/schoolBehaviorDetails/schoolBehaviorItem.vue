<template>
  <div class="school-item">
    <LoaderRefresh @loadData="loadData">
      <div class="record-box">
        <ul class="inner-record">
          <li class="record-item"
          v-for="(item, index) in behaviorList"
          :key="index"
          @click="$router.push({path: 'schoolBehaviorDetails/2', query: {class_id: item.class_id,event_id: item.event_id}})"
          >
            <div class="class-p">
              <span class="left">{{item.grade_name}}{{item.class_name}}</span>
              <span class="right">{{item.score}}</span>
            </div>
            <div class="object-p">
              <span class="obj-s">对象：{{item.user_name}}</span>
              <appBtn :state="item.states"></appBtn>
            </div>
            <div class="system-p">
              <div class="left">
                <span class="reason">制度：{{item.rule_item_name}}</span>
              </div>
              <div class="right">
                <span>{{item.event_date}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </LoaderRefresh>
  </div>
</template>
<script>
import appBtn from '@/components/morality-manager/components/appBtn.vue'
import LoaderRefresh from '@/modules/loader-refresh/LoaderRefresh'
// import dateTo from '@/components/classManager/assets/js/dateTo.js'
export default {
  name: 'schoolItem',
  props: {
    behaviorList: Array
  },
  components: {
    appBtn,
    LoaderRefresh
  },
  methods: {
    loadData ({type, complete, vLoaderBottom} = {}) {
      // console.log(type)
      this.$emit('loadData', {type, complete, vLoaderBottom})
    }
  },
  watch: {
    behaviorList () {
      // console.log(this.behaviorList)
    }
  }
}
</script>

<style scoped>
.school-item {
  margin-top: 10px;
}
.inner-record {
  background-color: #ffffff;
}
.record-item {
  padding: 23px 16px 0px 0px;
  margin-left: 16px;
  border-bottom: 1px solid #f9f2f2;
}
.class-p::after {
  display: block;
  content: "";
  clear: both;
}
.class-p {
  margin-bottom: 17px;
}
.class-p .left {
  float: left;
  color: #333333;
  font-size: 15px;
  font-weight: bold;
}
.class-p .right {
  float: right;
  font-size: 15px;
  font-weight: bold;
  color: #ed5564;
}
.object-p {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  color: #999999;
  font-size: 15px;
  justify-content: space-between;
}
.system-p {
  display: flex;
  margin-bottom: 16px;
}
.system-p .left {
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.system-p .right {
  width: 50%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.dot-box {
  padding: 7.5px 5.5px;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 15px;
}
.dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 2.5px;
  background-color: #acacac;
  margin-left: 3px;
}
.dot:first-of-type {
  margin-left: 0;
}
.reason,
.right span {
  color: #999999;
  font-size: 15px;
}
</style>