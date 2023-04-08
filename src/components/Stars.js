import React, { useEffect } from "react";
import styled from "styled-components";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Stars = ({ stars = 0, reviews }) => {
  // 尽量不要直接操作stars  because  isLoading  --->如果要使用stars  先使用默认参数 然后直接操作stars
  // 第一种思路 //O(n)
  const tem = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5;
    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <BsStarFill />
        ) : stars >= number ? (
          <BsStarHalf />
        ) : (
          <BsStar />
        )}
      </span>
    );
  });

  // 第二种思路，虽然更能显示 谁是谁 但是代码不高效  不如循环  //O(1)
  //   let fillStars = +stars.toFixed(0);
  //   const fill = new Array(fillStars).fill(<BsStarFill />);
  //   const half = new Array(fill < stars ? 1 : 0)?.fill(<BsStarHalf />);
  //   const bs = new Array(5 - fillStars).fill(<BsStar />);
  return (
    <Wrapper>
      <div className="start">
        {/* <span>
          {fill}
          {half}
          {bs}
        </span> */}
        <span> {tem}</span>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
