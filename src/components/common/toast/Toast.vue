<template>
  <transition name="fade">
    <div v-show="isShow" class="Toast">{{msg}}</div>
  </transition>
</template>

<script>
export default {
  name:"Toast",
  data() {
    return {
      isShow: false,
      msg: ''
    }
  },
  methods: {
    show(msg, delay) {
      this.isShow = true
      this.msg = msg
      this.hide(delay)
    },
    hide(delay) {
      setTimeout(() => {
        this.isShow = false
      }, delay);
    }
  }
}
</script>

<style scoped>
.Toast{
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


.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>