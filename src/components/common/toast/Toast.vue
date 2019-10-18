<template>
  <transition name="fade">
    <div v-show="isShow" class="Toast" :style="{color:color}">{{msg}}</div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      isShow: false,
      msg   : "",
      timer : null,
      color : '#fff'
    };
  },
  methods: {
    show(msg, delay) {
      this.isShow = false;
      clearTimeout(this.timer)
      this.color  = this.randomColors()
      this.isShow = true;
      this.msg    = msg;
      this.hide(delay);
    },
    hide(delay) {
      this.timer = setTimeout(() => {
        this.isShow = false;
      }, delay);
    },
    randomColors() {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      let color = "rgba(" + r + "," + g + "," + b + ",0.8)";
      return color
    }
  }
};
</script>

<style scoped>
.Toast {
  width: 120px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.76);
  position: absolute;
  left: 50%;
  top: 60%;
  transform: translate(-50%, -50%);
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  z-index: 10;
  word-break: break-all;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>