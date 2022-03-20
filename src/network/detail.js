import { request } from './request'

//商品信息接口 
export function getDetail(iid) {
    return request({
        url: '/detail',
        params: {
            iid
        }
    })
}

// 商品推荐接口
export function getRecommend() {
    return request({
        url: '/recommend'
    })
}



// ---------------
export class Goods {

    //定义了一个名字为Goods的类
    constructor(itemInfo, columns, services) {
        //constructor是一个构造方法，用来接收参数
        this.title = itemInfo.title,
            // this代表实例对象
            this.desc = itemInfo.desc,
            this.newPrice = itemInfo.price,
            this.oldPrice = itemInfo.oldPrice,
            this.discount = itemInfo.discountDesc,
            this.columns = columns,
            this.services = services,
            this.realPrice = itemInfo.lowNowPrice
    }
}

export class Shop {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}


export class GoodsParam {
    constructor(info, rule) {
        // 注:images可能没有值（某些商品有值，某些没有值）
        this.image = info.images ? info.images[0] : '';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}