export const formatPrice = (number) => {
  const newNumber = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number / 100);
  return newNumber;
};

export const getUniqueValues = (data, type) => {
  let unique = data.map((item) => item[type]);
  // color是一个数组 递归 解构
  if (type) {
    unique = unique.flat();
  }
  // 保证唯一值，相同类别 x --> 1 , 添加all类别
  return ["All", ...new Set(unique)];
};
