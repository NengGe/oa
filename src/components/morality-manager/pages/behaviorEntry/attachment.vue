<template>
  <div class='attachment cf'>
    <div class="box clickActive2" v-if="needBtn">
      <div class="img-box" @click="cameraAction">
        <i class="icon iconfont-morality">&#xe637;</i>
      </div>
      <div class="text">图片</div>
    </div>
    <div class="box" v-for="(item, i) in attachmentList" :key="'img'+i">
      <img class="img" :src="item" @click="imgAction(item, i)" />
      <span v-if="needBtn" class="closeBtn iconfont" :data-index="i" @click="delAction(attachmentList, i)">&#xe7c0;</span>
    </div>
    <div class="box" v-for="(item, i) in imgList" :key="'img'+i">
      <img class="img" :src="item" @click="imgAction(item, i+attachmentList.length)" />
      <span v-if="needBtn" class="closeBtn iconfont" :data-index="i" @click="delAction(imgList, i)">&#xe7c0;</span>
    </div>
    <!-- <div class="box clickActive2" v-if="needBtn" v-show="false">
      <div class="img-box">
        <i class="icon iconfont-morality">&#xe7bb;</i>
      </div>
      <div class="text">视频</div>
    </div> -->
    <div class="box" v-for="(item, i) in videoList" :key="'video'+i">
      <img class="img" />
      <span v-if="needBtn" class="closeBtn iconfont" :data-index="i" @click="delAction(videoList, i)">&#xe7c0;</span>
    </div>
    <BottomOptions :show.sync="bottomOptionsShowB">
      <ul class="bottomList">
        <li v-for="(item, i) in wayList" :key="'wayList'+i" @click="()=>onWaySelect(item)">{{item.text}}</li>
      </ul>
    </BottomOptions>
  </div>
</template>

<script>
import { openCameraPhoto, lookUpPicture, openCameraPhotoMulti } from '@/js/file-upload'
import BottomOptions from '@/modules/bottom-options/BottomOptions'
export default {
  components: {
    BottomOptions
  },
  props: {
    attachmentList: {
      type: Array,
      default () {
        return []
      }
    },
    imgList: {
      type: Array
    },
    videoList: {
      type: Array
    },
    needBtn: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      bottomOptionsShowB: false,
      wayList: [{ text: '相机', fn: openCameraPhoto }, { text: '相册', fn: openCameraPhotoMulti }]
    }
  },
  created () {
    // setTimeout(() => {
    //   alert(5)
    //   console.log(this.attachmentList)
    // }, 5000)
  },
  methods: {
    cameraAction () {
      if (this.attachmentList.length + this.imgList.length >= 4) {
        this.$simpleMsg('最多4张图片')
        return
      }
      this.bottomOptionsShowB = true
    },
    delAction (list, i) {
      // console.log(111111)
      list.splice(i, 1)
    },
    addImg (d) {
      this.imgList.push(...d)
    },
    imgAction (item, i) {
      let imgList = this.attachmentList.concat(this.imgList)
      // console.log(imgList)
      lookUpPicture(imgList, i)
    },
    // 相机 or 相册
    onWaySelect (item) {
      this.bottomOptionsShowB = false
      this.$nextTick(() => item.fn().then(this.addImg))
    }
  }
}
</script>

<style scoped>
.box {
  width: 54px;
  float: left;
  margin: 8px;
  height: 80px;
  position: relative;
}
.img-box {
  height: 54px;
  border-radius: 6px;
  border: solid 1px #8d8d8d;
  opacity: 0.84;
  text-align: center;
  color: #8d8d8d;
}
.img {
  width: 54px;
  height: 54px;
  border-radius: 6px;
}
.img-box .icon {
  line-height: 54px;
  font-size: 30px;
}
.text {
  text-align: center;
  line-height: 24px;
  color: #8d8d8d;
}
.box .closeBtn {
  position: absolute;
  right: -5px;
  top: -5px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  color: #fd7b7b;
  font-size: 14px;
  line-height: 12px;
}
.bottomList {
  color: #007aff;
}
</style>




