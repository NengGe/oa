<template>
  <div class="introduction-box">
    <div class="introduction">
      <p class="intro-p">说明：<span class="intro-s">{{content}}</span></p>
      <div class="img-box" v-if="imgList.length">
        <img :src="item" alt="" @click="look(imgList, index)" v-for="(item, index) in imgList" :key="index">
      </div>
    </div>
  </div>
</template>
<script>
import { lookUpPicture } from '@/js/file-upload'
export default {
  name: 'introductionBox',
  props: {
    content: {
      type: String,
      default: ''
    },
    imgList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    look (imgList, index) {
      lookUpPicture(imgList, index)
    }
  },
  created () {
    // console.log(this.htmlContent)
  }
}
</script>
<style scoped>
  .introduction {
    padding: 21px 16px;
    background: #ffffff;
    margin-top: 10px;
  }
  .intro-p {
    font-weight: bold;
    color: #666666;
    font-size: 15px;
    margin-bottom: 45px;
  }
  .intro-s {
    color: #999999;
    font-weight: normal;
  }
  .img-box img {
    height: 56px;
    width: 56px;
    border-radius: 5px;
    border: none;
    margin-left: 8px;
  }
  .img-box img:first-of-type {
    margin-left: 8px;
  }
</style>