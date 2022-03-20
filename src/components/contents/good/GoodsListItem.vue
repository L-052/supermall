<template>
  <div class="goodsitem" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad" />
    <div class="goodsinfo">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
    <!-- {{goodsItem}} -->
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img;
      // return (
      //   (this.goodsItem.show && this.goodsItem.show.img) || this.goodsItem.image
      // );
    },
  },
  methods: {
    imageLoad() {
      this.$bus.$emit("itemImageLoad");
      // if (this.$route.path.indexOf("/home")) {
      //   // console.log("imageLoad");
      //   this.$bus.$emit("homeItemImageLoad");
      // } else if (this.$route.path.indexOf("/detail")) {
      //   this.$bus.$emit("detailItemImgLoad");
      // }
    },
    itemClick() {
      console.log("跳转详情页");
      this.$router.push("/detail/" + this.goodsItem.iid);
    },
  },
};
</script>

<style>
.goodsitem {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}
.goodsitem img {
  border-radius: 5px;
  width: 100%;
}
.goodsinfo {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0px;
  overflow: hidden;
  text-align: center;
}
.goodsinfo p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goodsinfo .price {
  color: red;
  margin-right: 20px;
}
.goodsinfo .collect {
  position: relative;
}
.goodsinfo .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/images/common/collect.svg") 0 0/14px 14px;
}
</style>