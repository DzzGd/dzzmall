<template>
  <div class="Category">
    <category-tab-menu
      :tab-menu="tabMenu"
      @getDataOfTabMenu="getDataOfTabMenu"
      class="tab-menu"
    ></category-tab-menu>
    <div class="wrap">
      <category-goods-detail :tab-menus-detail="tabMenusDetail" class="goods-detail"></category-goods-detail>
      <tab-control :titles="tabTitles" class="tabControl" @changeTabControlItem="changeTabControl"></tab-control>
      <goods-list :goods="showGoods" class="goods-list"></goods-list>
    </div>
  </div>
</template>
<script>
import {
  getCategoryData,
  getDetails,
  getTabControlData
} from "network/category";

import CategoryTabMenu from "./childComps/CategoryTabMenu";
import CategoryGoodsDetail from "./childComps/CategoryGoodsDetail";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";

export default {
  name: "Category",
  data() {
    return {
      tabTitles: ["综合", "新品", "销量"],
      tabMenu: null,
      tabMenusDetail: null,
      TabControlDetail: null,
      goods: {
        pop: { name: "pop", list: [] },
        new: { name: "new", list: [] },
        sell: { name: "sell", list: [] }
      },
      currentType: "pop",
      miniWallkey: null
    };
  },
  created() {
    this.getMultiData();
  },
  mounted() {},
  methods: {
    getMultiData() {
      getCategoryData().then(res => {
        this.tabMenu = res.data.category.list;
        this.showTabMenusDetail(this.tabMenu[0].maitKey);
        this.miniWallkey = this.tabMenu[0].miniWallkey
        this.getTabControlDetail(this.currentType, this.miniWallkey);
      });
    },
    showTabMenusDetail(maitKey) {
      getDetails(maitKey).then(res => {
        this.tabMenusDetail = res.data.list;
      });
    },
    getDataOfTabMenu(maitKey, miniWallkey) {
      this.showTabMenusDetail(maitKey)

      this.miniWallkey = miniWallkey
      this.getTabControlDetail(this.currentType)
    },
    getTabControlDetail(type) {
      getTabControlData(type, this.miniWallkey).then(res => {
        this.goods[type].list = res;
      });
    },
    changeTabControl(index) {
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
        default:
          this.currentType = "pop";
          break;
      }
      this.getTabControlDetail(this.currentType);
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },

  components: {
    CategoryTabMenu,
    CategoryGoodsDetail,
    TabControl,
    GoodsList
  }
};
</script>
<style scoped>
.Category {
}
.tabControl {
  /* padding-bottom: 50px; */
  margin-top: 20px;
  border-top: 1px solid #eee;
}
.goods-list{
  border-radius: 10px;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
/* .tab-menu {
  position: fixed;
  top: 0;
  left: 0;
}
.goods-detail {
  width: 100%;
} */
.wrap {
  margin-left: 100px;
  width: 275px;
}
</style>