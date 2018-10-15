<template>
  <div :class="['file-item',{active: isBatchOperation}]" @click="()=>itemAction(fileItem.id)">
    <slot></slot>
    <div class="desc">{{fileItem.desc}}</div>
    <ul class="fileList">
      <li class="fileItem" v-for="(item, i) in fileItem.file_list" :key="'fileItem'+i" v-if="i<3">
        <img class="img" :src="item.src" alt="">
      </li>
      <!-- <li class="fileItem"></li>
      <li class="fileItem"></li> -->
    </ul>
    <div class="info">
      <div class="type">
        <span class="type-text">类型：{{fileItem.type_name}}</span>
      </div>
      <div class="time">
        <span class="time-text">{{fileItem.creat_time}}</span>
      </div>
    </div>
    <div class="status-box" v-show="fileItem.state === '2'">未通过</div>
  </div>
</template>

<script>
export default {
  props: {
    fileItem: {
      type: Object
    },
    isBatchOperation: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  components: {

  },
  methods: {
    itemAction (id) {
      this.$emit('fileItemAction', id)
    }
  }
}
</script>

<style lang='scss' scoped>
  .file-item{
    transition: transform 0.3s;
    // display: none;
    margin: 10px;
    position: relative;
    transform: translate(0);
    padding: 11px 15px;
    border-radius: 11px;
    background-color: #fff;
    .desc{
      line-height: 20px;
      color: #555;
      width: 240px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-weight: bold;
    }
    .fileList{
      margin: 10px 0;
      display: flex;
      justify-content: flex-start;
      .fileItem{
        .img{
          width: 100%;
          height: 100%;
        }
        &:nth-child(2){
          margin: 10px 17px;
        }
        box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.3);
        margin: 10px 0;
        width: 90px;
        height: 90px;
        background-color: #ccc;
        border-radius: 5px;
        padding: 3px;
        box-sizing: border-box;
        background-clip: content-box;
      }
    }
    .info{
      display: flex;
      justify-content: space-between;
      .type{
        color: #999;
      }
      .time{
        color: #ccc;
      }
    }
    .status-box{
      position: absolute;
      right: 0;
      top: 11px;
      background-color: #ed5564;
      color: #fff;
      padding: 0 5px 0 12px;
      font-size: 12px;
      height: 20px;
      line-height: 20px;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
    }
    &.active{
      transform: translateX(49px)
    }
  }
</style>
