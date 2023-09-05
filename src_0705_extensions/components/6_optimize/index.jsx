import React, { Component } from "react";

export default class Parent extends Component {
  render() {
    return (
      <div>
        <h1>我是parent组件</h1>
        <Child />
      </div>
    );
  }
}

class Child extends Component {
  render() {
    return (
      <div>
        <h1>我是child组件</h1>
      </div>
    );
  }
}
