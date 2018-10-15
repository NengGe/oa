<template>
  <FormCom class="form-com">
    <div class="approvalProcess-box">
      <div class="title-box">{{title || '审批人'}}</div>
      <div class="content-box cf">
        <!-- 部门 -->
        <div class="deptList cf">
          <div class="dept-box person-box cf" v-for="(item,index) in deptList" :key="item.dept_id">
            <div class="icon-box" v-show="(index)%4">
              <span class="iconfont" v-show="needArrow !== undefined ? needArrow : true">&#xe83f;</span>
            </div>
            <div class="img-box">
              <div class="bg-pic">
                <span class="delBtn iconfont" @click="()=>delDeptBtnAction(index)" v-if="needDelBtn">&#xe7c0;</span>
              </div>
              <div class="personName">{{item.dept_name}}</div>
            </div>
          </div>
        </div>
        <!-- 成员 -->
        <div class="person-box cf" v-for="(item,index) in approvalPersonArr" :key="index">
          <div class="icon-box" v-show="(index)%4">
            <span class="iconfont" v-show="needArrow !== undefined ? needArrow : true">&#xe83f;</span>
          </div>
          <div class="img-box">
            <div class="bg-pic" v-if="item.type==='1'" :class="{zoom:item.type==='1'&&parseInt(item.user_id) ===0}" @click="handleEmit('selectDirector', item)">
              <span class="delBtn iconfont" @click.stop="()=>delBtnAction(index)" v-if="needDelBtn">&#xe7c0;</span>
            </div>
            <div class="bg-pic" v-else @click="handleEmit('memberAction', item)">
              <span class="delBtn iconfont" @click.stop="()=>delBtnAction(index)" v-if="needDelBtn">&#xe7c0;</span>
            </div>
            <div class="personName">{{item.user_name}}</div>
          </div>
        </div>
        <div class="person-box cf" v-if="needAddBtn">
          <div class="icon-box">
            <span class="iconfont" v-show="needArrow !== undefined ? needArrow : true">&#xe83f;</span>
          </div>
          <div class="img-box">
            <div class="add-box" @click="addAction">
              <span class="iconfont icon-add">&#xe61a;</span>
            </div>
          </div>
        </div>

      </div>
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
    'approvalPersonArr': Array,
    'deptList': Array,
    'needArrow': [Number, String, Boolean],
    'title': {
      type: String,
      default: '审批人'
    },
    'needAddBtn': {
      type: Boolean,
      default: true
    },
    'needDelBtn': {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleEmit (eventName, ...arg) {
      if (!this.needDelBtn && eventName !== 'selectDirector') return
      this.$emit(eventName, ...arg)
    },
    addAction () {
      this.handleEmit('addPerson')
    },
    delDeptBtnAction (index) {
      this.deptList.splice(index, 1)
    },
    delBtnAction (index) {
      this.approvalPersonArr.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes zoom {
  from {
    transform: scale(0.8);
  }
  to {
    transform: scale(1.2);
  }
}
.form-com{
  margin-top: 12px;
}
.approvalProcess-box {
  background-color: #fff;
  padding: 3px 15px 15px;
  border-radius: 9px;
  .title-box {
    height: 42px;
    line-height: 42px;
    color: #666;
    font-size: 15px;
    font-weight: bold;
  }
  .person-box.dept-box .img-box {
    .bg-pic {
      background: url("@/assets/imgs/ava4.png") no-repeat center;
      background-size: 100% auto;
      background-color: #4eb9e5;
    }
  }
  .person-box {
    text-align: center;
    float: left;
    margin-bottom: 20px;
    &:nth-child(2) {
      .icon-box {
        display: none;
      }
    }
    .delBtn {
      display: block;
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
      color: #fd7b7b;
      font-size: 14px;
      text-align: center;
      line-height: 12px;
      right: 0px;
      top: 0px;
    }
    .img-box {
      width: 60px;
      border-radius: 50%;
      float: left;
      position: relative;
      text-align: center;
      .bg-pic {
        position: relative;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: url("@/assets/imgs/ava3.png") no-repeat center;
        background-size: 100% auto;
        display: inline-block;
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
    }
    .personName {
      font-size: 12px;
      color: #666;
      width: 60px;
      line-height: 14px;
      height: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .icon-box {
      line-height: 50px;
      height: 50px;
      width: 22px;
      text-align: center;
      float: left;
      .iconfont {
        font-size: 22px;
        color: #aaa;
      }
    }
  }
  .add-box {
    // margin: 0 5px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    line-height: 50px;
    border: 1PX solid #d0d0d0;
    text-align: center;
    box-sizing: border-box;
    color: #d0d0d0;
    vertical-align: top;
    float: left;
    .iconfont-approval {
      font-size: 17px;
    }
  }
}
</style>
