import React, { Component } from "react";

const nameContext = React.createContext();

export default class A extends Component {
  state = {
    person: {
      username: "tome",
      age: 90,
    },
  };

  render() {
    console.log("A-", this);
    return (
      <div>
        <h2>我是A组件</h2>
        <h3>我的用户名是：{this.state.username}</h3>
        {/* <nameContext.Provider value={this.state.username}>
          <B/>
        </nameContext.Provider> */}
        <nameContext.Provider value={this.state.person}>
          <B />
        </nameContext.Provider>
      </div>
    );
  }
}

class B extends Component {
  static contextType = nameContext;
  render() {
    console.log("B-", this);
    return (
      <div>
        <h2>我是B组件</h2>
        {/* <h3>我从A组件接收到的用户名是: {this.context}</h3> */}
        <h3>我从A组件接收到的用户名是: {this.context.username}</h3>
        <C />
      </div>
    );
  }
}

class C extends Component {
  static contextType = nameContext;

  render() {
    console.log("C-", this);
    return (
      <div>
        <h2>我是C组件</h2>
        {/* <h3>我从A组件接收到的用户名是：{this.context}</h3> */}
        <h3>我从A组件接收到的用户名是：{this.context.username}</h3>
      </div>
    );
  }
}
