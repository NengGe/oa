<template>
  <div class="list">
    <ul class="list">
      <li class="item" v-for="(item, i) in data" :key="'data'+i" @click="$emit('action', item, i)">
        <div class="content-box  bottom-one-px">
          <div class="title-box">
            <div class="title ep">{{item.title}}</div>
            <div class="title-r">{{item.right}}</div>
          </div>
          <div class="content" v-if="needFrom">
            <div class="row" v-for="(content, i) in item.contentArr" :key="'contentArr'+i">{{`${content[0]}：${content[1]}`}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// &#xe63f;
export default {
  props: {
    data: {
      type: Array
    },
    needFrom: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang='scss' scoped>
.list {
  // margin-top: 12px;
  background-color: #fff;
  // padding: 0 15px;
}
.list .item {
  padding: 0 30px;
  font-size: 12px;
  color: #999;
  line-height: 25px;
  &:active {
    background-color: rgba(153, 153, 153, 0.1);
  }
  .content-box {
    padding: 10px 0;
  }
  .title-box {
    display: flex;
    .title {
      font-size: 15px;
      flex: 1;
      color: #777;
    }
    .title-r {
      padding-left: 10px;
    }
  }
  .name {
  }
}
// .footer{
//   text-align: center;
//   line-height: 32px;
// }
</style>
