
// 引入react核心库
import React from 'react';
// 引入react组件库
import {render} from 'react-dom';
import './index.css';
// 引入App组件
import App from './App';
//可能是一个用于监测网站性能指标的模块或文件，被导入到当前文件中以供使用。
import reportWebVitals from './reportWebVitals';

// /**
//  * 
// React 和 React DOM 是两个相关但功能不同的库。

// React 是一个用于构建用户界面的 JavaScript 库。它提供了一种声明式的、组件化的方式来构建可复用的 UI 组件。React 通过组件的定义和状态管理来处理界面的渲染和交互逻辑。

// React DOM 是 React 库的一部分，它专注于将 React 组件渲染到浏览器中的 DOM（文档对象模型）。React DOM 提供了与浏览器环境进行交互的功能，包括将组件挂载到特定的 DOM 元素上、更新已挂载组件的状态、处理事件等。

// 简而言之，React 是用于构建用户界面的库，而 React DOM 是 React 库与浏览器 DOM 交互的工具，用于将 React 组件渲染到浏览器中。React DOM 是 React 应用在浏览器环境中的桥梁。
//  */
 


render(<App/>,document.getElementById('root'))

reportWebVitals();



 





// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //     <App />
// //   </React.StrictMode>
// // );




