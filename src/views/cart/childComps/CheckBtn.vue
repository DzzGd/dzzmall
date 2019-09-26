<template>
  <div class="CheclBtn" :class="{'isSelected':isChecked}">√</div>
</template>

<script>
export default {
  name: "CheckBtn",
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.CheclBtn {
  width: 16px;
  height: 16px;
  background-color: #eee;
  border: 1px solid #aaa;
  border-radius: 50%;
  text-align: center;
  line-height: 16px;
  font-weight: bold;
  font-size: 0;
}
.isSelected {
  background-color: pink;
  border: 1px solid #aaa;
  font-size: 14px;
}
</style>