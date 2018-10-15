<template>
  <!-- $attrs.hasOwnProperty('dept') -->
  <ul class="member-list list-box">
    <li class="member row" v-for="(item, i) in data" :key="item.id" @click="()=>action(item, i)">
      <div class="img-box" :class="{'dept':$attrs.hasOwnProperty('dept')}"></div>
      <span class="nameText">{{$attrs.hasOwnProperty('dept')?item.dept_name:item.user_name}}</span>
      <div class="select-box" @click="selAction(item, i, $event)" v-if="isShowSelectBtn">
        <div class="selectBtn" :class="{active: item.isSelected}">
          <span class="icon iconfont">&#xe63e;</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    isShowSelectBtn: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    action (item, i) {
      if (this.$attrs.hasOwnProperty('dept')) {
        this.$emit('deptAction', item, i)
      } else {
        this.$emit('memberAction', item, i)
      }
    },
    selAction (item, i, e) {
      if (this.$attrs.hasOwnProperty('dept')) {
        e.stopPropagation()
        this.$emit('deptSelAction', item, i)
      } else {
        this.$emit('memberAction', item, i)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.img-box {
  background-image: url("@/assets/imgs/ava3.png");
}
.img-box.dept {
  background: url("@/assets/imgs/ava4.png") no-repeat center;
  background-color: #4eb9e5;
}
.list-box {
  margin: 12px 12px;
  padding: 0 10px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  .row {
    height: 52px;
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom: 1PX solid #e4e4e4;
    &:last-child {
      border: 0;
    }
    .img-box {
      margin: 0 20px 0 3px;
      width: 36px;
      height: 36px;
      // background-color: #ccc;
      border-radius: 50%;
      background-size: 100% auto;
    }
    .nameText {
      flex: 1;
      line-height: 52px;
      font-size: 15px;
      font-weight: bold;
    }
    .select-box {
      padding: 10px 0 10px 10px;
      .selectBtn {
        &.active {
          background-color: #58aeff;
          border: 0;
        }
        text-align: center;
        line-height: 20px;
        width: 22px;
        height: 22px;
        border: 1PX #c2c2c2 solid;
        border-radius: 50%;
        color: #fff;
        .icon {
          font-size: 12px;
        }
      }
    }
  }
}
</style>

