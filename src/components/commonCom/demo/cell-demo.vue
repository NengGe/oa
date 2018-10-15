<template>
  <div class="box">
    <div class="">{{inputData}}</div>
    <FormCom>
      <cell input title="ipt标题" :content.sync="inputData" placeholder='请假输入'></cell>
      <cell text content=""></cell>
      <cell button content="" @action="aaa"></cell>
      <cell title="自定义">
        <div class="aaa" slot="right">
          <input class="ipt" type="text" placeholder="自定义">
        </div>
      </cell>
    </FormCom>
  </div>
</template>

<script>
// import from '@/modules/calendar/calendarWeek'
import Cell from '@/components/commonCom/cell'
import FormCom from '@/components/commonCom/formCom'
export default {
  components: {
    FormCom,
    Cell
  },
  data () {
    return {
      inputData: ''
    }
  },
  mounted () {

  },
  methods: {
    aaa () {
      console.log(111)
    }
  }
}
</script>

<style lang='scss' scoped>
.box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.aaa .ipt{
  color: #f00;
}
</style>
