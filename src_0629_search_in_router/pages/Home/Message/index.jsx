import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './Detail'

export default class Message extends Component {

  state = {
    messageArr: [
      { id: '1', title: '消息1' },
      { id: '2', title: '消息2' },
      { id: '3', title: '消息3' },
    ]
  }


  render() {
    const { messageArr } = this.state
    return (
      <div>
        <ul>
          {
            messageArr.map(item => {
              return (
                <li key={item.id}>
                  {/* 向路由组件传递params参数 */}
                  {/* <Link to={`/home/message/detail/${item.id}/${item.title}`}>{item.title}</Link>&nbsp;&nbsp;&nbsp; */}
                  {/* 向路由组件传递search参数 
                  search参数无需声明接收，正常注册路由即可
                  */}
                  <Link to={`/home/message/detail/?id=${item.id}&title=${item.title}`}>{item.title}</Link>&nbsp;&nbsp;&nbsp;
                </li>

              )
            })

          }

        </ul>
        <hr />
          {/* <Route path='/home/message/detail/:id/:title' component={Detail}></Route> */}
          <Route path='/home/message/detail/' component={Detail}></Route>
      </div>
    )
  }
}
