<template>
  <div class="goods">
    <goods-list-item
      v-for="item in goods"
      :key="item.background"
      :goods-item="item"
    ></goods-list-item>
    <!-- {{goods}} -->
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: { GoodsListItem },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  justify-content: space-evenly;
}
</style>