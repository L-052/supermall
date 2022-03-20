<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    // 有了probeType：值  之后，才可以显示position的位置信息
    probeType: {
      type: Number,
      default: 0,
    },
    // 上拉加载更多，监听上拉
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
      // console.log("+++++++++++");
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      //1.控制div元素是否可以点击
      click: true,

      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    //2.监听滚动的位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        // console.log(position);
        // 自定义事件传出去数据
        this.$emit("scroll", position);
      });
      // console.log(this.scroll);
    }
    //3. 监听上拉事件，即监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log("上拉加载更多");
        this.$emit("pullingUp");
      });
    }
  },
};
</script>

<style>
</style>