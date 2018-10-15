<template> 
  <!-- <div class="displayItem"> -->
    <ul class="display-ul">
      <slot>
        <li class="display-item">
            <span class="time-s"></span>
            <i class="iconfont yes">&#xe650;</i>
        </li>
      </slot>
    </ul>
  <!-- </div> -->
</template>
<script>
// import VMask from '@/modules/mask/VMask'
export default {
  name: 'displayItem'
}
</script>
<style scoped>
  .display-item {
    padding: 19px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .display-item i.iconfont {
    font-size: 16px;
    color: #ffffff;
  }
  .active .time-s {
    color: #88b8f8;
  }
  .active i.iconfont {
    color: #88b8f8;
  }
</style>