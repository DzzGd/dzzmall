<template>
  <swiper class="detailwiper-swiper">
    <swiper-item v-for="(item,index) in topImg" :key="index">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  naem: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    topImg: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.detailwiper-swiper {
  height: 300px;
  overflow: hidden;
}

</style>