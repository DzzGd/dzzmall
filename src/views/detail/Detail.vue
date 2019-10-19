<template>
  <div class="Detail">
    <toast ref="toast"></toast>
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="navbar"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="scroll" :probe-type="3">
      <detail-swiper ref="swiper" :topImg="topImg"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info> 
      <detail-param-info :paramInfo="goodsParam" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommendList" ref="recommend"></goods-list>
    </scroll>
    <back-top @click.native="backtop" v-show="show"></back-top>
    <detail-bottom-bar @addToCart="addToCart"> </detail-bottom-bar>
  </div>
</template> 

<script>
import DetailNavBar      from "./childComps/DetailNavBar";
import DetailSwiper      from "./childComps/DetailSwiper";
import DetailBaseInfo    from "./childComps/DetailBaseInfo";
import DetailShopInfo    from "./childComps/DetailShopInfo";
import DetailGoodsInfo   from "./childComps/DetailGoodsInfo";
import DetailParamInfo   from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar   from "./childComps/DetailBottomBar"
import GoodsList         from "components/content/goods/GoodsList";
import Toast             from "components/common/toast/Toast"

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

import Scroll from "components/common/scroll/Scroll";

import { itemListMixin, backToTop } from "common/mixin";
import { debounce, throttle } from "common/utils";

import { mapActions } from 'vuex'
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      shop: {},
      goods: {},
      data: null,
      topImg: [],
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommendList: [],
      toSomePlace: [],
      imgLoadListener: null,
      scrollLimitListener: null
    };
  },
  created() {
    // 保存传入的iid
    this.iid = this.$route.params.id;
    // 根据iid获取数据
    getDetail(this.iid).then(res => {
      // 获取顶部的轮播数据
      const data = res.result;
      this.topImg = res.result.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 店铺信息
      this.shop = new Shop(data.shopInfo);

      // 商品展示信息
      this.detailInfo = data.detailInfo;

      // 商品参数信息
      this.goodsParam = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then(res => {
      this.recommendList = res.data.list;
    });
  },
  mixins: [itemListMixin, backToTop],
  mounted() {
    // 这里拿不到数据 因为 组件还没有渲染, 网络请求是异步的 这里是同步的
    // this.toSomePlace.push(this.$refs.params.$el.offsetTop)
    this.$bus.on('itemImageLoad', this.imageLoad)
    // 防抖
    let newImgLoad = debounce(this.imgLoadDebound);
    this.imgLoadListener = () => {
      newImgLoad();
    };

    // // 节流scroll
    // let newScoll = throttle(this.limitScroll, 50)
    // this.scrollLimitListener = (position) => { newScoll(position) }
    // 节流好用但是会出现 顶部 active反应不正确的情况

  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast
  },

  updated() {
    this.imgLoadDebound();
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.refreshListener);
  },
  methods: {
    ...mapActions(['addCart']),
    addToCart() {
      const product = {}
      product.image = this.topImg
      product.title = this.goods.title
      product.desc  = this.goods.desc
      product.price = this.goods.realPrice
      product.iid   = this.iid
       
      // 加入购物车
      this.addCart(product)
          .then(res => {
            this.$toast.show(res, 2000)
          })
          .catch(ret => {
            this.$refs.toast.show('添加商品失败', 2000)
          })
    },
    imageLoad() {
      this.imgLoadListener();
    },
    titleClick(index) {
      this.$refs.scroll.backtop(0, -this.toSomePlace[index], 500);
    },
    imgLoadDebound() {
      this.toSomePlace = [];
      this.$refs.scroll.refresh();
      this.toSomePlace.push(0);
      this.toSomePlace.push(this.$refs.params.$el.offsetTop);
      this.toSomePlace.push(this.$refs.comment.$el.offsetTop);
      this.toSomePlace.push(this.$refs.recommend.$el.offsetTop);
      this.toSomePlace.push(Number.MAX_VALUE)
    },
    scroll(position) {
      // this.scrollLimitListener(position)
      this.limitScroll(position)
    },
    limitScroll(position) {
      const positionY = -position.y;
      let length = this.toSomePlace.length;
      if( positionY > 1000) {
        this.show = true
      }
      for (let i = 0; i < length - 1; i++) {
        // if((i < length - 1 && positionY >= this.toSomePlace[i] && positionY < this.toSomePlace[i + 1]) || (i === length - 1&& positionY >= this.toSomePlace[i] && positionY )) {
        //   this.$refs.navbar.currentIndex = i
        // }
        if(positionY < this.toSomePlace[i + 1]) {
          this.$refs.navbar.currentIndex = i
          return
        }
      }
    }
  }
};
</script>

<style scoped>
.Detail {
  position: absolute;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
.detail-nav {
  position: relative;
  z-index: 9;
}
</style>