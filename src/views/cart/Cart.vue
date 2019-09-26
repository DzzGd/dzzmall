<template>
  <div class="Cart">
    <nav-bar>
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import { mapGetters } from 'vuex'
export default {
  name: "Cart",
  data() {
    return {};
  },
  methods: {},
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    // 两种语法
    // 1.
    // ...mapgetters(['cartLength'])
    // 2.
    ...mapGetters({
      length: 'cartLength'
    })
  }
};
</script>
<style scoped>
</style>