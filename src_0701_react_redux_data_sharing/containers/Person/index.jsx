
import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'
import { createPersonAction } from '../../redux/actions/person'


class PersonUI extends Component {

  addPerson=()=>{
    const name = this.nameNode.value
    const age = this.ageNode.value
    const personObj = {id:nanoid(), name, age}
    console.log(personObj);
    this.props.addPerson(personObj)
    this.nameNode.value = ''
    this.ageNode.value = ''

  }

  render() {
    console.log('person-->',this);
    const {personT, heT}= this.props
    return (
      <div>
        <h1>我是person组件{heT}</h1>
        <input ref={c=>this.nameNode=c} type='text' placeholder='请输入名字'/>&nbsp;&nbsp;&nbsp;
        <input ref={c=>this.ageNode=c} type='text' placeholder='请输入年龄'/>&nbsp;&nbsp;&nbsp;
        <button onClick={this.addPerson}>添加</button>&nbsp;&nbsp;&nbsp;
        <ul>
          {/* <li>名字: {name} -- 年龄: {age}</li> */}
          {personT.map(item =>{
            return <li key={item.id}>名字: {item.name} -- 年龄 {item.age}</li>
          })}
        </ul>
      </div>
    )
  }
}


export default connect(
  state => ({ personT:state.personArray, heT:state.he }), // 映射状态
  dispatch => ({
    addPerson: (personObj) => {return dispatch(createPersonAction(personObj))},// 操作映射状态的方法
  }))
  (PersonUI)



