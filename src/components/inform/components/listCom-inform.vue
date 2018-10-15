<template>
  <oa-listCom class="item-box">
    <div class="itemContent-box" @click="$emit('action', item)">
      <span class="red-dot" v-show="needRedDot"></span>
      <div class="title-box">
        <p class="title">
          <span class="titleText">
            {{item.title}}
          </span>
        </p>
        <slot></slot>
        <span class="time">{{item.time}}</span>
      </div>
      <div class="contentText-box">
        <p class="contentText">{{item.contentText}}</p>
      </div>
    </div>
  </oa-listCom>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    needRedDot: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.item-box {
  padding: 1PX 0;
  width: 100%;
  overflow: hidden;
  .itemContent-box {
    .red-dot {
      position: absolute;
      right: 12px;
      top: 12px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #f00;
      display: block;
    }
    height: 110px;
    position: relative;
    background-color: #fff;
    border-radius: 9px;
    width: 355px;
    margin: 6px auto 6px;
    box-sizing: border-box;
    padding: 19px 15px 19px 19px;
    transition: all 0.5s;
    .title-box {
      display: flex;
      margin-bottom: 3px;
      .title {
        flex: 1;
        font-size: 17px;
        font-weight: bold;
        // float: left;
        color: #555555;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        // position: relative;
        .titleText {
          // position: relative;
        }
      }
      .time {
        text-align: right;
        width: 120px;
        line-height: 20px;
        font-size: 12px;
        color: #999;
      }
    }
    .contentText-box {
      margin-top: 24px;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100%;
        color: #999;
        font-size: 13px;
      }
    }
  }
}
</style>


