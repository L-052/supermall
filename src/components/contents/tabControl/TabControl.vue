<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="tab-c"
      :class="{ active: index === currentIndex }"
      @click="tabClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabControl",
  props: {
    titles: {
      ttype: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    tabClick(index) {
      // 获取点击的对象是谁
      this.currentIndex = index;
      // 将内部点击的对象传给父级
      this.$emit("tabClick", index);
    },
  },
};
</script>

<style>
.tab-control {
  /* display: inline-block; */
  font-weight: 900;
  text-align: center;
  display: flex;
  z-index: 1;
}
.tab-c {
  flex: 1;
  height: 40px;
  line-height: 40px;
}

.tab-control span {
  padding: 4px;
}
.active {
  color: pink;
}
.active span {
  border-bottom: 3px solid pink;
}
</style>