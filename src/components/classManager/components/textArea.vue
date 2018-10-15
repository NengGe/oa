<template>
  <div class="area-box">
    <textarea id="in" @focus="focus" v-model.trim="inContent" @blur="blur" ref="text">

    </textarea>
    <slot>
      <span class="appeal-s" v-if="isShow" @click="onfocus">{{appealIntro}}</span>
    </slot>
  </div>
</template>
<script>
export default {
  name: 'toIcon',
  props: {
    appealIntro: {
      type: String,
      default: '申诉说明'
    },
    inputContent: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isShow: true,
      inContent: this.inputContent
    }
  },
  methods: {
    focus () {
      this.isShow = false
      // console.log(1111)
    },
    onfocus () {
      this.isShow = false
      this.$refs.text.focus()
      // this.$emit('getIntroContent', this.inContent)
    },
    blur () {
      if (!this.inContent && !this.inContent.length) {
        this.isShow = true
      }
    }
  },
  created () {
    if (this.inputContent) {
      this.isShow = false
    }
  }
}
</script>
<style scoped>
.area-box {
  position: relative;
  background-color: #ffffff;
}
#in  {
  width: 100%;
  resize: none;
  overflow-y: auto;
  height: 115px;
  border: none;
  outline: none;
  cursor: text;
  word-wrap: break-word;
  word-break: break-all;
  &:focus {
    outline: none;
    border: none;
  }
}
.appeal-s {
  position: absolute;
  color: #cccccc;
  font-size: 15px;
  left: 0;
  top: 0;
}
</style>