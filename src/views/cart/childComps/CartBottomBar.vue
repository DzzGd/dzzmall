<template>
  <div class="CartBottomBar">
    <div class="btn-content">
      <check-btn :is-checked="isSelectAll"
                 @click.native="checkClick">

      </check-btn> 
      <span>全选</span>
    </div>
    <span class="totalPrice">总价&nbsp;{{totalPrice.toFixed(2)}}&nbsp;￥</span>
    <span class="toComputed">去计算&nbsp;({{checkLength}})</span>
  </div>
</template>

<script>
import CheckBtn from "./CheckBtn";
import { mapGetters } from 'vuex'
export default {
  name: "CartBottomBar",
  data() {
    return {
      selectALlFlag: false
    }
  },
  components: {
    CheckBtn
  },
  computed: {
    ...mapGetters(['cartList']),
    isSelectAll() {
      if (this.cartList.length === 0) return false
      return this.cartList.every(item => {
        return item.isChecked
      })
    },
    totalPrice() {
      return this.cartList
        .filter(item => {
          return item.isChecked;
        })
        .reduce((pre, next) => {
          return pre + next.price * next.count;
        }, 0);
    },
    checkLength() {
      return this.cartList.filter(item => item.isChecked).length;
    }
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.cartList.forEach(item => {
          item.isChecked = false
        });
      } else {
        this.cartList.forEach(item => {
          item.isChecked = true
        });
      }

    }
  }
};
</script>

<style scoped>
.CartBottomBar {
  height: 40px;
  position: fixed;
  width: 100%;
  bottom: 49px;
  background-color: #fff;
  display: flex;
  box-shadow: 0 -2px 2px 1px #eee;
}
.btn-content {
  height: 100%;
  width: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
}
.btn-content span {
  padding-left: 10px;
}
.totalPrice{
  width: 50%;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
}
.toComputed{
  width: 30%;
  line-height: 40px;
  font-size: 16px;
  text-align: center;
  background-color: #e60023;
  color: #fff;
}
.is-select-all{

}
</style>