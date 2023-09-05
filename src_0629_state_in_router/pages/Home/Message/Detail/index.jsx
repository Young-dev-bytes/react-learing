import React, { Component } from 'react'
import qs from 'qs'



let obj = {name:'tom', age:18}
console.log(qs.stringify(obj));
let str = 'carName=奔驰&price=199'
console.log(qs.parse(str));

export default class Detail extends Component {
  render() {
    console.log(this);

    return (
      <ul>
        <li>ID:???</li>
        <li>TITLE:???</li>
        <li>CONTENT:???</li>
      </ul>
    )
  }
}
