import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filter: {
      text,
      category,
      color,
      max_price,
      min_price,
      price,
      company,
      shipping,
    },
    all_products,
    updateFilter,
    clearFilter,
  } = useFilterContext();
  // 分类数组 辅助函数 loop 显示
  const categories = getUniqueValues(all_products, "category");
  const companies = getUniqueValues(all_products, "company");
  const colors = getUniqueValues(all_products, "colors");
  return (
    <Wrapper>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {/* search */}
        <input
          type="text"
          name="text"
          className="search-input"
          value={text}
          placeholder="search"
          onChange={updateFilter}
        />
        {/* 类别 */}
        <div className="form-control">
          <h5>category : </h5>
          <div className="padding">
            {categories.map((cate, index) => {
              // key 可以使用uuid 不过这里的index无关紧要
              return (
                <button
                  key={index}
                  onClick={updateFilter}
                  name="category"
                  type="button"
                  className={`${category == cate ? "active" : ""}`}
                >
                  {cate}
                </button>
              );
            })}
          </div>
        </div>

        {/* 公司 */}
        <div className="form-control">
          <h5>Company : </h5>
          {/* company 默认 为 All */}
          <select name="company" value={company} onChange={updateFilter}>
            {companies.map((com, index) => {
              return (
                <option key={index} value={com}>
                  {com}
                </option>
              );
            })}
          </select>
        </div>
        {/* color */}
        <div className="form-control">
          <h5>color : </h5>
          <div className=" colors">
            {colors.map((c, index) => {
              // 辅助函数中 colors数组添加了all
              if (c == "All") {
                return (
                  <button
                    name="color"
                    onClick={updateFilter}
                    data-color={c}
                    key={index}
                    className={`${color === c ? "all-btn active" : "all-btn"}`}
                  >
                    All
                  </button>
                );
              }
              return (
                <button
                  className={color === c ? "color-btn active" : "color-btn"}
                  key={index}
                  name="color"
                  data-color={c}
                  style={{ backgroundColor: c }}
                  onClick={updateFilter}
                >
                  {color === c && <FaCheck />}
                </button>
              );
            })}
          </div>
        </div>
        {/* price */}
        <div className="form-control">
          <h5>price</h5>
          <p className="price">{formatPrice(price)}</p>
          <input
            type="range"
            name="price"
            min={min_price}
            // 如果尝试将value设置为小于最小值，则将其设置为最小值。类似地，尝试将值设置为大于最大值会导致将其设置为最大值。
            max={max_price}
            value={price}
            onChange={updateFilter}
          />
        </div>
        {/* shipping */}
        <div className="form-control shipping">
          <label htmlFor="shipping">free shipping</label>
          <input
            type="checkbox"
            name="shipping"
            id="shipping"
            onChange={updateFilter}
            checked={shipping}
          />
        </div>
      </form>
      {/* clear button */}
      <button className="clear-btn" onClick={clearFilter}>
        clear filters
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .padding {
    padding-left: 1rem;
  }

  .form-control {
    margin-top: 0.75rem;
    margin-bottom: 1.25rem;
    padding-left: 0.3rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    // opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.7rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    // opacity: 0.5;
  }
  // .active {
  //   opacity: 1;
  // }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
