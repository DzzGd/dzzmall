import BackTop from "components/content/backtop/BackTop";


import { debounce } from './utils'

export const itemListMixin = {
  data() {
    return {
      refreshListener: null
    }
  },
  mounted() { 
    // // 监听item中图片加载完成
    let newrefresh = debounce(this.$refs.scroll.refresh, 200)
    this.refreshListener = () => { newrefresh() }
    this.$bus.$on('itemImageLoad', this.refreshListener)


    // 这是错误的做法  没有引入 newrefresh这个变量  不能构成闭包
    // this.refreshListener = () => { debounce(this.$refs.scroll.refresh, 200)() }
    // this.$bus.$on('itemImageLoad', this.refreshListener)
  }
}

export const backToTop = {
  data() {
    return {
      show: false
    }
  },
  methods: {
    backtop() {
      this.$refs.scroll.backtop(0, 0)
    }
  },
  components: {
    BackTop
  }
}