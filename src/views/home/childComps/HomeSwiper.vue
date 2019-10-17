<template>
  <swiper>
    <swiper-item v-for="item in banner" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" /><!-- @load="imgonLoad" -->
      </a>
    </swiper-item>
  </swiper>
</template>
 
<script>
// 都是父组件挂载的, 所以嵌套的插槽没有父子组件关系
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: 'HomeSwiper',
  data() {
    return { 
      // isLoad: false
    }
  },
  props: {
    banner: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // imgonLoad() {
    //   if (!this.isLoad) {
    //     this.$emit('swiperImgLoad')
    //     this.isLoad = true
    //   }
    // }
  }
};
</script>

<style>
</style>