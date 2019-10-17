<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @changeTabControlItem="changeItem"
      v-show="isTabFixed"
      ref="tabControl1">
    </tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="scrollPosition" 
      :pull-up-load="true"
      @pullingUp="loadMore">

      <home-swiper :banner="banner" ><!-- @swiperImgLoad="swiperImgLoad" -->
      </home-swiper>
 
      <home-recommend :recommend="recommend"></home-recommend>

      <home-feature></home-feature>

      <tab-control
        :titles="['流行', '新款', '精选']"
        @changeTabControlItem="changeItem"
        ref="tabControl2"
        :class="{fixed: isTabFixed}">
      </tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backtop" v-show="show"></back-top>
  </div>
</template>
<script>
import HomeSwiper     from "./childComps/HomeSwiper";
import HomeRecommend  from "./childComps/HomeRecommend";
import HomeFeature    from "./childComps/HomeFeature";

import NavBar         from "components/common/navbar/NavBar";
import TabControl     from "components/content/tabControl/TabControl";
import GoodsList      from "components/content/goods/GoodsList";
import Scroll         from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListMixin, backToTop }       from "common/mixin"
export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      tabOffsetTop: null,
      isTabFixed: false,
      saveY: 0,
    };
  },
  mixins:[itemListMixin, backToTop],
  // 函数调用 -> 压如函数栈(保存函数调用过程所有变量) -> 函数调用结束 -> 弹出函数栈(释放函数所有的变量)
  created() {
    // 1. 请求多个数据
    this.getHomeMultidata();

    // 2. 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  mounted() {
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.backtop(0, this.saveY, 0);
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getPositionY();
    // this.saveY = 1000
    this.$bus.$off("itemImageLoad");
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner    = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = ++this.goods[type].page;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
      });
    },
    changeItem(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    scrollPosition(position) {
      // 显示隐藏backtop
      this.show = Math.abs(position.y) < 1000 ? false : true;

      // 决定tabcontrol是否吸顶
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      this.isTabFixed = -position.y > this.tabOffsetTop ? true : false;
    },
    // 上拉记载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    // swiperImgLoad() {
    //   // 图片加载完后 刷新tabcontrol的offsettop值
    //   this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    // }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    TabControl,
    GoodsList,
    Scroll
  }
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* .content{
  height: calc(100% - 93px);
  overflow:hidden;
  margin-top: 44px;
} */
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9;
  color: #fff;
  background-color: var(--color-tint);
}
.tab-control {
  position: relative;
  top: 44px;
  z-index: 10;
  background-color: #fff;
}
</style>