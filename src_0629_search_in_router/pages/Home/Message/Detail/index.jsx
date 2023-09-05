import React, { Component } from 'react'
import qs from 'qs'

const dataObj = [
    {id:'1',content:'nihao1'},
    {id:'2',content:'nihao2'},
    {id:'3',content:'nihao3'},
]

let obj = {name:'tom', age:18}
console.log(qs.stringify(obj));
let str = 'carName=奔驰&price=199'
console.log(qs.parse(str));

export default class Detail extends Component {
  render() {
    console.log(this);

    // 接收params参数
    // const{id, title} = this.props.match.params

    // 接收search参数
    const{search} = this.props.location
    const{id, title} = qs.parse(search.slice(1))

    const findResult = dataObj.find(item =>{
        return item.id === id
    })
    console.log('findResult:',findResult);

    return (
      <ul>
        <li>ID:{id}</li>
        <li>TITLE:{title}</li>
        <li>CONTENT:{findResult.content}</li>
      </ul>
    )
  }
}
