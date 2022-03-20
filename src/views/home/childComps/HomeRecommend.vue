<template>
  <div class="recommends">
    <div
      v-for="item in recommends"
      :key="item.background"
      class="recommend-item"
    >
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommends {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 15px 0px 20px 0px;
  border-bottom: 10px solid #eee;
}
.recommend-item {
  flex: 1;
}
.recommend-item img {
  width: 80px;
  height: 80px;
  margin-bottom: 5px;
}
</style>