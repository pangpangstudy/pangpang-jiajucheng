import {
  useEffect,
  useContext,
  useReducer,
  createContext,
  // useState,
} from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";
// 获取本地数据
const getCartLocalData = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};
const initialState = {
  cart: getCartLocalData(),
  total_items: 0,
  total_price: 0,
  shipping_fee: 534,
};
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // add to cart
  const addToCart = (id, color, amount, product) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  };
  // remove cart item
  const removeCartItem = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  // toggle amount
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  // clear
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };
  // 保存用户数据 到本地
  useEffect(() => {
    // 更新 total_items
    dispatch({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);
  // ========return
  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeCartItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
