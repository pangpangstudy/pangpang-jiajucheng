import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaCheck } from "react-icons/fa";
import { useCartContext } from "../context/cart_context";
import AmountButtons from "./AmountButtons";

const AddToCart = ({ product }) => {
  const { stock, colors, id } = product;
  // 颜色
  const [mainColor, setMainColor] = useState(colors[0]);
  // 数量
  const [amount, setAmount] = useState(1);
  const increase = () => {
    setAmount((oldAmount) => {
      if (oldAmount === stock) {
        return stock;
      }
      return oldAmount + 1;
      // OR
      let newAmount = oldAmount + 1;
      if (newAmount > stock) {
        newAmount = stock;
      }
      return newAmount;
    });
  };
  const decrease = () => {
    setAmount((oldAmount) => {
      if (oldAmount === 1) {
        return 1;
      }
      return oldAmount - 1;
    });
  };
  // add to cart
  const { addToCart } = useCartContext();
  return (
    <Wrapper>
      <div className="colors">
        <span>color : </span>
        <div>
          {colors.map((color, index) => {
            return (
              <button
                onClick={() => {
                  // setMainColor(colors[index]);
                  setMainColor(color);
                }}
                key={index}
                style={{ backgroundColor: color }}
                // className={`${
                //   mainColor === color ? "color-btn active" : "color-btn"
                // } `}
                className="color-btn"
              >
                {mainColor == color && <FaCheck />}
              </button>
            );
          })}
        </div>
      </div>
      <div className="btn-container">
        <AmountButtons
          amount={amount}
          increase={increase}
          decrease={decrease}
        />
        <Link
          to="/cart"
          className="btn"
          onClick={() => {
            addToCart(id, mainColor, amount, product);
          }}
        >
          Add to cart
        </Link>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }

  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
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
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`;
export default AddToCart;
// 第二种使用checkBox
{
  /* <input
        type="checkbox"
        name="color"
        id="checkOne"
        style={{ background: mainColor }}
      />
      <input
        type="checkbox"
        name="color"
        id="checkTwo"
        style={{ background: colors[1] }}
      /> 
   but   一定要使用  appearance   
        input {
    -webkit-appearance: none; 隐藏默认的显示样式
    -moz-appearance: none; 隐藏默认的显示样式
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
      */
}
