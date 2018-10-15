
<template>
  <div id="app">
    <p><a v-click="()=>{show=1}">弹出</a></p>
    <MemberSelectLevels :show.sync="show" @confirm="onConfirm" :type="'multiple'" :initSelected="[]"></MemberSelectLevels>
  </div>
</template>

<script>
  import MemberSelectLevels from '@/modules/member-select-levels/Index'
  export default {
    data () {
      return {
        show: 1
      }
    },
    components: {
      MemberSelectLevels
    },
    methods: {
      onConfirm (selectedMembers) {
      }
    }
  }
</script>
