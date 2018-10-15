<template>
  <div class="summarize">
    <ul class="list">
      <li class="item" v-for="(item) in data" :key="item.id">
        <div class="name">{{item.user_name}}</div>
        <div class="content">{{item.content}}</div>
        <Attachment :data="item.attachment_list"></Attachment>
      </li>
    </ul>
  </div>
</template>

<script>
import Attachment from './attachment'
export default {
  components: {
    Attachment
  },
  props: {
    data: {
      type: Array
    }
  }
}
</script>

<style scoped>
.summarize{
margin-top: 12px;
}
.item {
  border-top: 1PX solid #eee;
  padding: 20px;
}
.name{
  font-size: 15px;
  font-weight: bold;
  line-height: 24px;
}
.content {
  padding: 10px 0;
  color: #999;
  font-size: 13px;
  line-height: 22px;
}
.img {
  float: left;
  width: 54px;
  height: 54px;
  background: #eee;
  border-radius: 5px;
  margin: 5px;
}
</style>
