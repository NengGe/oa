<template>
  <div class="attachment-box">
    <div class="attachmentText cf">
      <div class="attachmentText-left">附件</div>
      <!-- <div class="attachmentText-right" @click="() => bottomOptionsShowB=true">
        <span class="iconfont">&#xe60e;</span>
      </div> -->
    </div>
    <div class="attachmentContent-box">
       <ul class="imgList cf"  @click="delImgAction">
        <li class="img-box" v-for="(filePath,i) of imgList" :key="i">
          <img :src="filePath" @click="imgAction(imgList, i)">
          <span class="closeBtn iconfont" :data-index="i">&#xe7c0;</span>
        </li>
        <li class="add-box" @click="() => bottomOptionsShowB=true">
          <i class="iconfont icon-add">&#xe61a;</i>
        </li>
      </ul>
    </div>
    <BottomOptions  :show.sync="bottomOptionsShowB">
      <ul class="bottomList">
        <li v-for="(item, i) in wayList" :key="'wayList'+i" @click="()=>onWaySelect(item)">{{item.text}}</li>
      </ul>
    </BottomOptions>
  </div>
</template>

<script>
import BottomOptions from '@/modules/bottom-options/BottomOptions'
import { openCameraPhoto, openCameraPhotoMulti, lookUpPicture } from '@/js/file-upload'
export default {
  props: {
    'imgList': {
      type: Array
    }
  },
  data () {
    return {
      bottomOptionsShowB: false,
      wayList: [{text: '相机', fn: openCameraPhoto}, {text: '相册', fn: openCameraPhotoMulti}]
    }
  },
  components: {
    BottomOptions
  },
  methods: {
    imgAction (imgList, i) {
      lookUpPicture(imgList, i)
    },
    delImgAction (e) {
      let {target} = e
      if (target.tagName === 'SPAN') {
        let {index} = target.dataset
        this.imgList.splice(index, 1)
      }
    },
    addImg (imgList) {
      // console.log('imgList', imgList)
      this.imgList.push(...imgList)
    },
    // 相机 or 相册
    onWaySelect (item) {
      this.bottomOptionsShowB = false
      this.$nextTick(() => item.fn().then(this.addImg))
    }
  }
}
</script>

<style lang='scss' scoped>
  .attachment-box{
    box-shadow: 0 0px 3px #e1ecf2;
    margin: 12px 10px 0px;
    background-color: #fff;
    padding: 3px 19px 13px;
    border-radius: 9px;
  }
  .attachment-box .attachmentText-left{
    height: 42px;
    line-height: 42px;
    color: #666;
    font-size: 17px;
    font-weight: bold;
    float: left;
  }
  .attachment-box .attachmentText-right{
    float: right;
    line-height: 42px;
  }
  .imgList{
    margin-left: -30px;
  }
  li.add-box{
    width: 50px;
    height: 50px;
    border-radius: 6px;
    line-height: 50px;
    border: 1PX solid #d0d0d0;
    text-align: center;
    box-sizing: border-box;
    color: #d0d0d0;
    .iconfont{
      font-size: 17px;
    }
  }
  li.img-box,li.add-box{
    position: relative;
    float: left;
    margin: 5px 0 5px 30px;
  }
  .attachmentContent-box img{
    width: 50px;
    height: 50px;
    border-radius: 6px;
  }
  .img-box .closeBtn{
    position: absolute;
    right: -5px;
    top: -5px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
    color: #fd7b7b;
    font-size: 14px;
    line-height: 12px;
  }
  .bottomList{
    color: #007aff;
  }
</style>
