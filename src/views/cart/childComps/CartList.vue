<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      ></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "../../../components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";
export default {
  components: { Scroll, CartListItem },
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    // console.log("+------------");
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 99px;
}
.content {
  height: 100%;

  overflow: hidden;
}
</style>