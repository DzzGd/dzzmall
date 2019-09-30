<template>
  <div class="GoodsListItem" @click="itemClick">
      <img v-lazy="showImg" alt="goodsItem.title" @load="imageLoad"/>
      <div class="item-text">
        <p class="item-title">{{goodsItem.title}}</p>
        <span class="price">￥{{goodsItem.price}}</span>
        <span class="collect">❤&nbsp;{{goodsItem.cfav}}</span>
      </div>
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
  computed:{
    showImg() {
      return this.goodsItem.img || this.goodsItem.image || this.goodsItem.show.img
    }
  },

  methods: {
    imageLoad() {
      // 监听图片加载完成
      this.$bus.$emit('itemImageLoad')
      
      // this.$bus.$off('itemImageLoad')
    },
    itemClick() {
      this.$router.push('/detail/' + this.goodsItem.iid)
    }
  }
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
  min-height:150px; 
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