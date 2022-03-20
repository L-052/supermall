<template>
  <div class="bottom-bar">
    <div class="check">
      <check-button
        class="check-all"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="total">合计：{{ totalPrice }}</div>
    <div class="caculate" @click="calcClick">去计算{{ checklength }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CheckButton from "components/contents/checkButton/CheckButton.vue";
export default {
  components: { CheckButton },
  name: "CartButtomBar",
  computed: {
    ...mapGetters(["cartList"]),
    // 计算价格
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((prevalue, item) => {
            return prevalue + item.price * item.count;
          }, 0)
      );
    },
    // 选中商品个数
    checklength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    // 判断是否全部选中
    isSelectAll() {
      if (this.cartList.length === 0) return false;
      // 1.使用filter函数
      // return !this.$store.state.cartList.filter((item) => !item.checked).length;
      // 2.使用find函数
      return !this.cartList.find((item) => !item.checked);
      // 3.使用普通函数
      // for (let item of this.$store.state.cartList) {
      //   if (!item.checked) {
      //     return false;
      //   }
      // }
      // return true;
    },
  },
  methods: {
    checkClick() {
      // console.log("-----------8555555s");
      if (this.isSelectAll) {
        //全部选中
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        //部分或全部不选中
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
    calcClick() {
      if (!this.cartList.find((item) => item.checked)) {
        this.$toast.show("请选择购买的商品", 2000);
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 46px;
  display: flex;
  line-height: 46px;
  background-color: rgb(248, 247, 247);
  position: absolute;
  bottom: 50px;
}
.check {
  display: flex;
  align-items: center;
  margin-left: 2px;
  margin-right: 5px;
}

.check-all {
  width: 22px;
  height: 22px;
}
.total {
  margin-left: 20px;
}
.caculate {
  text-align: center;
  font-size: 19px;
  color: #fff;
  width: 100px;
  position: absolute;
  right: 0px;
  background-color: pink;
}
</style>