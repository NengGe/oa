<template>
  <div class="attachment">
    <ul class="list cf">
      <li class="item" v-for="(item, i) in data" :key="i">
        <img class="img" :src="item.src" @click="imgAction(data, i)" />
      </li>
    </ul>
  </div>
</template>

<script>
import { lookUpPicture } from '@/js/file-upload'
export default {
  props: {
    data: {
      type: Array
    }
  },
  methods: {
    imgAction (data, i) {
      let imgList = data.map(item => {
        return item.src
      })
      lookUpPicture(imgList, i)
    }
  }
}
</script>

<style scoped>
.list {
  margin-left: -12px;
}
.item {
  float: left;
  margin: 5px 12px;
}
.img {
  width: 54px;
  height: 54px;
  background: #eee;
  border-radius: 5px;
}
</style>


