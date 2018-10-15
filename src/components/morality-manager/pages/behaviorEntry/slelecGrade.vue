<template>
  <div class='selectGrade'>
    <slot>
      <ul class="grade-ul">
        <li class="grade-item">
          <span class="grade-name">一年级</span>
          <span class="all-choice-btn">全选</span>
        </li>
        <li class="grade-item">
          <span class="grade-name">一年级</span>
          <span class="all-choice-btn">全选</span>
        </li>
        <li class="grade-item">
          <span class="grade-name">一年级</span>
          <span class="all-choice-btn">全选</span>
        </li>
        <li class="grade-item">
          <span class="grade-name">一年级</span>
          <span class="all-choice-btn">全选</span>
        </li>
      </ul>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'selectGrade',
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
.selectGrade {
  margin: 10px 0px 54px 0px;
  font-size: 15px;
  width: 125px;
  overflow: auto;
  float: left;
  /* height: calc(100% - 10px - 54px); */
}
/* .grade-item {
  height: 60px;
  background-color: #e9e9e9;
  padding-left: 23px;
  color: #999999;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.all-choice-btn {
  display: inline-block;
  text-align: center;
  width: 35px;
  height: 17px;
  line-height: 17px;
  font-size: 10px;
  background-color: #c4c4c4;
  border-radius: 8.5px 0px 0px 8.5px;
  color: #ffffff;
} */
</style>