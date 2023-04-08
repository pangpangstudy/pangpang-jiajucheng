import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  //----------------- ADD
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    // check 同一颜色 同一id
    let tempCartItem = state.cart.find((item) => item.id == id + color);
    if (tempCartItem) {
      const tempCart = state.cart.map((item) => {
        if (item.id == id) {
          let newAmount = item.amount + amount;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });
    } else {
      let newItem = {
        id: id + color,
        name: product.name,
        color,
        price: product.price,
        amount,
        image: product.images[0],
        max: product.stock,
      };
      return { ...state, cart: [...state.cart, newItem] };
    }
  }
  // -----------------remove
  if (action.type === REMOVE_CART_ITEM) {
    let tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }
  // --------clear
  if (action.type === CLEAR_CART) {
    let tempCart = [];
    return { ...state, cart: tempCart };
  }
  // ---------toggle amount
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
    let tempCart = state.cart.map((item) => {
      if (item.id === id) {
        if (value == "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (value == "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      } else {
        return item;
      }
    });
    return { ...state, cart: tempCart };
  }
  // -----count total cart items
  if (action.type === COUNT_CART_TOTALS) {
    let { total_items, total_price } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.total_items += amount;
        total.total_price += amount * price;
        return total;
      },
      { total_items: 0, total_price: 0 }
    );
    return { ...state, total_items, total_price };
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
