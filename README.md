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