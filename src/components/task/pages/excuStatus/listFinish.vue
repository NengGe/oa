<template>
  <ul class="list">
    <li class="item bottom-one-px cf" v-for="(item, i) in data" :key="i" >
      <div class="head">
        <div class="name l">{{item.user_name}}</div>
        <!-- <div class="r" >标记为未完成</div> -->
      </div>
      <div class="content">{{item.desc}}</div>
      <div class="img-box cf">
        <img class="img" :src="o.src" v-for="(o, i) in item.attachment_list" :key="'img'+i" >
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: Array
  }
}
</script>

<style lang="scss" scoped>
.list{
  margin-top: 12px;
  background: #fff;
  padding: 0 18px;
}
.item{
  padding: 12px 0;
}
.head{
  line-height: 26px;
  display: flex;
  justify-content: space-between;
  .l{
    font-size: 15px;
    font-weight: bold;
  }
  .r{
    font-size: 13px;
    color: #88b8f8;
  }
}
.content{
  line-height: 26px;
  color: #999;
  font-size: 13px;
}
.img-box{
  margin-left: -20px;
  margin-top: 12px;
}
.img{
  float: left;
  width: 54px;
  height: 54px;
  border-radius: 5px;
  background: #ccc;
  margin-left: 20px;
  margin-bottom: 12px;
}
</style>
