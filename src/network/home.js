import { request } from './request'

export function getHomeMultiData() {
    return request({
        url: '/home/multidata'
    });
}

//封装请求首页商品函数
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}


// 函数调用->压入函数栈（保存函数调用过程中所有变量）
// 函数调用结束->弹出函数栈（释放所有的变量）

// function test() {
//     const names = ['why', 'aaa'];

// }
// test()