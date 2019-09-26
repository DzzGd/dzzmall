<template>
  <div class="DetailBottomBar">
    <div class="contentleft">
      <div class="service"></div>
      <span>客服</span>
    </div>
    <div class="contentleft">
      <div class="shop"></div>
      <span>店铺</span>
    </div>
    <div class="contentleft">
      <div class="collect"></div>
      <span>收藏</span>
    </div>
    <div class="cart" @click="addToCart">加入购物车</div>
    <div>购买</div>
  </div>
</template>
 
<script>
export default {
  name: "DetailBottomBar",
  data() {
    return {

    }
  },
  methods: {
    addToCart() {
      this.$emit('addToCart')
    }
  }
};
</script>

<style scoped>
.DetailBottomBar {
  height: 49px;
  background-color: #eee;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}
.contentleft {
  width: 15%;
  text-align: center;
}
.service{
  width: 30px;
  height: 30px;
  margin:  0 auto;
  background: url('~assets/img/detail/detail_bottom.png') no-repeat;
  background-size: 30px 204.5px;
  background-position: 0 0;
}
.service{
  width: 30px;
  height: 30px;
  margin:  0 auto;
  background: url('~assets/img/detail/detail_bottom.png') no-repeat;
  background-size: 30px 204.5px;
  background-position: 0 0;
}
.shop{
  width: 30px;
  height: 30px;
  margin:  0 auto;
  background: url('~assets/img/detail/detail_bottom.png') no-repeat;
  background-size: 30px 204.5px;
  background-position: 0 -133px;
}
.collect{
  width: 30px;
  height: 30px;
  margin:  0 auto;
  background: url('~assets/img/detail/detail_bottom.png') no-repeat;
  background-size: 30px 204.5px;
  background-position: 0px -70px;
}
.DetailBottomBar div:nth-child(4) {
  width: 30%;
  background-color: rgb(255, 217, 0);
  height: 49px;
  line-height: 49px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
}
.DetailBottomBar div:nth-child(5) {
  width: 25%;
  background-color: #e7324e;
  height: 49px;
  line-height: 49px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
}
</style>