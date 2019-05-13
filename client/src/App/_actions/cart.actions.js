import { cartConstants } from '../_constants/cartConstants.js';
/*
import { alertActions } from './alert.actions.js';
import { history } from '../store.js';
*/
export const cartActions = {
    addToCart
}

function addToCart(clothing) { return { type: cartConstants.CART_ADDTO_REQUEST, clothing } }