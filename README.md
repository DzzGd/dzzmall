# dzzmall

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## 1. 目录结构

+ src
  + assets
    + css
      + normalize.css
      + base.css
    + img
  + common(公共的js文件)
    + utils.js
    + const.js
  + components
    + common (公共的组件)
      + tabbar(底部导航)
      + navBar(顶部导航栏)
      + swiper(轮播)
    + content (业务的组件)
      + mainTabBar
  + router
    + index.js
  + store(状态管理)
  + network(网络封装)
    + request.js
    + home.js
  + views
    + home
      + childComps
    + cart
    + category
    + profile
  + App.vue
  + main.js

## 2. reset css

重置全局的css样式 [normalize](http://necolas.github.io/normalize.css/)

```css
/* 获取根元素 */
:root {
  /* 定义变量 */
  --color-text: #666;
  --color-high-text: #ff5777;
  --color-tint: #ff8198;
  --color-background: #fff;
  --font-size: 14px;
  --line-height: 1.5;
}
```

## 3. vue.config.js&.editorconfig

自定义一些配置vue自动合并`vue.config.js`中的配置  

```js
module.exports = {
  configureWebpack: {
    // 起别名:
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}
```

`.editorconfig`对代码做一些统一风格规定,vue-cli3需要手动添加  

```js
root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2 //缩进大小为2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

## Tabber组件使用

将TabBar组件化,形成一个单独组件文件,以便其他项目也能使用  
尽量动态的进行显示,不能把内容写死, 利用插槽和传参

```js
props: {
  path: String,
  // 外部动态的传入active状态显示的颜色
  activeColor: {
    type: String,
    default: 'red'
  }
}
```

利用插槽时 尽量用个div包裹以防被使用时被替换后 slot上的属性被覆盖或者抹去  

## NavBar组件使用

分为了左中右三个(.left .center .right)部分, 也就是三个插槽, 使其更具有扩展性和多样性  
同样样式不能在NavBar中写死, 在Home组件中定义颜色样式  
使用到了`css变量`

```css
.home-nav{
  background-color: var(--color-tint)
}
```

## 首页轮播图组件

同样把轮播图创建为一个组件

### 数据获取

封装网络模块(request.js)  
单独为首页(Home)单独封装一个请求模块(home.js), 一个页面不止一次request,home.js封装了当前页面所有的请求方法, 降低了请求参数与页面业务逻辑的耦合度,页面只需要关心请求哪一个内容,不关心具体请求的参数(url,method)

### 封装轮播图

轮播图内部的渲染时间问题还带解决, 移动端滑动问题待解决  
只需要父组件传入一些额外的配置比如滑动速度,时间间隔等等  
对swiper和swiperitem在home组件中显示在进一步进行封装, 封装为homeSwiper,让home界面代码更直观和简洁  

## TabControl组件的封装

TabControl实现多个组件复用, 只是文字的变化不必使用插槽  
重视代码风格  
根据currentIndex监听变化 实现点击active的动态转移  

```html
:class="{'actibe':currentIndex === index}"
```

设计tabcontrol中数据的结构, 不同选项里面的内容和当前页码会有不同, 利用goods 分别储存数据状态

```js
goods: {
  'pop': {page: 0, list: []},
  'news': {page: 0, list: []},
  'sell': {page: 0, list: []}
}
```

把goodsList和goodslistitem分别封装成组件, 这样使得每一个goods内容渲染一个goodslist组件, 方便数据额传入的分配至每一个小的goodslistitem  

goodslistitem 使用了 弹性布局 宽度为百分比, 因为每一行呈现两个, 需要进行 换行处理, 利用space-evently 平分空白

切换tabcontrol组件时, 利用父组件监听子组件的事件触发, 将点击的 index 值 返回给父组件的事件参数中 根据switch 判断 属于哪个一个内容(pop,new,sell), 然后将currentType的数据类型再传给子组件

## 轮子 better-scroll的使用

滚动的元素只能是一个单一的元素, 就是说外层需要由一个元素包裹, 多个元素被放置在滚动元素中 

```html
<div class="wrapper">
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    .
    .
    .
  </ul>
</div>
```

这面只能给ul添加滚动, 使用bscroll绑定wrapper元素 必须在mounted生命周期中

默认情况BScroll是不可以实时监听事件

```js
// probe表示侦测
//     0,1都是不侦测实时的位置
//     2:手指滚动过程检测, 手指离开后的惯性过程不侦测
//     3:只要滚动,都侦测
// pullUpload表示上拉到底部触发
// click 默认为false 表示 div 或者 span等等元素能否被点击
// 但是button是否为false都能点击
const bscroll = new BScroll(el,{
  probeType: 0,
  click: true,
  pullUpload: true
})
bscroll.on('scroll', p => {
  console.log(p)
})
bscroll.on('pullUpload', () => {
  // 发送网络请求,请求更多页的数据
  console.log('上啦加载更多)
  // 等数据请求完成, 并且将新的数据展示出来以后
  setInterval(() => {
    // 调用这个方法才能进行下一次上拉更多
    bscroll.finishPullUp()
  }, 1000);
})
```

以防bscroll不在维护更新, 把bsscroll封装成组件  
使用时指定高度, 获取元素wrapper时, 尽量不要使用原生document的方式获取, 因为页面上可能不止一个wrapper元素, 可能会导致错误, 使用vue提供的ref获取元素方式更合适  

ref如果绑定在组件中,通过this.$refs.refname获取到的是一个组件对象
ref如果绑定在元素中,通过this.$refs.refname获取到的是一个元素对象

对组件直接进行事件监听必须要加上.native修饰符

**子组件的参数传递需要把驼峰命名改为利用` - ` 的形式**

监听滚动的y值 动态显示隐藏 backtop  

### 解决首页中better-scroll可滚动区域的问题

+ better-scroll再决定有多少区域可以滚动时, 是根据scrollheight属性决定
  + scrollheight属性是根据better-scroll的content中的子组件的高度
  + 但是我们在首页中,刚开始再计算scrollerheight属性时, 是没有将图片计算在内
  + 所以计算出来的高度时错误的
  + 后来图片加载出来有了新的高度, 但是scrollerHeight属性没有进行更新
  + 所以滚动出现了问题

如何解决这个问题

+ 监听每一张图片是否加载完成,只有一张图片加载完成了执行一次refresh()
+ 如何监听图片加载完成
  + 原生js  image.inload = function() {}
  + vue中@load='方法'
+ 调用scroll的refresh()
+ 如何将goodslistitem.vue中的事件传入到Home.vue中
  + 涉及到费父子组件的通信, 所以这里我们选择了事件总线
  + bus -> 总线
  + Vue.prototype.$bus = new Vue
  + this.$bus.emit('事件', '参数')
  + this.$bus.$on('事件', '参数')
  
### 事件总线的问题  

会出现因为事件总线中绑定了之后没有消除绑定的问题, 每一次绑定($on)就会增加一次事件, 也就是说,每当切换组件时, 之前的绑定没有清除 再一次切换到home时 就是打印60次(首次是加载30张图片), 并且之前的绑定中使用了`this`组件实例, 一旦切回就会报错 因为 之前的实例已经被清除了,所在home组件销毁前解除绑定($bus.$off('事件'))

解决图片加载完成之后连续快速的refresh消耗性能问题, 函数防抖(debounce)  

## tabcontrol吸顶

ref如果是组件 不能直接获取offsetTop等值, 可以获取组件实例后有一个#el属性 就是组件的元素  
不能再mounted中直接获取offsettop 因为 这个时候图片还没有加载完成的话就会让offsettop获取不正确,需要让图片加载完成后 触发一次回调让taboffsetTop 动态获取一次值  

又遇到了问题 fixed会收 translate影响, 舍去这个方法

再增加一个tabcontrol 把他的位置固定在 吸顶的地方, 一旦 原来的tabcontrol的offsettop移动到了吸顶的地方 就把它显示出来, 其他时候 就隐藏  

如果这样又出问题了 点击其中一个tabcontrol 其中一个选项有了活动效果也就是高亮的样式, 但是,这个时候另外一个tabcontrol的样式还没有改变, 这就很bug, 所以在切换选项的时候, 动态的吧当前的index值 设置到另外一个tabcontrol

```js
this.$refs.tabControl1.currentIndex = index
this.$refs.tabControl2.currentIndex = index
```

## 让home组件内部容保持原来的状态

使用keep-alive, 保存位置信息  

利用activated 和 deactivated将离开前的位置saveY 保存下载, 进入的时候 在定位到saveY, 注意:每次进入组件后 定位前 手动的刷新一下refresh一下scroll 避免未知的问题  

## Detail组件

详情页面 需要隐藏底部tabcontrol, 利用absolue 然后因为detail背景没有颜色, 所有是透明的  不会完全覆盖 tabcontrol  使其bgc为#fff

同样复用navbar组件 并插入相应的内容  
引用轮播组件

**注意注意**组件中有使用原生获取dom节点时候 把类名取单一, 还有其他的任何组件只要在相同页面不要出现同样的类名,不然会出千奇百怪的错  

对数据进行整合, 一般情况下的api接口数据 非常的乱无序, 这里采用的面向对象的方式 把不同点的数据整合到同一个对象中, 这样在使用的时候

### 基本信息组件

### 商家信息

评分根据 api中的 isbetter 动态绑定class 或者样式

### 商品信息

另建组件进行封装, 还是要refresh scroll的状态 避免拖不动

### 详情的单个评论

单独组件 需要注意 数据还没请求来的时候 使用对象里面为undefined的对象 会报错  

图片和文字在同一行 文字不能垂直居中

时间是秒 需要乘以 1000  然后对不同的需求进行事件格式化 比如 yy-mm-hhmmss,yy/mm/hhmmss  
### mixin混入  

因为Home组件中的图片和 详情页的组件中的图片都需要在图片加载完成后触发一次refresh, 同时在mounted使用到了debounce防抖相关的设置, 所以可以吧mounted封装起来 进行复用  

mixin也可以吧data, methods也封装进去

```js
import { debounce } from './utils'
export const itemListMixin = {
  data() {
    return {
      refreshListener: null
    }
  },
  mounted() {
    // 监听item中图片加载完成
    this.refreshListener = () => { debounce(this.$refs.scroll.refresh, 100) }
    this.$bus.$on('itemImageLoad', this.refreshListener)
  }
}
```

### 详情联动效果

标签中属性 部分大小写, 最好不用驼峰 用 ' - '

获取对应组件时的offsettop值 因为 组件不是立即更新, 需要渲染事件 不能拿到组件对象, 如果等到渲染完成 就可以获取值了

在网络请求回调中获取, 也不能 因为渲染DOM需要时间
$nextTick()表示`DOM`渲染完成后 执行的回调,
但是DOM渲染出来了,但是图片 依然没有加载完成
图片加载完成后再一次重新计算, 还是要利用防抖

反过来通过offsettop值 来响应顶部栏的 active变化, 其中利用了Number.Max_VALUE 添加到数组后面, 避免了数组[n + 1]项为空值的问题.从而省去了长串的比较条件

### 底部工具栏

### detail中的backtotop

利用混入 将组件内部相同部分抽离到mixins中, 注意组件中要import 并且要挂载

## 购物车

建立store  
抽离内容: mutations, actions等等

mutations唯一的目的就是修改state中的状态
mutations每个方法尽可能完成时间比较单一一点,

重构：

1. 所以在加入addCart中 包含了 添加商品, 和商品数量加一两个事件, 最好是拆开了来,并且官方推荐的是state->actions->mutations这样的调用过程,所以把复杂计算事件放入actions中

2. 抽取mutations/actions
mapGetters 辅助函数, 将actions的方法映射到组件中

```js
import mapGetters from 'vuex'

computed:{
  <!-- 1. -->
  ...mapGetters(['xxx'])
  <!-- 2. -->
  ...mapGetters({
    '自定义属性名': 'xxx'
  })
}
```

购物车导航栏的展示

购物车商品的展示
cartlistitem -> checkbutton 

商品的选中和选不中切换
  修改模型对象(model), 改变选中和不选择, 显示与不显示(view)

底部工具栏
  全选
  计算总价格
  去计算

### 全选

1. 根据数组中的状态改变底部全选的状态
利用高阶函数遍历 每一项的isChecked, 但是要先判断数组为空的状况, 默认[].every(...) 空数组返回true

```js
isSelectAll() {
  if (this.cartList.length === 0) return false
  return this.cartList.every(item => {
    return item.isChecked
  })
}
```

2. 点击底部全选改变数组中的状态

  这个时候不能使用如下简便方法

  ```js
  this.cartList.forEach(item => {
    item.isChecked = !this.isSelectAll
  });
  ```
  
  因为this.isSelectAll是计算属性根据store的getters中的方法返回的具有响应式的作用, 一旦改变cartlist中其中一个ischeck 就会响应式的改变this.isSelectAll的返回值,因此不能做到全选,还是老老实实利用if else

  ```js
  checkClick() {
    if (this.isSelectAll) {
      this.cartList.forEach(item => {
        item.isChecked = false
      });
    } else {
      this.cartList.forEach(item => {
        item.isChecked = true
      });
    }
  }
  ```

### 弹窗Toast(吐司)

商品添加到购物车需要弹窗, 需要真正添加成功后返回信息, 利用将actions中的addCart方法 返回一个promise, 然后在组件中then()回调出添加成功白的信息

除了mapGetter, 还有mapActions, 将store中的状态管理方法直接映射到组件之中,方便使用

弹窗Toast的封装:

1. 直接封装一个组件(toast)
   该组件里面有一个show 方法 和 hide 方法, 在其他组件中直接引入该组件 然后调用内部的方法

2. 注册Toast插件
   1. 创建组件构造器,
      const toastConstructor = Vue.extend(Toast)
   2. new的方式们根据组件构造器, 可以创建出来一个组件对象
      const toast = new toastConstructor()
   3. 将组件对象, 手动挂载到某个元素上
      toast.$mount(document.createElemnt('div))
   4. toast/$el就是div
      document.body.appendChild(toast.$el)  

   ```js
    const obj = {}
    obj.install = function (Vue) {
      const toastConstructor = Vue.extend(Toast)
      const toast = new toastConstructor()
      toast.$mount(document.createElement('div'))
      document.body.appendChild(toast.$el)
      Vue.prototype.$toast = toast
    }
   ```

## 移动端300ms延迟

利用 fastclick插件

```js
import FastClick from 'fastclick'
FastClick.attach(document.body)
```

## 懒加载

