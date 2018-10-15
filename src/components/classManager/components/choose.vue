<template>
  <div class="choose-box">
    <div class="inner-choose">
      <div class="choose-item">已选： </div>
      <div class="content-wrapper" ref="wrapper">
        <ul class="content" ref="ul">
          <li class="name-item" 
            v-for="(item, index) in choiceList"
            :key="index"
            v-if="item"
          >{{item.user_name}}<span>&nbsp;&nbsp;&nbsp;</span></li>
        </ul>
      </div>
      <closeTag :size="13" @close="$emit('close')"></closeTag>
    </div>
    <!-- <sureBtn @click="preserve"></sureBtn> -->
    <div class="sure-choose" @click="preserve">
      <a href="javascript:;" class="sure-a">确定</a>
    </div>
  </div>
</template>
<script>
import sureBtn from '@/components/classManager/components/sureBtn'
import closeTag from '@/components/classManager/components/closeTag'
import BScroll from 'better-scroll'
export default {
  name: 'choose',
  props: {
    choiceList: Object
  },
  components: {
    sureBtn,
    closeTag
  },
  mounted () {
    this.$nextTick(() => {
      // console.log(this.$router)
      this.setUl()
      this.scroll = new BScroll(this.$refs.wrapper, {
        scrollX: true,
        scrollY: false,
        click: true
      })
    })
  },
  methods: {
    setUl () { // 设置ul的宽度
      let ul = this.$refs.ul
      let width = (ul.children.length && ul.children[0].clientWidth * ul.children.length) || 0
      ul.style.width = width + 'px'
    },
    preserve () {
      this.$emit('click')
    },
    isLast (index) { // 用来判断选择的对象是否是最后一个
      return index < Object.keys(this.choiceList).length - 1
    }
  },
  watch: {
    choiceList () {
      // console.log(this.choiceList)
      this.$nextTick(() => {
        this.setUl()
        this.scroll.refresh()
      })
    }
  }
}
</script>
<style scoped>
.choose-box {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  border-top: 1px solid #eae6e6;
  /* height: 100px; */
}
.inner-choose {
  /* overflow: hidden; */
  padding: 14px 38px 14px 13px;
  /* margin-bottom: 54px; */
  background: #ffffff;
  display: flex;
  justify-content: space-between;
}
.name-item {
  display: inline-block;
  color: #f8ab59;
  font-size: 13px;
}
.choose-item {
  color: #666666;
  display: inline-block;
  width: 16%;
}
.choose-box .close-box{
  position: absolute;
  right: 11px;
  top: 16px;
}
.content-wrapper {
  display: inline-block;
  overflow: hidden;
  width: 84%;
}
ul.content {
  white-space: nowrap;
  /* width: auto; */
}
.sure-choose {
  height: 54px;
  line-height: 54px;
  background: #88b8f8;
  text-align: center;
}
.sure-choose .sure-a {
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: #ffffff;
  font-weight: bold;
}
</style>