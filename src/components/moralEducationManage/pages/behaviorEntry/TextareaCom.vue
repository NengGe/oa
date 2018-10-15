<template>
  <div class="textarea-com">
    <div class="reasonContent-box">
      <textarea class="textarea" :readonly='$attrs.hasOwnProperty("readonly")' v-model="textareaText" :placeholder="placeholder" @change="$emit('update:content', textareaText)"></textarea>
    </div>
    <attachment :needBtn='!$attrs.hasOwnProperty("readonly")' :imgList='imgList' :videoList='videoList'></attachment>
  </div>
</template>
<script>
import FormCom from '@/components/commonCom/formCom'
import attachment from './attachment'
export default {
  components: {
    FormCom,
    attachment
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入...'
    },
    content: {
      type: String,
      default: ''
    },
    imgList: {
      type: Array
    },
    videoList: {
      type: Array
    }
  },
  watch: {
    content: {
      handler: function (newV) {
        this.textareaText = newV
      },
      immediate: true
    }
  },
  data () {
    return {
      textareaText: ''
    }
  }
}
</script>

<style scoped>
.textarea-com {
  padding: 0 10px;
  margin-top: 12px;
  background: #fff;
}
.reasonContent-box {
  height: 123px;
  background-color: #fff;
  padding: 13px 15px;
}
.reasonContent-box > .textarea {
  width: 100%;
  height: 100%;
  resize: none;
  border: none;
  outline: none;
}
textarea::placeholder {
  color: #ccc;
  font-size: 14px;
}
</style>
