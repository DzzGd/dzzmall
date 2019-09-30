<template>
  <div class="CategoryGoodsDetail">
    <div class="imgItem" v-for="item in tabMenusDetail" :key="item.acm">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" />
        <p class="title">{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryGoodsDetail",
  data() {
    return {};
  },
  props: {
    tabMenusDetail: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.CategoryGoodsDetail {
  display: flex;
  flex-wrap: wrap;
  padding-top: 10px;
}
.imgItem {
  width: 33.33333%;
  text-align: center;
  margin-bottom: 5px;
}
.imgItem img {
  width: 80%;
}
.title {
  color: #999;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
}
</style>