<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.image" class="item">
      <a :href="item.link" @click.prevent="showTip(item.link)">
        <img :src="item.image" :alt="item.title" />
        <span class="des">{{item.title}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    showTip(link) {
      this.$toast.show('进入外部链接', 1000)
      setTimeout(() => {
        window.location.href = link
      }, 500);
    }
  }
};
</script>

<style scoped>
.recommend {
  display: flex;
  padding-bottom: 15px;
  border-bottom: 6px solid #eee;

}
.item {
  flex-shrink: 1;
  padding: 10px 10px;
  text-align: center;
  vertical-align: middle;
}
.item img{width: 100%;}
.des{
  font-size: 14px;
}
</style>