import {
  ADD_TO_CART,
  ADD_COUNT
} from './mutation-types'

export default {
  addCart({ state, commit }, payLoad) {
    return new Promise((resolve, reject) => {
            // 是否有该商品
      let oldProduct = state.cartList.find(item => {
        return item.iid === payLoad.iid
      })

      if (oldProduct) {
        commit(ADD_COUNT, oldProduct)
        resolve('商品数量加1')
      } else {
        payLoad.count = 1
        commit(ADD_TO_CART, payLoad)
        resolve('添加商品成功')
      }
    })
  }
}