<template>
  <div class="GoodsList">
    <goods-list-item v-for="item in goods" :goodsItem="item" :key="item.link"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  components: {
    GoodsListItem
  }
};
</script>

<style scoped>
.GoodsList {
  display: flex;
  flex-wrap: wrap;
  justify-content:space-evenly;
  /* justify-content: space-between; */
}
</style>