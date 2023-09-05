// 该文件专门为Count组件生成action对象

// import store from './store'

// 创建普通函数并暴露出去,该函数返回一个对象
export const action = function createDecrementAction(data) {
  console.log("redux");
  return { type: "increment", data: data };
};
export const action2 = function createDecrementAction(data) {
  console.log("redux");
  return { type: "increment", data };
};

// 箭头函数的形式
export const a = (data) => {
  return { type: "increment", data };
};

// export const b = data=>  ({type:'increment', data})

export const b = (data) => {
  return { type: "increment", data };
};

export const createIncrementAction = (data) => ({ type: "increment", data });
export const createDecrementAction = (data) => ({ type: "decrement", data });

// 异步action，就是值action的值为函数
export const createIncrementAsyncAction = (data, time) => {
  // 返回一个匿名函数
  return (dispatch) => {
    setTimeout(() => {
      console.log(data, time);
      const obj = createIncrementAction(data);
      console.log("obj->", obj);
      dispatch(obj);
    }, time);
  };
};
