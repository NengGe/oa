<template>
  <div class="state">
    <div>
      <div class="filter">按资产状态选择</div>
      <ul class="term" @click="onSelect">
        <li class="term-item" :class="{active:selectedId===-1}" data-id="-1">全部</li>
        <li v-for="d of list" class="term-item" :class="{active:selectedId===d.id}" :key="d.id" :data-id="d.id">{{d.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import scopeElements from '@/modules/corejs/dom/scope-elements-plus'
  export default {
    name: 'state-select',
    props: ['rootData'],
    data () {
      return {
        selectedId: -1,
        list: []
      }
    },
    created () {
      if (this.rootData) {
        this.list = this.rootData.type_status
      }
    },
    methods: {
      onSelect (e, vnode) {
        scopeElements(e.target, vnode.elm, {
          'LI': elem => {
            let id = elem.dataset.id * 1
            this.selectedId = id
            this.$emit('change', 1, id)
          }
        })
      }
    },
    watch: {
      rootData (d) {
        this.list = d.type_status
      }
    }
  }
</script>

<style scoped>
  .state{
    padding-top: 10px;
  }
  .filter {
    font-size: 16px;
    font-weight: 600;
    padding: 10px;
    color: #416990;
  }

  .term {
    overflow: hidden;
    clear: both;
    .term-item {
      float: left;
      min-width: 66px;
      padding: 0 10px;
      height: 29px;
      font-size: 12px;
      color: #92bae1;
      text-align: center;
      line-height: 29px;
      box-sizing: border-box;
      border: 1PX solid #92bae1;
      border-radius: 10px;
      margin: 0 12px 16px;
      &.active {
        background-color: #4988c4;
        color: #fff;
      }
    }
  }
</style>
