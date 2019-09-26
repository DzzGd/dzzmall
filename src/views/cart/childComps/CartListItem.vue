<template>
  <div class="CartListItem">
    <div class="item-selector">
      <check-btn @click.native="checkClick" 
                :is-checked="product.isChecked">
      </check-btn>
    </div>
    <img :src="product.image[0]" alt class="show-img" />
    <div class="content">
      <p>{{product.title}}</p>
      <p class="sesc">{{product.desc}}</p>
      <p class="info">
        <span class="price">￥{{product.price}}</span>
        <span class="count">X{{product.count}}</span>
      </p>
    </div>
  </div>
</template>

<script>
import CheckBtn from './CheckBtn'
export default {
  name: "CartListItem",
  props: {
    product: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    CheckBtn
  },
  methods: {
    checkClick() {
      this.product.isChecked = !this.product.isChecked
    }
  }
};
</script>

<style scoped>
.CartListItem {
  padding: 10px;
  border-bottom: 2px solid #eee;
  height: 130px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.show-img {
  width: 25%;
  height: 100%;
  border-radius: 8px;
}
.content {
  width: 65%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 5px;
  height: 100%;
}
.content p {
  /* width: 100%; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.content p:first-child{
  font-size: 18px;
  margin-bottom: 15px;
  color: #222;
}

.content .sesc{
  font-size: 14px;
  color: #666;
  position: relative;
  top: -16px;
}
.info{
  display: flex;
  justify-content: space-between;
    position: relative;
  top: -6px;
}

.info .price{
  font-size: 18px;
  color: #e60023;
}

.info .count{
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  font-weight: bold;
  color: hotpink;
  position: relative;
  left: -6px;
}
</style>