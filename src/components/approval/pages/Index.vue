<template>
    <div class="approval">
      <keep-alive></keep-alive>
        <component :is='isCom'></component>
      <keep-alive></keep-alive>
      <!-- <ul class="tabList">
        <li v-for="(item,index) in tabList"  :key='index' @click="()=>tabAction(item.com)" :class="{active:isCom === item.com}">
          <span class="iconfont-approval"
          :class='[item.iconClass]'></span>
          <span>{{item.content}}</span>
        </li>
      </ul> -->
        <!-- <ul class="processTabs">
          <li v-for="(item,index) in processTabs"  :key='index'>{{item.content}}</li>
        </ul> -->
    </div>
</template>

<script>
  import applyCom from '../components/indexCom/applyCom.vue'
  // import approvalCom from '../components/indexCom/approvalCom.vue'
  // import commitCom from '../components/indexCom/commitCom.vue'
  // import sendCom from '../components/indexCom/sendCom.vue'

  export default {
    name: 'approval-index',
    props: ['bus'],
    data () {
      return {
        isCom: 'applyCom',
        tabList: [
          {content: '新申请', iconClass: 'icon-apply', com: 'approvalIndex'},
          {content: '我审批的', iconClass: 'icon-approval', com: 'approvalCom'},
          {content: '我提交的', iconClass: 'icon-submit', com: 'commitCom'},
          {content: '抄送我的', iconClass: 'icon-send', com: 'sendCom'}
        ]
      }
    },
    methods: {
      tabAction (params) {
        // this.isCom = params
        this.$router.push({name: params})
      }
    },
    components: {
      applyCom
      // approvalCom,
      // commitCom,
      // sendCom
    }
  }
</script>

<style scoped>


.approval{
  padding-bottom: 64px;
}

.approval .content-box{
  /* box-shadow: 0 -3px 8px #dfecf4; */

}
.approval .tabList{
  background-color: #fff;
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 54px;
  padding: 6px 0;
  box-sizing: border-box;
  box-shadow: 0 -3px 8px #b9c3cf;
}
.approval .tabList>li{
  flex: 1;
  text-align: center;
  color: #3d72a4;
}
.approval .tabList>li.active{
  /* background-color: #3d72a4; */
  /* color: #f00; */
}
.approval .tabList>li>span{
  width: 100%;
  display: inline-block;
  font-size: 12px;
  /* color: #84a5d2; */
}
.approval .tabList>li span.iconfont-approval{
  font-size: 23px;


}
.icon-apply:before{
  content: "\e6d1";
}
.icon-approval:before{
  content: "\e606";
}
.icon-submit:before{
  content: "\e609";
}
.icon-send:before{
  content: "\e676";
}
li.active .icon-apply:before{
  content: "\e602";
}
li.active .icon-approval:before{
  content: "\e605";
}
li.active .icon-submit:before{
  content: "\e607";
}
li.active .icon-send:before{
  content: "\e627";
}





</style>
