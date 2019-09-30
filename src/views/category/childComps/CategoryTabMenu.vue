<template>
  <div class="TabMenu">
    <better-scroll class="scroll">
      <div
        v-for="(item, index) in tabMenu"
        :key="item.acm"
        class="tab-menu-item"
        @click="changeActive(index)"
        :class="{'isActive':currentIndex === index}"
      >{{item.title}}</div>
    </better-scroll>
  </div>
</template>

<script>
import betterScroll from "components/common/scroll/Scroll";

export default {
  name: "CategoryTabMenu",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    tabMenu: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  created() {
    // this.changeActive(0, this.tabMenus[0].subcategory, this.tabMenus[0].subcategory)
  },
  methods: {
    changeActive(index, maitKey) {
      this.currentIndex = index;
      this.$emit("getDataOfTabMenu", this.tabMenu[index].maitKey, this.tabMenu[index].miniWallkey);
    }
  },
  components: {
    betterScroll
  }
};
</script>

<style scoped>
.tab-menu-item {
  width: 100px;
  height: 45px;
  background-color: #eee;
  line-height: 45px;
  text-align: center;
  color: #999;
  font-family: Georgia, "Times New Roman", Times, serif;
}
.isActive {
  border-left: 2px var(--color-tint);
  background-color: #fff;
}
.scroll{
  height: calc(100vh - 120px);
  width: 100px;
  position: fixed;
}
</style>