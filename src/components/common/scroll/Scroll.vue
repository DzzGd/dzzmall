<template>
  <div class="wrapper" ref="wrapper" id="Scroll">
    <div class="content" id="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() { 
    return {
      scroll: null
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // const pcontent = document.querySelector('#content')
    // pcontent.addEventListener('touchstart', e => {
    //   // e.stopPropagation()
    // })
    // pcontent.addEventListener('wheel', e => {
    //   e.stopPropagation()
    // })
    // 创建对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // 监听滚动
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", p => {
        this.$emit("scroll", p);
      });
    }
    // 监听上拉加载
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    backtop(x, y, time = 300) {
      this.scroll &&
        this.scroll.scrollTo &&
        this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    getPositionY() {
      return this.scroll && this.scroll.y
    }
  }
};
</script>

<style scoped>
.content{
  -webkit-overflow-scrolling: touch;
}
</style>