<template>
    <div class="inform">


      <!-- 动态组件 -->
      <keep-alive></keep-alive>
        <component :is='isCom'></component>
      <keep-alive></keep-alive>

    </div>
</template>

<script>
  import MyReceiveCom from './MyReceive.vue'
  // import MySendCom from '../components/indexChildCom/mySend.vue'
  // import SendInformCom from '../components/indexChildCom/sendInform.vue'
  export default {
    name: 'inform-index',
    components: {
      MyReceiveCom
    },
    props: ['bus'],
    data () {
      return {
        isCom: 'MyReceiveCom'
      }
    },
    methods: {

    }
  }
</script>

