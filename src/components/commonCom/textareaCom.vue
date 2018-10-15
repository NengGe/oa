<template>
  <FormCom class="form-com">
    <div class="reasonContent-box">
      <textarea :readonly="readonly" class="textarea" v-model="textareaText" :placeholder="placeholder" @change="$emit('update:content', textareaText)"></textarea>
    </div>
  </FormCom>
</template>
<script>
import FormCom from '@/components/commonCom/formCom'
export default {
  components: {
    FormCom
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
    readonly: {
      type: Boolean,
      default: false
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
.form-com {
  margin-top: 12px;
}
.reasonContent-box {
  height: 123px;
  /* margin: 0px 10px; */
  /* border-radius: 9px; */
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
