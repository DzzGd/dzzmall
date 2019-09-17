<template>
  <div class="TabControl">
    <div v-for="(item,index) in titles" :key="item" class="tab-control-item">
      <span class="text-item" :class="{'active': index === currentIndex}" @click="changeIndex(index)">{{item}}</span>
    </div>

  </div>
</template>
<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    changeIndex(index) {
      this.currentIndex = index
      this.$emit('changeTabControlItem', index)
    }
  }
};
</script>
<style scoped>
.TabControl {
  display: flex;
  text-align: center;
  font-size: 15px;
}
.TabControl .tab-control-item {
  flex: 1;
}
.TabControl .text-item {
  height: 40px;
  line-height: 40px;
  width: 50px;
  /* 撑大内联容器 */
  padding: 5px 5px;
}

.TabControl .active {
  color: var(--color-high-text);
  border-bottom: 2px var(--color-tint) solid;
}
</style>