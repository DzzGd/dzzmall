<template>
  <div class="GoodsListItem">
    <a :href="goodsItem.link">
      <img :src="goodsItem.show.img" alt="goodsItem.title" />
      <div class="item-text">
        <p class="item-title">{{goodsItem.title}}</p>
        <span class="price">￥{{goodsItem.price}}</span>
        <span class="collect">❤&nbsp;{{goodsItem.cfav}}</span>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: "GoodsListItem",
  data() {
    return {};
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {}
};
</script>
<style scoped>
.GoodsListItem {
  width: 47%;
  margin: 5px 0;
  position: relative;
  vertical-align: middle;
  padding-bottom: 40px;
}
.GoodsListItem img {
  border-radius: 10px;
  width: 100%;
}
.item-text {
  font-size: 14px;
  color: rgb(77, 77, 77);
  text-align: center;
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: 0;
}
.item-title {
  padding: 5px 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.price{
  color: var(--color-tint)
}
.collect{
  padding: 10px;
  color:lightblue;
}
</style>