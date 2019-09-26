<template>
  <div class="DetailBaseInfo" v-if="Object.keys(goods).length !== 0">
    <div class="base-info">
      <p class="head">{{goods.title}}</p>
      <p class="price">
        <span class="newPrice">{{goods.newPrice}}</span>
        <span class="oldPrice">{{goods.oldPrice}}</span>
        <span class="activePrice">{{goods.discount}}</span>
      </p>
      <p class="info">
        <span>{{goods.columns[0]}}</span>
        <span>{{goods.columns[1]}}</span>
        <span>{{goods.services[goods.services.length-1].name}}</span>
      </p>

      <div class="service">
        <p v-for="item in (goods.services.length - 1)" :key="item">
          <img :src="goods.services[item - 1].icon" />
          <span>{{goods.services[item - 1].name}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.base-info {
  padding: 10px;
}
.base-info .head {
  font-size: 15px;
  font-weight: bold;
  color: #555;
  margin-bottom: 10px;
}
.base-info .price {
  margin-bottom: 10px;
}
.newPrice {
  font-size: 20px;
  color: var(--color-high-text);
}
.oldPrice {
  display: inline-block;
  font-size: 12px;
  text-decoration: line-through;
  color: #999;
  text-indent: 10px;
}
.activePrice {
  display: inline-block;
  font-size: 12px;
  padding-left: 4px;
  padding-right: 4px;
  border-radius: 7px;
  color: #fff;
  height: 14px;
  line-height: 14px;
  font-weight: bold;
  background-color: var(--color-high-text);
  position: relative;
  bottom: 10px;
  left: 4px;
}

.info {
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.info span {
  color: #bbb;
  font-size: 14px;
}
.service {
  margin-top: 5px;
  margin-bottom: 5px;
  display: flex;
  flex-wrap: nowrap;

  justify-content: space-around;
}
.service p {
  height: 30px;
  line-height: 30px;
}
.service img {
  width: 12px;
  height: 12px;
  position: relative;
  top: 2px;
}
.service span {
  font-size: 12px;
}
</style>