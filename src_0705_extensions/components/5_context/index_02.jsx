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
        <nameContext.Provider value={this.state}>
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
        <h3>
          way 1 : 我从A组件接收到的用户名是: {this.context.person.username}
        </h3>

        <nameContext.Consumer>
          {(value) => {
            console.log("value-->", value);
            return (
              <>
                <h3>
                  way 2 : 我从A组件接收到的用户名是: {value.person.username}
                </h3>
                <C />
              </>
            );
          }}
        </nameContext.Consumer>
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
        <h3>我从A组件接收到的用户名是：{this.context.person.username}</h3>
        <h3>
          我从A组件接收到的用户名是：
          <nameContext.Consumer>
            {(value) => {
              console.log("@@@", value.person);
              return `${value.person.username}, 年龄是：${value.person.age}`;
            }}
          </nameContext.Consumer>
        </h3>
      </div>
    );
  }
}
