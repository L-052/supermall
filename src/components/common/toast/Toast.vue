<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      message: "",
      isShow: false,
    };
  },
  methods: {
    // duration时间
    show(message = "默认文字", duration = 2000) {
      this.isShow = !this.isShow;
      this.message = message;
      setTimeout(() => {
        this.isShow = !this.isShow;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  /* width: 120px; */
  height: 40px;
  background-color: rgb(7, 7, 7);
  opacity: 0.7;
  text-align: center;
  line-height: 40px;
  top: 50%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
  z-index: 999;
}
</style>