import React, { useEffect } from "react";
import { useFilterContext } from "../context/filter_context";
import styled from "styled-components";
import GridView from "./GridView";
import ListView from "./ListView";
import Loading from "./Loading";

const ProductList = () => {
  const {
    all_products: products,
    filtered_products: filterProducts,
    grid_view,
    listLoading,
    listLoadingSuccess,
    list_loading: loading,
  } = useFilterContext();
  useEffect(() => {
    listLoading();
    if (products.length >= 1) {
      listLoadingSuccess();
    }
  }, [filterProducts]);

  if (loading) {
    return (
      <Wrapper>
        <Loading className="loading" />;
      </Wrapper>
    );
  }

  if (filterProducts.length < 1) {
    return <h4>no products</h4>;
  }
  if (!grid_view) {
    return <ListView filterProducts={filterProducts} />;
  }
  return <GridView filterProducts={filterProducts} />;
};

export default ProductList;
const Wrapper = styled.div`
  .loading {
    margin-left: 35vw;
  }
`;
