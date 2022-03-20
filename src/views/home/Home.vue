<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <!-- banners动态绑定获取的数据，才可以显示封装的组件轮播图效果 -->
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>

      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>

      <goods-list :goods="goods[currentType].list"></goods-list>
      <!-- :goods="goods[currentType].list"点击时动态获取哪一个类型的商品数据 -->
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script >
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/HomeRecommend.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/contents/tabControl/TabControl.vue";
import GoodsListItem from "components/contents/good/GoodsListItem.vue";
import GoodsList from "components/contents/good/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/contents/backTop/BackTop.vue";

import { getHomeMultiData, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
// import {getHomeGoods} from 'network/home'

export default {
  name: "Home",
  components: {
    // Swiper,SwiperItem,
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsListItem,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      // result:null,//用来保存函数中的变量
      banners: [],
      recommends: [],
      // 设计数据结构，用于保存数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // 默认currentType的值是pop
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener: null,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  destroyed() {
    // console.log("home destroyed");
  },
  activated() {
    // console.log("activated");
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    // 刷新
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 1.保存Y值
    // console.log("deactivated");
    this.saveY = this.$refs.scroll.scroll.y;

    // 2.取消全局事件监听
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  created() {
    //1.请求多个数据
    this.getHomeMultiData();
    //2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh);

    //3.监听item中的图片加载完成
    // 对监听的事件进行保存
    this.itemImgListener = () => {
      // console.log("---------");
      // this.$refs.scroll.refresh();
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  methods: {
    /* 
事件监听相关的方法
 */

    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 解决点击时，两导航栏不同步问题
      //currentIndex是当前值的索引的意思，是自带的属性
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // scrollTo(x,y,time=300){
    //   this.scroll.scrollTo(x,y,time)
    // },

    //回到顶部点击事件
    backClick() {
      //获取scroll组件对象
      // console.log('456');
      this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      // this.$refs.scroll.scrollTo(0,0);
    },
    // 监听滚动，当pisition.y的值大于1000px时，显示回到顶部图标
    contentScroll(position) {
      // console.log(position);
      // 1.判断BackTop是否显示效果
      // -(position.y)>1000时的值是true，赋值给isShowBackTop
      this.isShowBackTop = -position.y > 1000;

      // 2.决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);

      // 刷新计算可滚动区域高度
      this.$refs.scroll.scroll.refresh();
    },
    swiperImageLoad() {
      //3.获取tabControl的offsetTop
      //所有的组件都有一个属性$el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // 监听到轮播图加载完成后的值
      console.log(this.$refs.tabControl2.$el.offsetTop);
    },
    /* 
网络请求的相关方法
 */
    getHomeMultiData() {
      // 这个函数是异步操作
      getHomeMultiData().then((res) => {
        // console.log(res);//函数在调用完之后，变量名会被销毁，即内容也找不到
        // this.result=res;//通过这样可以保存获取过来的数据
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        //扩展运算符，直接对res.data.list数组进行解析再塞到this.goods[type].list里面
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        /* 默认只会进行一次的数据请求获取 
        完成上拉加载更多
主动调用这个方法，才可以进行下一次的数据请求获取 */
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: pink;
  color: #fff;
  /* 使用浏览器原生滚动时用的 ，为了导航不跟随一起滚动*/
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1; */
}

.content {
  /* height: calc(100%-93px); 
  
margin-top: 40px; */
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  /* z-index只对定位的元素起效果 */
  z-index: 1;
  top: -1px;
  background-color: #fff;
}
</style>