<template>
    <ul class="leaveword list">
      <li class="item" v-for="(item, i) in data" :key="i">
        <div class="pic">
          <img class="img" src="@/assets/imgs/ava3.png" >
        </div>
        <div class="content">
          <div class="t">
            <div class="name">{{item.user_name}}</div>
            <div class="time">{{item.timeStr}}</div>
          </div>
          <div class="b">{{item.comment}}</div>
        </div>
      </li>
    </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    }
  }
}
</script>

<style lang='scss' scoped>
.list{
  .item{
    padding: 13px 0;
    display: flex;
    .pic .img{
      width: 41px;
      height: 41px;
      border-radius: 50%;
    }
  }
}
.content{
  font-size: 13px;
  padding-left: 12px;
  line-height: 20px;
  color: #999;
  flex: 1;
  .t{
    line-height: 21px;
    display: flex;
    justify-content: space-between;
    .name{
      color: #333;
      font-size: 15px;
      font-weight: bold;
    }
  }
}
</style>

