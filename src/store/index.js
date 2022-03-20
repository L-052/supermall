import Vue from 'vue'
import Vuex from 'vuex'

import getters from './getters'


// 1.安装插件
Vue.use(Vuex)

// 2.创建store对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations: {
        // mutations唯一的目的就是修改state中的状态
        // mutations中的每个方法尽可能完成的事件比较单一一点
        addCounter(state, payload) {
            payload.count++;
        },
        addToCart(state, payload) {

            state.cartList.push(payload)
        }
    },
    actions: {
        addCart(context, payload) {
            //payload新添加的商品
            // let oldProduct = null;
            // for (let item of state.cartList) {
            //     if (item.iid === payload.iid) {
            //         oldProduct = item
            //     }
            // }
            return new Promise((resolve, reject) => {
                // 1.查找之前数组中是否有该商品
                let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);
                // 第一步。赋初始状态值
                payload.checked = true;
                // 2.判断oldProduct
                if (oldProduct) { //数量+
                    // oldProduct.count += 1
                    context.commit('addCounter', oldProduct);


                    resolve('当前商品数量+1');
                } else { //添加新商品
                    payload.count = 1;
                    // context.state.cartList.push(payload)
                    context.commit('addToCart', payload);
                    resolve('添加商品成功');
                }
            })


        }
    },
    getters
})

// 3.挂载Vue实例上
export default store