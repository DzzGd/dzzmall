<template>
  <div class="CartList">
    <cart-list-item 
      v-for="item in cartList" 
      :key="item.iid"
      :product="item"
      :isChecked="item.isChecked">
    </cart-list-item>
  </div>
</template>

<script>
import CartListItem from './CartListItem'

import { mapGetters } from "vuex";
export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"])
  }, 
  components: {
    CartListItem
  }
};
</script>

<style scoped>
.CartList{
  padding-bottom: 100px;
}
</style>