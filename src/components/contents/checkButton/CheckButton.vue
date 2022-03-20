<template>
  <!-- 第三步在按钮组件里改变状态 -->
  <div class="check-button" :class="{ check: !isChecked }">
    <img src="~assets/images/cart/tick.svg" alt="" />
  </div>
</template>

<script>
export default {
  name: "CheckButton",
  props: {
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.check-button {
  width: 22px;
  height: 22px;
  background-color: pink;
  border-radius: 50%;
  border: 2px solid pink;
  position: relative;
}
.check-button img {
  position: absolute;
}

.check {
  border-color: #aaa;
  background-color: #fff;
}
</style>