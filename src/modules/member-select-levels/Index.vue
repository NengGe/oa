<template>
  <transition :name="'slide'"
              :enter-active-class="'slide-active'"
              :leave-active-class="'slide-active'">
  <div v-if="show" class="msl-index">
    <MemberSelectLevels @close="$emit('update:show',false)" @confirm="selectedMembers=>{$emit('update:show',false);$emit('confirm',selectedMembers)}" :type="type" :initSelected="initSelected"></MemberSelectLevels>
  </div>
  </transition>
</template>

<script>
  import MemberSelectLevels from '@/modules/member-select-levels/MemberSelectLevels'
  export default {
    props: ['show', 'type', 'initSelected'],
    components: {
      MemberSelectLevels
    }
  }
</script>
<style scoped>
  .msl-index {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    background: #f0f8fc;
    z-index: 1;
  }
  .slide-active{
    transition: 0.3s cubic-bezier(.55,0,.1,1);
    transition-property:transform;
  }
  .slide-enter,.slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }
</style>

