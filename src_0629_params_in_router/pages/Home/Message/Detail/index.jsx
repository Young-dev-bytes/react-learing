import React, { Component } from 'react'


const dataObj = [
    {id:'1',content:'nihao1'},
    {id:'2',content:'nihao2'},
    {id:'3',content:'nihao3'},
]

export default class Detail extends Component {
  render() {
    console.log(this);

    const{id, title} = this.props.match.params
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
