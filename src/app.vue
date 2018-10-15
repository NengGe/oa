<template>
  <div>
    <transition :name="slideName" :enter-active-class="activeClass" :leave-active-class="activeClass">
      <keep-alive 
        :include="cacheComponents" :exclude="$root.unCacheComponets.join(',')"> <!-- exclude的优先级更高 -->
        <router-view   :bus="bus"></router-view>
      </keep-alive>
    </transition>
    <!-- <transition :name="slideName" :enter-active-class="activeClass" :leave-active-class="activeClass">
      <router-view  v-if="!$route.meta.keepAlive" :bus="bus"></router-view>
    </transition> -->
  </div>
</template>

<script>
import cacheComponents from './assets/js/cachesComponets'
export default {
  props: ['bus'],
  data () {
    return {
      slideName: '',
      cacheComponents: cacheComponents
    }
  },
  computed: {
    activeClass () {
      return this.slideName && 'slide-active'
    }
  },
  watch: {
    '$route' (to, from) {
      if (from.name) {
        let toPath = to.path
        let fromPath = from.path
        toPath = toPath.trim().replace(/\/$/, '').replace(/\/+/, '/')
        fromPath = fromPath.trim().replace(/\/$/, '').replace(/\/+/, '/')
        let toDepth = toPath.split('/').length
        let fromDepth = fromPath.split('/').length
        if (toDepth === fromDepth) {
          toDepth = to.meta.zIndex
          fromDepth = from.meta.zIndex
        }
        this.slideName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
.slide-active {
  transition: 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  transition-property: opacity, transform;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
}
</style>
