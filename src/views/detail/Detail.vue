<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-navbar"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentscroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "../../components/contents/good/GoodsList.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";
import BackTop from "../../components/contents/backTop/BackTop.vue";
import { mapActions } from "vuex";
// import Toast from "../../components/common/toast/Toast.vue";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      // message: "",
      // show: false,
    };
  },

  activated() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // console.log(this.iid);

    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      //1. 获取顶部的轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      // console.log(this.topImages);
      //2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品详情数据
      this.detailInfo = data.detailInfo;
      // console.log(this.detailInfo);
      // 5.获取商品参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // console.log(this.paramInfo);

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // 1.第一次获取，值不对
      // 值不对的原因：体会￥refs.params.$el没有被渲染
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);

      //等页面渲染完，回调这个函数
      // this.$nextTick(() => {
      //   // 2.第二次获取：值不对
      //   // 值不对原因：图片没有加载完成
      //   // 根据最新的数据，对应的DOM是已经被渲染出来
      //   // 但是图片还未渲染完成（即目前获取到的offsetTop不包含其中的图片）
      //   // 一般offsetTop值不对的时候，都是因为图片加载的问题
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    }),
      // 3.请求推荐数据
      getRecommend().then((res) => {
        console.log(res);
        this.recommends = res.data.list;
      });
    // 4.给getThemeTopY赋值
    // this.getThemeTopY = debounce(() => {
    //   this.themeTopYs = [];
    //   this.themeTopYs.push(0);
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    //   console.log(this.themeTopYs);
    // });
  },
  mounted() {},
  updated() {
    this.themeTopYs = [];
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    // console.log(this.themeTopYs);
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },

  methods: {
    ...mapActions(["addCart"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      // this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentscroll(position) {
      // console.log(position);
      // 1.获取Y值
      const positionY = -position.y;
      // 2.再用positionY中的值与主题中的值进行对比
      // [0, 10815, 11606, 11917 ]
      // positionY在0和10815之间，index=0
      // positionY在10815和11606之间，index=1
      // positionY11606在和11917之间，index=2
      // positionY大于等于11917，index=3
      let length = this.themeTopYs.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
            (i === length - 1 && positionY >= this.themeTopYs[i]))
        ) {
          // console.log(i);
          this.currentIndex = i;
          console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 3.是否显示回到顶部
      this.isShowBackTop = -position.y > 2000;
      // console.log(this.isShowBackTop);
    },
    backClick() {
      //获取scroll组件对象
      // console.log('456');
      this.$refs.scroll.scrollTo(0, 0, 500);
      // this.$refs.scroll.scrollTo(0,0);
    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里
      // this.$store.cartList.push(product);
      this.addCart(product).then((res) => {
        // console.log(res);
        // this.show = !this.show;
        // this.message = res;
        // setTimeout(() => {
        //   return (this.show = !this.show);
        // }, 1500);
        // console.log("添加到购物车成功");
        // console.log(this.$toast.show);
        // 显示商品加购信息
        this.$toast.show(res, 2000);
      });
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  height: 100vh;
  background-color: #fff;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 50px;
  left: 0;
  right: 0;
}
.detail-navbar {
  position: relative;
  z-index: 10px;
}
</style>