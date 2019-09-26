import {
  ADD_TO_CART,
  ADD_COUNT
} from './mutation-types'
console.log(ADD_TO_CART)
export default {
  [ADD_COUNT](state, payLoad) {
    payLoad.count++
  },
  [ADD_TO_CART](state, payLoad) {
    payLoad.isChecked = true
    state.cartList.push(payLoad)
  }
}