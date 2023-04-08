import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  // products
  if (action.type === LOAD_PRODUCTS) {
    // filter
    let maxPrice = action.payload.map((p) => p.price);
    maxPrice = Math.max(...maxPrice);
    return {
      ...state,
      // 使用扩展操作符 是为了深拷贝，如果直接equal action.payload的话，那么我们对其改变就会影响初始值，甚至造成无限loop。等于说这里是重新建立了一个数组
      all_products: [...action.payload],
      // 以免在filter时改变了数组，造成bug
      filtered_products: [...action.payload],
      filter: {
        ...state.filter,
        max_price: maxPrice,
        price: maxPrice,
      },
    };
  }
  // loading
  if (action.type === "LIST_LOADING") {
    return { ...state, list_loading: true };
  }
  if (action.type === "LIST_LOADING_SUCCESS") {
    return { ...state, list_loading: false };
  }
  // View
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false };
  }
  // Sort
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  // SORT
  if (action.type === SORT_PRODUCTS) {
    const { sort, filtered_products } = state;
    // 深拷贝 以免改变原始数组
    let tempProducts = [...filtered_products];
    if (sort === "price-lowest") {
      tempProducts = tempProducts.sort((a, b) => a.price - b.price);
      return { ...state, filtered_products: tempProducts };
    }
    if (sort === "price-highest") {
      tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      return { ...state, filtered_products: tempProducts };
    }
    if (sort === "name-a") {
      tempProducts = tempProducts.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      return { ...state, filtered_products: tempProducts };
    }
    if (sort === "name-z") {
      tempProducts = tempProducts.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
      return { ...state, filtered_products: tempProducts };
    }
  }
  // ctrl filter input
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filter: { ...state.filter, [name]: value } };
  }
  //filter update
  if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    const { text, category, company, price, color, shipping } = state.filter;
    // 注意一定一定要深拷贝，不要操作原始数组
    // 默认filter全为all  so-> 深拷贝all ->层层筛选
    let templateFilter = [...all_products];
    //  text
    if (text) {
      templateFilter = templateFilter.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
      // startsWith() 方法用来判断当前字符串是否以另外一个给定的子字符串开头，并根据判断结果返回 true 或 false。
    }
    // company
    if (company !== "All") {
      templateFilter = templateFilter.filter((product) => {
        return product.company == company;
      });
    }
    // category
    if (category !== "All") {
      templateFilter = templateFilter.filter((product) => {
        return product.category == category;
      });
    }
    // color
    if (color !== "All") {
      templateFilter = templateFilter.filter((product) => {
        // color is array
        return product.colors.find((c) => c === color);
      });
    }
    // shipping
    if (shipping) {
      templateFilter = templateFilter.filter(
        (product) => product.shipping === true
      );
    }
    // price  不需要if，因为直接就要筛选

    templateFilter = templateFilter.filter((product) => product.price <= price);

    return { ...state, filtered_products: templateFilter };
  }
  // clear filters
  if (action.type == CLEAR_FILTERS) {
    return {
      ...state,
      filter: {
        ...state.filter,
        text: "",
        category: "All",
        company: "All",
        color: "All",
        price: state.filter.max_price,
        shipping: false,
      },
    };
  }
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
