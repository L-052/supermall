<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-info">
    <!-- 标题 信息-->
    <div class="info-title">{{ goods.title }}</div>
    <!-- 价格和折扣信息-->
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <!-- 快递信息 -->
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <!-- 24小时发货信息 -->
    <div class="info-service">
      <!-- 数字遍历 -->
      <span
        class="info-services-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon" />
        <span>{{ goods.services[index - 1].name }}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  margin-top: 15px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  margin-top: 10px;
}
.n-price {
  font-size: 24px;
  color: rgb(226, 67, 115);
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
}
.discount {
  margin-left: 8px;
  font-size: 20px;
  background: rgb(250, 96, 122);
  color: #fff;
  border-radius: 5px;
}
.info-other {
  display: flex;
}
.info-other span {
  margin-top: 12px;
  flex: 1;
}
.info-service {
  display: flex;
}
.info-service span {
  flex: 1;

  color: #222;
  font-size: 15px;
  margin-top: 15px;
  margin-bottom: 10px;
}
.info-service img {
  vertical-align: middle;

  width: 18px;
  height: 18px;
}
</style>