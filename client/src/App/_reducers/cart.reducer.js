import { cartConstants } from '../_constants/cartConstants.js';

const initialState = {
    cart: []
}

export default function cart(state = initialState, action) {
    switch (action.type) {
        case cartConstants.CART_ADDTO_REQUEST:
            return Object.assign({}, state, {
                cart: [
                    ...state.cart,
                    action.clothing
                ]
            })
        default:
            return state
    }
}
