<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <!-- 列表展示 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-buttom-bar></cart-buttom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { mapGetters } from "vuex";
import CartList from "./childComps/CartList.vue";
import CartButtomBar from "./childComps/CartButtomBar.vue";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartButtomBar,
  },
  computed: {
    ...mapGetters(["cartLength"]),
  },
  methods: {
    // checkClick() {
    //   console.log("666666666666");
    // },
  },
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav {
  background-color: pink;
  color: #fff;
}
</style>
