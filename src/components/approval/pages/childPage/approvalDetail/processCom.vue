<template>
  <div class="processContent-box">
    <div class="processContent-head">审批流程</div>
    <ul class="processList">
      <li class="processItem" v-for="(item,index) in processData" :key="'processItem'+index">
        <div class="img-box processItem-left"></div>
        <div class="content-box processItem-right">
          <div class="personName-box cf">
            <span class="personName">{{item.personName}}</span>
            <div class="viewText" :class="{'color-blue':item.status === '0' || item.status === '5','color-gray':item.status === '4','color-red':item.status === '3','color-green':item.status === '2'}">{{statusArr[item.status]}}</div>
            <span class="time" v-show="item.status !== '0'">{{item.time}}</span>
          </div>
          <div class="opinionList" v-for="(opinionObj,index) in item.opinionList" :key="'opinionList'+index">
            <span class='personName'>{{opinionObj.personName}}：</span>
            <span class="contentText">{{opinionObj.contentText}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    processData: {
      type: Array
    }
  },
  data () {
    return {
      statusArr: ['待审批', '', '审批通过', '审批未通过', '已撤销', '已转交']
    }
  }
}
</script>

<style lang='scss' scoped>
.processContent-box {
  background-color: #fff;
  padding: 0 16px 54px;
  margin-top: 14px;
  .processContent-head {
    font-size: 17px;
    font-weight: bold;
    color: #333;
    height: 73px;
    line-height: 73px;
  }
  .processList .processItem {
    display: flex;
    padding-bottom: 31px;
    .processItem-left {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #ccc;
      background-image: url("@/assets/imgs/ava3.png");
      background-size: 100%;
    }
    .processItem-right {
      flex: 1;
      padding-left: 10px;
      .viewText {
        float: left;
        margin-left: 10px;
        line-height: 27px;
        font-size: 15px;
      }
      .personName-box .personName {
        float: left;
        line-height: 29px;
        font-size: 15px;
      }
      .personName-box .time {
        float: right;
        color: #999;
        font-size: 12px;
        line-height: 29px;
      }
      .opinionList .personName {
        color: #2568a7;
        font-size: 12px;
      }
      .opinionList .contentText {
        font-size: 12px;
      }
    }
  }
}
.color-blue {
  color: #6aa2d7;
}
.color-red {
  color: #ed5564;
}
.color-green {
  color: #18da55;
}
.color-orange {
  color: #f8ab59;
}
.color-gray {
  color: #999;
}
</style>
