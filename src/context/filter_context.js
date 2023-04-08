import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  all_products: [],
  filtered_products: [],
  grid_view: true,
  list_loading: false,
  sort: "price-lowest",
  // 根据值的change 控制 分类
  filter: {
    text: "",
    category: "All",
    company: "All",
    color: "All",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  // 确定整个页面是依据什么变化的
  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  // loading
  const listLoading = () => {
    dispatch({ type: "LIST_LOADING" });
  };
  const listLoadingSuccess = () => {
    dispatch({ type: "LIST_LOADING_SUCCESS" });
  };

  // view
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };
  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };

  // sort
  const updateSort = (e) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };
  useEffect(() => {
    // 注意不要改变顺序，先筛选 再排序。 现有产品然后才能排序
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [state.sort, products, state.filter]);

  // filter 分类框
  const updateFilter = (e) => {
    // because  这个函数需要控制多个input  所以用name来控制，filter相关state
    let name = e.target.name;
    let value = e.target.value;
    // 提取分类button的内容 方法1
    if (name == "category") {
      value = e.target.textContent;
    }
    // 方法2
    if (name == "color") {
      value = e.target.dataset.color;
    }
    if (name == "price") {
      value = Number(value);
    }
    if (name == "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilter = (e) => {
    dispatch({ type: CLEAR_FILTERS });
  };
  // ==========return
  return (
    <FilterContext.Provider
      value={{
        ...state,
        listLoading,
        listLoadingSuccess,
        setGridView,
        setListView,
        updateSort,
        updateFilter,
        clearFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
