<template>
  <div class='selectGradeClass'>
    <slot>
      <ul class="grade-class-ul">
        <li class="class-item all-choice">
          <span class="class-name">全选</span>
          <chocieBox></chocieBox>
        </li>
        <li class="class-item">
          <span class="class-name">一班</span>
          <chocieBox></chocieBox>
        </li>
        <li class="class-item">
          <span class="class-name">一班</span>
          <chocieBox></chocieBox>
        </li>
        <li class="class-item">
          <span class="class-name">一班</span>
          <chocieBox></chocieBox>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script>
// import chocieBox from '@/components/morality-manager/components/choiceBox'
export default {
  name: 'selectGradeClass',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>

<style scoped>
.selectGradeClass {
  /* margin-left: 125px; */
  margin: 10px 0px 54px 0px;
  background: #ffffff;
  font-size: 15px;
  float: left;
  width: calc(100% - 125px - 1px);
}
/* .grade-class-ul {
  padding: 0px 17px 0px 19px;
}
.class-item {
  color: #999999;
  box-sizing: border-box;
  height: 60px;
  line-height: 60px;
  border-bottom: solid 0.5px #f5f2f2;
  padding-left: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
} */
</style>