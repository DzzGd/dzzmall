<template>
  <div class="DetailNavBar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" class="backImg">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
             :key="item" 
             class="title-item"
             :class="{active:currentIndex === index}" 
             @click="headChange(index)">{{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex : 0
    };
  },
  methods: {
    headChange(index) {
      this.currentIndex = index
      this.$emit('titleClick', this.currentIndex)
    },
    backClick() {
      this.$router.back()
    },
    titleClick() {
    }
  },
  components: {
    NavBar
  }
};
</script>
<style scoped>
.back {
  text-align: center;
  line-height: 34px;
}

.backImg{
  margin-top: 10px;
}
.title {
  display: flex;
}
.title-item {
  flex: 1;
}
.active{
  color: var(--color-tint)
}
</style>